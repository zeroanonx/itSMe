import TextLoop from "@/app/components/ui/TextLoop";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";
import Container from "@/app/components/layout/Container";

export default function Footer() {
  return (
    <Container size="wide">
      <footer className="flex items-center justify-center mt-10 px-4">
        <div className="w-full max-w-5xl black border-t border-zinc-100 px-0 py-4 dark:border-zinc-800 items-center justify-center md:flex md:justify-between">
          <a
            href="https://github.com/zeroanonx"
            target="_blank"
            className="black"
          >
            <TextLoop className="text-xs text-zinc-500">
              <span>
                © 2025 <span className="text-(--accent-primary)">LinHan.</span>
              </span>
              <span>
                Made with ❤️ by
                <span className="text-(--accent-primary)"> zeroanon</span>
              </span>
              <span>Thank you, nice to meet you.</span>
              <p className="flex items-center gap-1">
                mail me at
                <Icon icon="ic:baseline-email" className="text-base" />
                <span className="text-(--accent-primary)">
                  2188817393@qq.com
                </span>
              </p>
            </TextLoop>
          </a>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <p className="text-(--accent-secondary)">Find me on</p>
            <a
              href="https://github.com/zeroanonx"
              className="flex items-center gap-1"
            >
              <Icon icon="mdi:github" className="text-lg" />
              GitHub
            </a>
            <a
              href="https://juejin.cn/user/2670060580903288"
              className="flex items-center gap-1"
            >
              <Icon icon="simple-icons:juejin" className="text-lg" />
              Juejin
            </a>
            <Link href="/others/wechat" className="flex items-center gap-1">
              <Icon icon="ic:baseline-wechat" className="text-lg" />
              Wechat
            </Link>
          </div>
        </div>
      </footer>
    </Container>
  );
}
