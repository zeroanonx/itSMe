import type { ComponentProps } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { JSX } from "react/jsx-runtime";
import { highlightCode } from "@/app/utils/modules/shiki";
import { slugify } from "@/app/utils";
import { CodeBlock } from "./modules/CodeBlock";

type MDXComponents = ComponentProps<typeof MDXRemote>["components"];
export type CodeItemProps = {
  html: string;
  language?: string;
  title?: string;
};

const Pre = async (props: any) => {
  const child = props.children;

  if (child?.props?.children) {
    const code = child.props.children.trim();
    const lang = child.props.className?.replace("language-", "");

    const html = await highlightCode(code, lang);
    return <CodeBlock html={html} language={lang} />;
  }

  return <pre {...props} />;
};

const createHeading = (level: number) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return ({ children }: { children: React.ReactNode }) => {
    const id = slugify(String(children));
    return <Tag id={id}>{children}</Tag>;
  };
};
export const mdxServerComponents: MDXComponents = {
  pre: Pre,
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
};
