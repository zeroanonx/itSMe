import { MATE_TITLE, MATE_TITLE_IMG } from "@/app/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";

import "@/app/assets/style/tailwind.css";
import "@/app/assets/style/main.css";
import "@/app/assets/style/prose.css";
import "@/app/assets/style/markdown.css";

import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import { TargetCursor } from "./components/ui/TargetCursor";
import SlideEnterController from "@/app/components/layout/SlideEnterController";
import Background from "./components/ui/Background";
import AIEntry from "./components/ai/AIEntry";

// 使用 Next.js 内置的 Inter 字体
const inter = Inter({ subsets: ["latin"] });

// 默认全局的 SEO 信息（标题、描述、OG 图）
export const metadata: Metadata = {
  title: `${MATE_TITLE}`,
  description: `LinHan's personal website`,
  openGraph: {
    images: [MATE_TITLE_IMG],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  const theme = localStorage.getItem("theme");
                  if (theme === "dark") {
                    document.documentElement.classList.add("dark");
                  }
                } catch (_) {}
              })();
            `,
          }}
        />

        {/* 各种 favicon 与 PWA 相关配置 */}
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        {/* 博客 RSS 订阅地址 */}
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>

      <body
        className={cn(
          inter.className,
          "bg-white text-black dark:bg-(--c-bg) dark:text-(--theme) relative"
        )}
      >
        <SlideEnterController />
        <Background />
        <main>
          <Header />
          <div className="min-h-screen  w-screen">{children}</div>
          <AIEntry />
          <Footer />
          <TargetCursor />
        </main>
      </body>
    </html>
  );
}
