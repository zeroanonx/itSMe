"use client";

import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

export default function ToggleTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  /** 只在浏览器读取 */
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = (event: React.MouseEvent) => {
    const next = theme === "dark" ? "light" : "dark";

    const supportsTransition =
      "startViewTransition" in document &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const apply = () => {
      setTheme(next);
      localStorage.setItem("theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
    };

    if (!supportsTransition) {
      apply();
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    const transition = (document as any).startViewTransition(apply);

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: theme === "dark" ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 400,
          easing: "ease-out",
          fill: "forwards",
          pseudoElement:
            theme === "dark"
              ? "::view-transition-old(root)"
              : "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <button
      onClick={toggleTheme}
      title="Toggle Color Scheme"
      className="select-none"
    >
      {theme === "dark" ? (
        <Icon icon="solar:moon-line-duotone" />
      ) : (
        <Icon icon="mingcute:sun-line" />
      )}
    </button>
  );
}
