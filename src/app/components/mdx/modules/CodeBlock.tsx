"use client";

import { cn } from "@/app/utils";
import { Icon } from "@iconify-icon/react";
import { useRef, useState } from "react";

type Props = {
  html: string;
  language?: string;
  isCodeGroup?: boolean;
};

const LANG_MAP: Record<string, string> = {
  javascript: "js",
  typescript: "ts",
  tsx: "tsx",
  jsx: "jsx",
  vue: "vue",
  css: "css",
  html: "html",
  json: "json",
};

export const CodeBlock = ({ html, language ,isCodeGroup}: Props) => {
  const preRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!preRef.current) return;
    console.log("preRef.current", preRef.current.innerText);

    await navigator.clipboard.writeText(preRef.current.innerText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const label = language ? (LANG_MAP[language] ?? language) : null;

  return (
    <div className={cn(
      'relative group  mb-6',
      isCodeGroup ? '' : 'pt-5'
    )}>
      {label && !isCodeGroup && (
        <div
          className="
            absolute left-0 -top-2 z-10
            rounded-md px-1 py-0.5
            text-[10px] font-mono uppercase tracking-wide
            bg-white text-neutral-700
            dark:bg-neutral-700/80 dark:text-neutral-200
            backdrop-blur
            sm:opacity-0 group-hover:opacity-100
            transition
          "
        >
          {label}
        </div>
      )}

      <button
        onClick={handleCopy}
        className={`
          absolute right-0  z-10
          flex items-center gap-1.5
          rounded-md px-2 py-1 text-xs
          transition
          ${
            copied
              ? "bg-emerald-600 text-white"
              : "bg-neutral-800/80 text-white"
          }
          ${
              isCodeGroup ? '-top-10' : '-top-2'
          }
          sm:opacity-0 sm:group-hover:opacity-100
        `}
      >
        {copied ? (
          <>
            <Icon icon="mdi:check" width="14" />
            Copied
          </>
        ) : (
          <>
            <Icon icon="mdi:content-copy" width="14" />
            Copy
          </>
        )}
      </button>

      {/* Code */}
      <div
        ref={preRef}
        className="shiki-wrapper"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};
