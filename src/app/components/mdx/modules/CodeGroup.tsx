"use client";

import { createContext, useContext, useRef, useState } from "react";
import { CodeBlock } from "./CodeBlock";
import type { CodeItemProps } from "../mdx.server";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/app/components/shadcn/tabs";

type Ctx = {
  register: (item: CodeItemProps) => void;
};

const CodeGroupContext = createContext<Ctx | null>(null);

export function CodeGroup({ children }: { children: React.ReactNode }) {
  const items = useRef<CodeItemProps[]>([]);
  const [, forceUpdate] = useState({});

  const keys = useRef(new Set<string>());

  const register = (item: CodeItemProps) => {
    const key = `${item.language}:${item.title ?? ""}:${item.html}`;

    if (keys.current.has(key)) return;

    keys.current.add(key);
    items.current.push(item);
    forceUpdate({});
  };

  if (items.current.length === 0) {
    return (
      <CodeGroupContext.Provider value={{ register }}>
        {children}
      </CodeGroupContext.Provider>
    );
  }

  return (
    <CodeGroupContext.Provider value={{ register }}>
      <Tabs defaultValue="0" className="my-6">
        <TabsList className="mb-2">
          {items.current.map((item, i) => (
            <TabsTrigger
              key={i}
              value={String(i)}
              className="font-mono text-xs"
            >
              {item.title || item.language}
            </TabsTrigger>
          ))}
        </TabsList>

        {items.current.map((item, i) => (
          <TabsContent key={i} value={String(i)} className="mt-0">
            <CodeBlock html={item.html} language={item.language} />
          </TabsContent>
        ))}

        {children}
      </Tabs>
    </CodeGroupContext.Provider>
  );
}

export function useCodeGroup() {
  return useContext(CodeGroupContext);
}
