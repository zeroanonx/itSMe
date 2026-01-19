"use client";

import Link from "next/link";
import StrokeText from "@/app/components/ui/StrokeText";
import { ProjectsType } from "@/app/types";
import { Icon } from "@iconify-icon/react";
import MoveTop from "@/app/components/ui/MoveTop";
import FriendsSubmitForm from "../ui/FriendsSubmitForm";
import { useRef, useState } from "react";
import PostHeader from "../ui/PostHeader";

interface Props {
  content: ProjectsType;
}

export default function FriendsContainer({ content }: Props) {
  const { title, description, list } = content;

  const preRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!preRef.current) return;
    console.log("preRef.current", preRef.current.innerText);

    await navigator.clipboard.writeText(preRef.current.innerText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section className="w-full">
      <PostHeader
        title={title}
        desc={description}
        font="lh"
        color="--accent-secondary"
      />
      <section className="space-y-30">
        {Object.entries(list).map(([groupName, projects]) => (
          <section key={groupName} className="relative slide-enter ">
            <div className="mb-6">
              <StrokeText
                text={groupName}
                size="md:text-7xl text-5xl"
                left="md:-left-20 -left-0"
                top="-top-10"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 z-50">
              {projects.map((project) => (
                <Link
                  key={project.name}
                  href={project.link}
                  target="_blank"
                  prefetch={project.link.startsWith("/")}
                  className="
                    group
                    rounded-lg
                    bg-background
                    p-3
                    transition-all
                    hover:-translate-y-0.5
                    hover:bg-[#8881]
                  "
                >
                  <div className="h-full flex items-start gap-3">
                    {project.icon && (
                      <div className="w-9 h-full flex items-center justify-center shrink-0">
                        <img
                          src={project.icon}
                          className="w-9 h-9 rounded-full"
                        />
                      </div>
                    )}

                    <div className="space-y-1 text-(--theme)">
                      <h3 className="text-sm font-medium leading-none transition-all opacity-50 group-hover:opacity-100">
                        {project.name}
                      </h3>
                      <p className="text-xs mt-2 leading-relaxed opacity-50 text-muted-foreground line-clamp-2">
                        {project.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </section>

      {/* S 表单提交 */}
      <section className="mt-24 flex  flex-col md:flex-row gap-8 items-center justify-center">
        {/* 表单 */}
        <div className="w-full lg:w-1/2">
          <FriendsSubmitForm />
        </div>

        {/* 示例说明 */}
        <div className="w-full lg:w-1/2">
          <div className="rounded-xl border bg-muted/30 p-4">
            <h3 className="mb-2 text-sm font-medium flex items-center justify-between">
              <div>我的友链</div>
              <button
                onClick={handleCopy}
                className={`
                        flex items-center gap-1.5
                        rounded-md px-2 py-1 text-xs
                        transition
                        ${
                          copied
                            ? "bg-emerald-600 text-white"
                            : "bg-neutral-800/80 text-white"
                        }
                      `}
              >
                {copied ? (
                  <>
                    <Icon icon="mdi:check" width="14" />
                    Copied
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:content-copy" width="14" />
                    Copy
                  </>
                )}
              </button>
            </h3>
            <div ref={preRef}>
              <pre className="overflow-x-auto shiki-wrapper rounded-md bg-background p-3 text-xs leading-relaxed">
                <code className="font-mono">
                  {`name: zeroanon
link: https://zeroanon.com
desc: 不做圣经里腐朽的诗集，要做禁书里最惊世骇俗的篇章
img: https://avatars.githubusercontent.com/u/119206123?v=4`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* E 表单提交 */}
      <MoveTop />
    </section>
  );
}
