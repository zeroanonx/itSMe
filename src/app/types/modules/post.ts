export interface Post {
  // 文章唯一标识，对应文件名（不含 .md）
  slug: string;
  // 标题
  title: string;
  // 发布时间，ISO 字符串
  date: string;
  // 月份
  month: string;
  // Markdown 正文内容（未转换为 HTML 之前）
  content: string;
  // 文章分组
  type: string;
  // 写作时长
  duration: string;
}

/**
 * @type 列表
 */
export type PostListItem = {
  year: string;
  posts: Post[];
};

/**
 * @type 文章集合
 */
export type PostsMap = {
  type: string;
  list: PostListItem[];
};

export interface ListType<T> {
  content?: string;
  date: string;
  description: string;
  list: Record<string, T[]>;
  month: string;
  slug: string;
  title: string;
  type: string;
}

export interface ProjectsListItem {
  desc: string;
  icon?: string;
  link: string;
  name: string;
}

export interface FriendsListItem {
  desc: string;
  icon?: string;
  link: string;
  name: string;
}

/**
 * @type 项目列表
 */
export type ProjectsType = ListType<ProjectsListItem>;

/**
 * @type 友链
 */
export type FriendsType = ListType<FriendsListItem>;
