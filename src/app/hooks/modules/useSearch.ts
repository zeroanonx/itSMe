"use client";

import { docMap, index, SearchDoc } from "@/app/utils";
import { useEffect, useState, useRef } from "react";

let initialized = false;
let loadingPromise: Promise<void> | null = null;

/**
 * 搜索功能
 */
export function useSearch() {
  const [ready, setReady] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  /**
   * 根据查询字符串返回匹配的文档列表
   * @param q - 搜索查询字符串
   */
  const search = (q: string): SearchDoc[] => {
    if (!q || !ready) return [];

    // 使用索引执行搜索，限制返回结果数量为10条
    const raw = index.search(q, { limit: 10 });

    // 使用Set来存储文档ID，确保结果唯一性
    const ids = new Set<string>();

    raw.forEach((group) => {
      group.result.forEach((id) => ids.add(id as string));
    });

    return Array.from(ids)
      .map((id) => docMap.get(id))
      .filter(Boolean) as SearchDoc[];
  };

  const loadSearchIndex = () => {
    if (initialized) {
      if (mountedRef.current) setReady(true);
      return Promise.resolve();
    }

    if (loadingPromise) {
      return loadingPromise.then(() => {
        if (mountedRef.current) setReady(true);
      });
    }

    // 创建新的加载 Promise
    loadingPromise = fetch("/search-index.json")
      .then((r) => r.json())
      .then((docs: SearchDoc[]) => {
        // 遍历文档并添加到索引和文档映射中
        docs.forEach((doc) => {
          index.add(doc);
          docMap.set(doc.id, doc);
        });

        // 标记为已初始化
        initialized = true;
        if (mountedRef.current) setReady(true);
      })
      .catch((err) => {
        console.error("Failed to load search index:", err);
        loadingPromise = null;
      });

    return loadingPromise;
  };

  // 不在组件挂载时自动加载，而是提供加载函数
  // 这样可以在用户打开搜索对话框时才加载
  return { ready, loadSearchIndex, search };



  return { ready, loadSearchIndex, search };
}
