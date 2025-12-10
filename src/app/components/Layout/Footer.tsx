import TextLoop from "@/app/components/ui/TextLoop";
import { Icon } from "@iconify/react";

export default function Footer() {
  return (
    <footer className="flex items-center justify-center mt-10 ">
      <div className="w-full max-w-screen-lg black border-t border-zinc-100 px-0 py-4 dark:border-zinc-800 items-center justify-center md:flex md:justify-between">
        <a
          href="https://github.com/LinHanlove"
          target="_blank"
          className="black"
        >
          <TextLoop className="text-xs text-zinc-500">
            <span>© 2025 LinHam.</span>
            <span>Thank you, nice to meet you.</span>
            <p className="flex items-center gap-1">
              mail me at
              <Icon icon="ic:baseline-email" className="text-base" />
              2188817393@qq.com
            </p>
          </TextLoop>
        </a>
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <p>Find me on</p>
          <a
            href="https://github.com/LinHanlove"
            className="flex items-center gap-1"
          >
            <Icon icon="mdi:github" className="text-lg" />
            GitHub
          </a>
          <a
            href="https://juejin.cn/user/2670060580903288/postse"
            className="flex items-center gap-1"
          >
            <Icon icon="simple-icons:juejin" className="text-lg" />
            GitHub
          </a>
          <a href="/wechat" className="flex items-center gap-1">
            <Icon icon="ic:baseline-wechat" className="text-lg" />
            Wechat
          </a>
        </div>
      </div>
    </footer>
  );
}
