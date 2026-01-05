import FlexSearch from "flexsearch";

/**
 * 搜索文档的数据结构
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
 * 文档映射表
 */
export const docMap = new Map<string, SearchDoc>();

/**
 * FlexSearch 文档索引（支持多字段）
 *
 */
export const index = new FlexSearch.Document<SearchDoc>({
  document: {
    /**
     * 文档的唯一标识字段
     */
    id: "id",

    /**
     * 要参与搜索的字段列表
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
   */
  tokenize: "full",

  /**
   * resolution（搜索精度）
   *
   * 取值范围：1 ~ 9
   * - 越高：匹配更精确，但索引更大
   */
  resolution: 9,
});
