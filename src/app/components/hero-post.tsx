// 首页大图文章卡片组件（最新一篇文章）
import Avatar from "@/app/components/avatar";
import CoverImage from "@/app/components/cover-image";
import { type Author } from "@/interfaces/author";
import Link from "next/link";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author?: Author;
  slug: string;
};

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <section>
      {/* 顶部封面大图，点击可跳转到文章详情 */}
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={coverImage} slug={slug} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          {/* 文章标题，包裹跳转链接 */}
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          {/* 发布时间 */}
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div>
          {/* 摘要与作者信息 */}
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          {author && (
            <Avatar name={author.name} picture={author.picture} />
          )}
        </div>
      </div>
    </section>
  );
}
