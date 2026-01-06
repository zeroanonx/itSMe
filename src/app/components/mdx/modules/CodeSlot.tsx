// CodeSlot.tsx
"use client";

import { useEffect, useState } from "react";
import { useCodeGroup } from "./CodeGroup";
import { CodeBlock } from "./CodeBlock";
import type { CodeItemProps } from "../mdx.server";

export function CodeSlot(props: CodeItemProps) {
  const group = useCodeGroup();
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    if (group) {
      setIndex(group.register(props));
    }
  }, []);

  // 在 CodeGroup 中：不直接渲染
  if (group) return null;

  // 不在 CodeGroup 中：兜底直接渲染
  return <CodeBlock html={props.html} language={props.language} />;
}
