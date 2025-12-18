import { Post } from "@/app/types";
import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { join } from "path";

const postsDirectory = join(process.cwd(), "/src/page");

/**
 * @function getPostSlugs
 * 获取所有文章的路径
 */
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

/**
 * @function 根据 slug 读取单篇文章的元数据和正文内容
 * @param slug
 * @returns
 */
export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.(md|mdx)$/, "");
  const exts = [".md", ".mdx"];

  // 1. 先按原路径找
  for (const ext of exts) {
    const candidate = join(postsDirectory, `${realSlug}${ext}`);
    if (fs.existsSync(candidate)) {
      const { data, content } = matter(fs.readFileSync(candidate, "utf-8"));
      return { ...data, slug: realSlug, content } as Post;
    }
  }

  // 2. 动态回退：只要存在顶级目录，就试一次 {topDir}/index
  const topDir = slug.split("/")[0];
  const fallback = join(postsDirectory, topDir, "index.mdx");
  if (fs.existsSync(fallback)) {
    const { data, content } = matter(fs.readFileSync(fallback, "utf-8"));
    return { ...data, slug: `${topDir}/index`, content } as Post;
  }

  // 3. 最终兜底
  return notFound();
}

/**
 * @function 获取所有文章，并按日期倒序排序
 * @returns 所有文章
 */
export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();

  const posts = slugs
    // 根据 slug 逐个解析为 `Post`
    .map((slug) => getPostBySlug(slug))
    // 按日期从新到旧排序（descending）
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}
