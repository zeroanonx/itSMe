"use client";

import Link from "next/link";
import StrokeText from "@/app/components/ui/StrokeText";
import { ProjectsType } from "@/app/types";
import { Icon } from "@iconify-icon/react";
import MoveTop from "@/app/components/ui/MoveTop";

interface Props {
  content: ProjectsType;
}

export default function ProjectsContainer({ content }: Props) {
  const { title, description, list } = content;

  return (
    <section className="w-full">
      <header className="mb-30 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </header>

      <div className="space-y-30">
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

            <div className="grid gap-4 md:grid-cols-3 grid-cols-1 z-50">
              {projects.map((project) => (
                <Link
                  key={project.name}
                  href={project.link}
                  target="_blank"
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
                        <Icon icon={project.icon} width="36" height="36" />
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
      </div>
      <MoveTop />
    </section>
  );
}
