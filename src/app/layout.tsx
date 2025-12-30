import { MATE_TITLE, MATE_TITLE_IMG } from "@/app/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";

import "@/app/assets/style/tailwind.css";
import "@/app/assets/style/main.css";
import "@/app/assets/style/prose.css";
import "@/app/assets/style/markdown.css";

import Header from "./components/Layout/Header";
import Container from "./components/Layout/Container";
import Footer from "./components/Layout/Footer";
import { TargetCursor } from "./components/ui/TargetCursor";
import SlideEnterController from "./components/Layout/SlideEnterController";
import Background from "./components/ui/Background";

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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="stylesheet" href="/pagefind/pagefind-ui.css" />
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
          "bg-white text-black dark:bg-[var(--c-bg)] dark:text-[var(--theme)] relative"
        )}
      >
        <SlideEnterController />
        <Background />
        <main>
          <Header />
          <Container>
            {/* 主体内容区域，最小高度撑满一屏 */}
            <div className="min-h-screen prose">{children}</div>
          </Container>
          <Footer />
          <TargetCursor />
        </main>
      </body>
    </html>
  );
}
