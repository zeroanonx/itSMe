"use client";

import { createContext, useContext, useState, useRef, useEffect } from "react";
import { CodeBlock } from "./CodeBlock";
import type { CodeItemProps } from "../mdx.server";

const CodeGroupContext = createContext<{
  register: (item: CodeItemProps) => number;
  active: number;
  setActive: (i: number) => void;
} | null>(null);

export function CodeGroup({ children }: { children: React.ReactNode }) {
  const items = useRef<CodeItemProps[]>([]);
  const [, forceUpdate] = useState({});
  const [active, setActive] = useState(0);

  const register = (item: CodeItemProps) => {
    const index = items.current.length;
    items.current.push(item);
    forceUpdate({});
    return index;
  };

  return (
    <CodeGroupContext.Provider value={{ register, active, setActive }}>
      <div className="my-6">
        <div className="flex gap-2 mb-2">
          {items.current.map((item, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={i === active ? "font-bold" : "opacity-60"}
            >
              {item.title || item.language}
            </button>
          ))}
        </div>

        {items.current[active] && (
          <CodeBlock
            html={items.current[active].html}
            language={items.current[active].language}
          />
        )}

        {children}
      </div>
    </CodeGroupContext.Provider>
  );
}

export function useCodeGroup() {
  return useContext(CodeGroupContext);
}
