"use client";

import { docMap, index, SearchDoc } from "@/app/utils";
import { useEffect, useState } from "react";

let initialized = false;

/**
 * 搜索功能
 * 初始化搜索索引和执行搜索查询
 */
export function useSearch() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // 检查是否已经初始化
    if (initialized) {
      setReady(true);
      return;
    }

    // 获取搜索索引数据
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((docs: SearchDoc[]) => {
        // 遍历文档并添加到索引和文档映射中
        docs.forEach((doc) => {
          index.add(doc);
          docMap.set(doc.id, doc);
        });

        // 标记为已初始化并设置准备就绪状态
        initialized = true;
        setReady(true);
      });
  }, []);

  /**
   * 根据查询字符串返回匹配的文档列表
   * @param q - 搜索查询字符串
   */
  const search = (q: string): SearchDoc[] => {
    // 如果查询字符串为空或搜索索引未准备就绪，直接返回空数组
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

  return { ready, search };
}
