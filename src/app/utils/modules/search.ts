import FlexSearch from "flexsearch";

/**
 * 搜索文档的数据结构
 * ⚠️ 这个结构必须与 build-search-index.ts 里生成的数据完全一致
 */
export type SearchDoc = {
  /** 唯一 id（通常用 slug） */
  id: string;

  /** 文章标题（权重通常最高） */
  title: string;

  /** 文章正文（去 markdown 后的纯文本） */
  content: string;

  /** 前端跳转用的 URL，如 /blog/xxx */
  url: string;
};

/**
 * 文档映射表（id => 完整文档）
 *
 * 👉 为什么需要这个？
 * FlexSearch 的 search 结果默认只返回 id
 * UI 层真正渲染时，需要 title / url 等完整信息
 *
 * 所以我们在索引时：
 *   index.add(doc)
 *   docMap.set(doc.id, doc)
 */
export const docMap = new Map<string, SearchDoc>();

/**
 * FlexSearch 文档索引（支持多字段）
 *
 * 使用 Document 模式的原因：
 * - 可以同时索引 title / content
 * - 可以分别控制字段 tokenize / 权重
 * - 适合博客、文档类搜索
 */
export const index = new FlexSearch.Document<SearchDoc>({
  document: {
    /**
     * 文档的唯一标识字段
     * - 必须是字符串或数字
     * - search 结果里返回的就是这个 id
     */
    id: "id",

    /**
     * 要参与搜索的字段列表
     * 每个 field 都会单独建立倒排索引
     */
    index: [
      {
        /** 标题字段 */
        field: "title",

        /**
         * tokenize: "full"
         * - 英文：按词 + 前缀
         * - 中文：支持单字级匹配（非常重要）
         *
         * 如果你搜「葡萄」能命中正文，
         * 就是靠这个配置
         */
        tokenize: "full",
      },
      {
        /** 正文字段 */
        field: "content",

        /**
         * 正文同样使用 full tokenize
         * 保证：
         * - 单字
         * - 短语
         * - 组合搜索 都能命中
         */
        tokenize: "full",
      },
    ],
  },

  /**
   * 全局 tokenize 行为
   * - 会作为 index[].tokenize 的默认值
   * - 这里显式写出来是为了防止未来误改
   */
  tokenize: "full",

  /**
   * resolution（搜索精度）
   *
   * 取值范围：1 ~ 9
   * - 越高：匹配更精确，但索引更大
   * - 博客搜索建议 7~9
   */
  resolution: 9,
});
