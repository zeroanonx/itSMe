import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@iconify-icon/react";
import {
  ALL_SKILLS,
  SKILL_CATEGORIES,
  type SkillItem,
} from "@/app/constants/modules/home";

export const metadata: Metadata = {
  title: "技能 | Blog - ZeroAnon",
  description: "ZeroAnon 的完整技能页。",
};

function groupSkillsByCategory(category: SkillItem["category"]): SkillItem[] {
  return ALL_SKILLS.filter((skill) => skill.category === category);
}

function getCategoryDescription(category: SkillItem["category"]): string {
  switch (category) {
    case "Core Frontend":
      return "核心前端基础与界面能力";
    case "Frameworks":
      return "常用框架与状态管理方案";
    case "Frontend Tooling":
      return "前端工程化与多端平台能力";
    case "Backend":
      return "服务端开发与数据存储能力";
    default:
      return "";
  }
}

export default function SkillsPage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto flex w-full max-w-5xl flex-col px-6 pb-16 pt-10 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.36em]">技能</p>
            <h1 className="mt-3 text-2xl font-light tracking-[-0.05em] sm:text-3xl">
              我最常用的一组技术栈
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6">
              这里是我日常前端开发、产品实验，以及开源项目里最常使用的一些工具和框架。
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/8 px-4 py-2 text-xs shadow-[0_18px_70px_rgba(0,0,0,0.24)] transition hover:border-white/20 hover:bg-white/6"
          >
            <Icon icon="solar:arrow-left-linear" className="text-sm" />
            返回首页
          </Link>
        </div>

        <div className="mt-9 space-y-5">
          {SKILL_CATEGORIES.map((category) => {
            const skills = groupSkillsByCategory(category);

            return (
              <section
                key={category}
                className="rounded-3xl border border-white/8 p-4 shadow-[0_18px_70px_rgba(0,0,0,0.24)]"
              >
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.32em]">
                      {category}
                    </p>
                    <p className="mt-1.5 text-[12.5px]">
                      {getCategoryDescription(category)}
                    </p>
                    <p className="mt-1.5 text-[12px]">共 {skills.length} 项</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
                  {skills.map((skill) => (
                    <a
                      key={skill.label}
                      href={skill.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-[18px] border border-white/8 p-2.5 transition hover:-translate-y-0.5 hover:border-white/16"
                    >
                      <div className="overflow-hidden rounded-[14px] border border-white/6">
                        <img
                          alt={skill.label}
                          src={skill.image}
                          className="aspect-[1.08] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="mt-2 flex items-center gap-1.5 text-[11px] sm:text-xs">
                        <Icon icon={skill.icon} className="text-sm" />
                        <span className="truncate transition">
                          {skill.label}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}
