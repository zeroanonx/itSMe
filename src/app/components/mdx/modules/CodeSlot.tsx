"use client";

import { useEffect } from "react";
import { useCodeGroup } from "./CodeGroup";
import { CodeBlock } from "./CodeBlock";
import type { CodeItemProps } from "../mdx.server";

export function CodeSlot(props: CodeItemProps) {
  const group = useCodeGroup();

  useEffect(() => {
    if (group) {
      group.register(props);
    }
  }, [group, props]);

  if (group) return null;

  return <CodeBlock html={props.html} language={props.language} />;
}
