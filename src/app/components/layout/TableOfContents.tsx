"use client";

import type { TocItem } from "@/app/utils";
import { Icon } from "@iconify-icon/react";
import { usePathname } from "next/navigation";

type Props = {
  toc: TocItem[];
};

export function TableOfContents({ toc }: Props) {
  const pathname = usePathname();
  if (pathname === "/") return null;
  const onClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className=" fixed  top-32 left-10 w-50 px-3 h-screen group lg:block hidden">
      <div className="w-full h-full ">
        <Icon className="" icon="ri:menu-2-fill" width="22" height="22" />
        <nav
          className="text-sm space-y-2 mt-4 h-[calc(100vh-30px)] overflow-y-auto pb-60 opacity-0 group-hover:opacity-100 transition-opacity
 duration-500 ease-in-out"
        >
          {toc.map((item) =>
            item.level < 4 ? (
              <div
                key={item.id}
                onClick={() => onClick(item.id)}
                className="cursor-pointer hover:text-[#333]! dark:hover:text-neutral-100 transition"
                style={{
                  paddingLeft: (item.level - 2) * 12,
                }}
              >
                {item.text}
              </div>
            ) : null
          )}
        </nav>
      </div>
    </div>
  );
}
