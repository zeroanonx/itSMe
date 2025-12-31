"use client";

import { docMap, index, SearchDoc } from "@/app/utils";
import { useEffect, useState } from "react";

let initialized = false;

/**
 * 自定义Hook，用于实现搜索功能
 * 包括初始化搜索索引和执行搜索查询
 * @returns 返回包含ready状态和search函数的对象
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
   * 执行搜索功能，根据查询字符串返回匹配的文档列表
   * @param q - 搜索查询字符串
   * @returns 返回匹配的SearchDoc数组，如果没有匹配项则返回空数组
   */
  const search = (q: string): SearchDoc[] => {
    // 如果查询字符串为空或搜索索引未准备就绪，直接返回空数组
    if (!q || !ready) return [];

    // 使用索引执行搜索，限制返回结果数量为10条
    const raw = index.search(q, { limit: 10 });

    // 使用Set来存储文档ID，确保结果唯一性
    const ids = new Set<string>();

    // 遍历搜索结果，将所有文档ID添加到Set中
    raw.forEach((group) => {
      group.result.forEach((id) => ids.add(id as string));
    });

    // 将Set转换为数组，并通过docMap获取完整的文档对象
    // 然后过滤掉可能为null或undefined的值
    return Array.from(ids)
      .map((id) => docMap.get(id))
      .filter(Boolean) as SearchDoc[];
  };

  return { ready, search };
}
