"use client";

import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";

import TreeBackground from "@/app/components/ui/TreeBackground";
import PatternBackground from "@/app/components/ui/PatternBackground";
import { BackgroundType, getBackgroundByPathname } from "@/app/hooks";

export default function Background(): ReactNode {
  const pathname = usePathname();

  const [type, setType] = useState<BackgroundType>("off");
  const [mounted, setMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setMounted(true);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (event: MediaQueryListEvent) => {
      setReduceMotion(event.matches);
    };

    setReduceMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMotionChange);

    return () => mediaQuery.removeEventListener("change", handleMotionChange);
  }, []);

  useEffect(() => {
    if (!pathname) return;

    const bg = getBackgroundByPathname(pathname);
    setType(reduceMotion && bg === "tree" ? "off" : bg);
  }, [pathname, reduceMotion]);

  if (!mounted || type === "off") return null;

  const portalContent = createPortal(
    <>
      {type === "tree" && <TreeBackground />}

      {type === "pattern" && (
        <PatternBackground
          variant="Dot"
          size="lg"
          animate={!reduceMotion}
          direction="TopRight"
          speed={90000}
          className="fixed inset-0 -z-10 text-neutral-300 dark:text-neutral-700"
        />
      )}
    </>,
    document.body
  );

  return <>{portalContent}</>;
}
