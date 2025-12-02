// 与本地 Markdown 博客文章相关的工具函数
import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

// `page` 目录存放所有 Markdown / MDX 文章文件
const postsDirectory = join(process.cwd(), "/src/page");

// 递归读取 `page` 目录下的所有 Markdown / MDX 文件，返回不带扩展名的 slug，
// 并用 `/` 表示子目录层级，例如：`about/aa`、`blog/2025/first`
export function getPostSlugs(): string[] {
  const exts = [".md", ".mdx"];

  const walk = (dir: string, parentSlug = ""): string[] => {
    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    const slugs: string[] = [];

    for (const dirent of dirents) {
      const name = dirent.name;
      const fullPath = join(dir, name);

      if (dirent.isDirectory()) {
        // 递归子目录
        const nextParent = parentSlug ? `${parentSlug}/${name}` : name;
        slugs.push(...walk(fullPath, nextParent));
      } else if (dirent.isFile()) {
        const ext = exts.find((e) => name.endsWith(e));
        if (!ext) continue;
        const baseName = name.slice(0, -ext.length);
        const slug = parentSlug ? `${parentSlug}/${baseName}` : baseName;
        slugs.push(slug);
      }
    }

    return slugs;
  };

  return walk(postsDirectory);
}

// 根据 slug 读取单篇文章的元数据和正文内容
export function getPostBySlug(slug: string) {
  // 支持传入 'about/aa' 或 'about/aa.md(x)'，都规整为不带扩展名的 slug
  const realSlug = slug.replace(/\.(md|mdx)$/, "");

  const exts = [".md", ".mdx"];
  let fullPath: string | null = null;

  for (const ext of exts) {
    const candidate = join(postsDirectory, `${realSlug}${ext}`);
    if (fs.existsSync(candidate)) {
      fullPath = candidate;
      break;
    }
  }

  if (!fullPath) {
    throw new Error(`Post not found for slug: ${slug}`);
  }

  // 读取 Markdown / MDX 文件内容
  const fileContents = fs.readFileSync(fullPath, "utf8");
  // 使用 gray-matter 解析出 front-matter（data）和正文（content）
  const { data, content } = matter(fileContents);

  // 组合为 `Post` 类型对象，供页面组件使用
  return { ...data, slug: realSlug, content } as Post;
}

// 获取所有文章，并按日期倒序排序
export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    // 根据 slug 逐个解析为 `Post`
    .map((slug) => getPostBySlug(slug))
    // 按日期从新到旧排序（descending）
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
