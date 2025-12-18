export interface Post {
  // 文章唯一标识，对应文件名（不含 .md）
  slug: string;
  // 标题
  title: string;
  // 发布时间，ISO 字符串
  date: string;
  // Markdown 正文内容（未转换为 HTML 之前）
  content: string;
  // 文章分组
  type: string;
  // 写作时长
  duration: string;
}

// 作者信息结构
export type Author = {
  // 作者显示名称
  name: string;
  // 作者头像图片路径
  picture: string;
};
