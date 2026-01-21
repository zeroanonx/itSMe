"use client";

import { useGiscus } from "@/app/hooks";
import Giscus from "../others/Giscus";

export default function Comments() {
  const { theme, mapping, key } = useGiscus();
  // 首页不需要
  if (key === "/") return null;

  return (
    <section key={key} aria-label="Comments">
      <Giscus theme={theme} mapping={mapping} />
    </section>
  );
}
