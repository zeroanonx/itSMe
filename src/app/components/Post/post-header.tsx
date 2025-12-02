// 文章详情页头部：标题、作者信息、封面图与日期
import Avatar from "../avatar";
import CoverImage from "../cover-image";
import DateFormatter from "../date-formatter";
import { PostTitle } from "@/app/components/Post/post-title";
import { type Author } from "@/interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author?: Author;
};

export function PostHeader({ title, coverImage, date, author }: Props) {
  return (
    <>
      {/* 大标题 */}
      <PostTitle>{title}</PostTitle>
      {/* 桌面端：标题下方显示作者 */}
      {author && (
        <div className="hidden md:block md:mb-12">
          <Avatar name={author.name} picture={author.picture} />
        </div>
      )}
      {/* 封面图片 */}
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        {/* 移动端：封面图下方再显示作者 */}
        {author && (
          <div className="block md:hidden mb-6">
            <Avatar name={author.name} picture={author.picture} />
          </div>
        )}
        {/* 日期展示 */}
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
}
