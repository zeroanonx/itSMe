"use client";

import { Icon } from "@iconify/react";
import { useUserInfo } from "@/app/store";

export default function ToggleTheme() {
  const theme = useUserInfo((s) => s.theme);
  const setTheme = useUserInfo((s) => s.setTheme);

  const toggleDark = (event: any) => {
    // 检查浏览器是否支持 view-transitions
    const supportsViewTransitions = !!document.startViewTransition;

    // 检查用户是否启用了减少动画的偏好设置
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // 如果浏览器支持 view-transitions 且用户没有启用减少动画，则启用视图过渡
    const isAppearanceTransition =
      supportsViewTransitions && !prefersReducedMotion;

    if (!isAppearanceTransition) {
      setTheme(theme === "dark" ? "light" : "dark");
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );
    const transition = document.startViewTransition(async () => {
      setTheme(theme === "dark" ? "light" : "dark");
    });

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
          pseudoElement:
            theme === "dark"
              ? "::view-transition-old(root)"
              : "::view-transition-new(root)",
        }
      );
    });
  };
  return (
    <a className="select-none" title="Toggle Color Scheme" onClick={toggleDark}>
      {theme === "dark" ? (
        <Icon icon="solar:moon-line-duotone" />
      ) : (
        <Icon icon="mingcute:sun-line" />
      )}
    </a>
  );
}
