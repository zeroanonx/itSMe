"use client";

import { useEffect, useRef } from "react";

export default function Giscus({
  theme,
  mapping,
}: {
  theme: "light" | "dark";
  mapping: "pathname" | "url";
}) {
    
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";

    script.setAttribute("data-repo", "zeroanonx/itSMe");
    script.setAttribute("data-repo-id", "R_kgDOQg6mxQ");
    script.setAttribute("data-category", "Announcements");
    script.setAttribute("data-category-id", "DIC_kwDOQg6mxc4C1OGn");

    script.setAttribute("data-mapping", mapping);
    script.setAttribute("data-theme", theme);
    script.setAttribute("data-lang", "zh-CN");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-reactions-enabled", "1");

    ref.current.appendChild(script);
  }, [theme, mapping]);

  return <div ref={ref} className="mt-16" />;
}
