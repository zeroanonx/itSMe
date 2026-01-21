"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useGiscus() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // 跟随 Tailwind / next-themes
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return {
    theme,
    mapping: "pathname" as const,
    key: pathname,
  };
}
