"use client";

import { cn, firstLetterToUpperCase } from "@/app/utils";
import { usePosts } from "@/app/store/modules";
import { useEffect, useMemo } from "react";
import { PostListItem, PostsMap } from "@/app/types";
import StrokeText from "@/app/components/ui/StrokeText";
import Link from "next/link";

type Props = {
  posts: PostsMap[];
};

export default function BlogContainer({ posts }: Props) {
  const activeMenu = usePosts((s) => s.activeMenu);
  const setActiveMenu = usePosts((s) => s.setActiveMenu);

  // 分类
  const menu = useMemo(() => posts.map((item) => item.type), [posts]);
  // 分类下的列表
  const list = posts.find((x) => x.type === activeMenu)?.list;

  useEffect(() => {
    if (menu.length > 0 && (!activeMenu || !menu.includes(activeMenu))) {
      setActiveMenu(menu[0]);
    }
  }, [menu, activeMenu, setActiveMenu]);

  return (
    <section>
      <section className="tabs w-full flex items-center gap-x-4">
        {menu.map((item) => (
          <div
            key={item}
            className={cn(
              "text-3xl cursor-target cursor-pointer border-none! opacity-20 hover:opacity-80 transition-all duration-300",
              activeMenu === item && "opacity-100"
            )}
            onClick={() => setActiveMenu(item)}
          >
            {firstLetterToUpperCase(item)}
          </div>
        ))}
      </section>
      <section className="mt-6 text-lg">
        {list &&
          list.map((item: PostListItem) => {
            return (
              <div key={item.year} className="slide-enter">
                <div className="h-12" />
                <div className="mt-10 relative">
                  <StrokeText text={item.year} />
                  {item.posts.map((post) => {
                    return (
                      <Link
                        key={post.title}
                        href={post.slug}
                        className="posts-list-item h-5 my-5 hover:opacity-90 cursor-pointer flex items-end"
                        prefetch
                      >
                        <div className="flex items-center py-2 gap-x-1 cursor-target">
                          <span className="text-base leading-none truncate">
                            {post.title}
                          </span>
                          <div className="h-full ml-4 flex items-end gap-x-1 opacity-50 text-xs leading-none shrink-0">
                            <span>{post.month}</span>
                            <span>·</span>
                            <span>{post.duration}</span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </section>
    </section>
  );
}
