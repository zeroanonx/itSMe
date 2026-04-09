import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify-icon/react";
import dayjs from "dayjs";
import AIEntry from "@/app/components/ai/AIEntry";
import {
  HOME_PROFILE_TAGS,
  FEATURED_SKILLS,
  HOME_QUOTES,
  SOCIAL_LINKS,
} from "@/app/constants/modules/home";
import { getAllPosts } from "@/app/utils/modules/generateRoutes";

export const metadata: Metadata = {
  title: "Blog - ZeroAnon",
  description: "ZeroAnon 的个人网站。",
};

interface StatItem {
  label: string;
  value: string;
}

function formatCount(value: number): string {
  if (value >= 10000) {
    return `${(value / 10000).toFixed(1)}w`;
  }

  return `${value}`;
}

function buildStats(): StatItem[] {
  const posts = getAllPosts().filter(
    (post) => post.slug !== "index" && !post.slug.endsWith("/index")
  );

  const totalWords = posts.reduce((sum, post) => {
    const cleaned = post.content
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/`[^`]*`/g, " ")
      .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
      .replace(/\[[^\]]*\]\([^)]*\)/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/[#>*_~\-]/g, " ")
      .replace(/\s+/g, " ");
    const englishWords = cleaned.match(/[A-Za-z0-9_']+/g) ?? [];
    const chineseChars = cleaned.match(/[\u4e00-\u9fff]/g) ?? [];

    return sum + englishWords.length + chineseChars.length;
  }, 0);

  const firstPost = posts.reduce((earliest, post) => {
    if (!earliest) return post;
    return dayjs(post.date).isBefore(dayjs(earliest.date)) ? post : earliest;
  }, posts[0]);

  const runningDays = firstPost
    ? dayjs().diff(dayjs(firstPost.date), "day")
    : 0;

  return [
    { label: "篇文章", value: `${posts.length}` },
    { label: "字", value: formatCount(totalWords) },
    { label: "天", value: `${runningDays}` },
  ];
}

function getRandomQuote() {
  const index = Math.floor(Math.random() * HOME_QUOTES.length);

  return HOME_QUOTES[index];
}

function getAccentGlow(accent: string): string {
  return `0 0 28px color-mix(in srgb, ${accent} 16%, transparent)`;
}

function getAccentColor(accent: string): string {
  return `color-mix(in srgb, ${accent} 72%, white)`;
}

function getAccentBorder(accent: string): string {
  return `color-mix(in srgb, ${accent} 36%, transparent)`;
}

function getAccentBackground(accent: string): string {
  return `color-mix(in srgb, ${accent} 14%, transparent)`;
}

export default function Index() {
  const stats = buildStats();
  const quote = getRandomQuote();

  return (
    <>
      <main className="min-h-screen">
        <section className="mx-auto flex w-full max-w-4xl flex-col px-6 pb-16 pt-8 sm:px-8">
          <div className="mx-auto h-16 w-16 overflow-hidden rounded-full border border-white/10 p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_20px_80px_rgba(0,0,0,0.35)]">
            <img
              alt="LinHan avatar"
              src="https://avatars.githubusercontent.com/u/119206123?v=4&size=256"
              className="h-full w-full rounded-full object-cover"
            />
          </div>

          <div className="mx-auto mt-5 flex max-w-2xl flex-col items-center text-center">
            <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 text-[clamp(1.05rem,2.65vw,1.8rem)] leading-[1.06] tracking-[-0.05em]">
              <span className="font-light">你好，我是</span>
              <span className="rounded-[14px] border border-white/6 px-2.5 py-1 font-semibold text-(--accent-primary) shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm">
                ZeroAnon
              </span>
              <span className="text-xl">👋</span>
            </div>

            <p className="mt-3 text-[clamp(0.76rem,1.15vw,0.9rem)] font-light tracking-[-0.03em]">
              前端开发者
              <span className="mx-3 inline-block">→</span>
              认真生活的人
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
              {HOME_PROFILE_TAGS.map((tag) => (
                <span
                  key={tag.label}
                  className="inline-flex cursor-default select-none items-center rounded-lg border px-2 py-0.5 text-[9px] tracking-[0.12em] transition duration-200 hover:-translate-y-0.5 active:translate-y-0.5 sm:text-[10px]"
                  style={{
                    backgroundColor: getAccentBackground(tag.accent),
                    borderColor: getAccentBorder(tag.accent),
                    boxShadow: `0 8px 20px color-mix(in srgb, ${tag.accent} 7%, transparent), inset 0 1px 0 rgba(255,255,255,0.05)`,
                    color: getAccentColor(tag.accent),
                  }}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-20 flex max-w-xl flex-col items-center text-center">
            <blockquote
              className="text-[clamp(0.8rem,1.1vw,0.92rem)] font-light leading-[1.85] tracking-[0.02em]"
              style={{
                color: getAccentColor(quote.accent),
              }}
            >
              “{quote.content[0]}
              <br className="hidden sm:block" />
              {quote.content[1]}”
            </blockquote>
            <p
              className="mt-2.5 text-[11px]"
              style={{
                color: getAccentColor(quote.accent),
              }}
            >
              {quote.source}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
              {stats.map((item, index) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 text-[11px] sm:text-xs"
                >
                  <span>
                    <span className="text-[0.9rem] font-light">
                      {item.value}
                    </span>{" "}
                    {item.label}
                  </span>
                  {index < stats.length - 1 ? <span>·</span> : null}
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-5 text-[1rem]">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  aria-label={item.label}
                  className="transition"
                >
                  <Icon icon={item.icon} />
                </a>
              ))}
            </div>
          </div>

          <section className="mt-14 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
            <article className="rounded-3xl border border-white/8 p-4 shadow-[0_18px_70px_rgba(0,0,0,0.24)] sm:p-4.5">
              <p className="text-xs uppercase tracking-[0.36em]">关于我</p>
              <div className="mt-3 space-y-2.5 text-[12.5px] leading-6">
                <p>
                  你好，我是{" "}
                  <span className="text-(--accent-mint)">ZeroAnon</span>
                  ，一个狂热的开源爱好者。
                </p>
                <p>
                  我很喜欢把脑海里的想法一点点做出来，这也是我持续写代码的动力来源。
                </p>
                <p>我很喜欢音乐，音乐是我永恒的伴侣。</p>
                <p>我像一条缝里挤出的野草，弯弯曲曲的向上生长！</p>
                <p>
                  我维护着一个开源工具集
                  <a
                    href="https://t.zeroanon.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-white/20 underline-offset-4 transition"
                  >
                    atom-tools
                  </a>
                  ，如果你愿意，也欢迎来提建议或者一起参与。
                </p>
                <p>
                  目前我在
                  <span className="text-(--accent-primary)"> 杭州 </span>
                  参与一些有意思的项目，也一直在持续打磨自己的能力边界。
                </p>
                <p>我也很喜欢分享知识和经验。</p>
                <p>
                  如果你也对这些方向感兴趣，我们可以一起喝杯咖啡，或者顺手做点有趣的东西。
                </p>
              </div>

              <div className="mt-5 rounded-[20px] border border-white/8shadow-[0_18px_70px_rgba(0,0,0,0.24)] p-3.5">
                <p className="text-xs uppercase tracking-[0.3em]">致</p>
                <p className="mt-2.5 text-[12.5px] leading-6">
                  朋友，不必理会他人过的怎么样，你始终要有一颗属于自己的心和精神世界不受影响。
                </p>
              </div>
            </article>

            <article className="rounded-3xl border border-white/8 shadow-[0_18px_70px_rgba(0,0,0,0.24)] p-4 ">
              <p className="text-xs uppercase tracking-[0.36em]">技能</p>
              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {FEATURED_SKILLS.map((skill) => (
                  <a
                    key={skill.label}
                    href={skill.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-[18px] border border-white/8 p-2.5 transition hover:-translate-y-0.5 hover:border-white/14 "
                  >
                    <div className="overflow-hidden rounded-[14px] border border-white/6 ">
                      <img
                        alt={skill.label}
                        src={skill.image}
                        className="aspect-[1.08] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-[11px] sm:text-xs">
                      <Icon icon={skill.icon} className="text-sm" />
                      <span className="truncate transition">{skill.label}</span>
                    </div>
                  </a>
                ))}
              </div>

              <Link
                href="/skills"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/8  p-4 shadow-[0_18px_70px_rgba(0,0,0,0.24)] px-3.5 py-1.5 text-[11px] transition hover:border-white/20 hover:bg-white/6"
              >
                <span>查看更多技能</span>
                <Icon icon="solar:arrow-right-linear" className="text-sm" />
              </Link>

              <div className="mt-5 rounded-[20px] border border-white/8 shadow-[0_18px_70px_rgba(0,0,0,0.24)] p-3.5">
                <p className="text-xs uppercase tracking-[0.3em]">当前关注</p>
                <p className="mt-2.5 text-[12.5px] leading-6">
                  这段时间我更关注知识分享、开源工具打磨，以及那些看起来克制、用起来顺手的界面体验。
                </p>
              </div>
            </article>
          </section>
        </section>
      </main>
      <AIEntry />
    </>
  );
}
