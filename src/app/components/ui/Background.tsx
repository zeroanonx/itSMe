"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";

import TreeBackground from "./TreeBackground";
import PatternBackground from "./PatternBackground";
import { BackgroundType, getBackgroundByPathname } from "@/app/hooks";

export default function Background() {
  const pathname = usePathname();

  const [type, setType] = useState<BackgroundType>("off");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (!pathname) return;

    const bg = getBackgroundByPathname(pathname);
    console.log("bg---", bg);

    setType(bg);
  }, [pathname]);

  if (!mounted || type === "off") return null;

  return createPortal(
    <>
      {type === "tree" && <TreeBackground />}

      {type === "pattern" && (
        <PatternBackground
          variant="Dot"
          size="lg"
          animate
          direction="TopRight"
          speed={90000}
          className="fixed inset-0 -z-10 text-neutral-300 dark:text-neutral-700"
        />
      )}
    </>,
    document.body
  );
}
