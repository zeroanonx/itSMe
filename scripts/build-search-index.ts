import fs from "fs";
import path from "path";
import {
  getPostBySlug,
  getPostSlugs,
} from "@/app/utils/modules/generateRoutes";

const OUTPUT = path.join(process.cwd(), "public/search-index.json");

function stripMarkdown(md: string) {
  return md
    .replace(/!\[.*?\]\(.*?\)/g, "") // 图片
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // 链接
    .replace(/[`#>*_~\-]/g, "")
    .replace(/\n+/g, " ");
}

async function build() {
  const slugs = getPostSlugs();

  const docs = slugs
    .filter((slug) => slug !== "index" && !slug.endsWith("/index"))
    .map((slug) => {
      const post = getPostBySlug(slug);

      return {
        id: slug,
        title: post.title,
        content: stripMarkdown(post.content),
        url: `/${slug}`,
      };
    });

  fs.writeFileSync(OUTPUT, JSON.stringify(docs));
  console.log(
    `✅ search-index.json generated (${docs.length} docs) to public/`
  );
}

build();
