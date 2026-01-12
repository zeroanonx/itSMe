import type { ComponentProps } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { JSX } from "react/jsx-runtime";
import { highlightCode } from "@/app/utils/modules/shiki";
import { slugify } from "@/app/utils";
import { CodeGroup } from "./modules/CodeGroup";
import { CodeSlot } from "./modules/CodeSlot";
import ImagePreview from "../ui/ImagePreview";

type MDXComponents = ComponentProps<typeof MDXRemote>["components"];
export type CodeItemProps = {
  html: string;
  language?: string;
  title?: string;
};

export const Pre = async (props: any) => {
  const child = props.children;
  if (!child?.props?.children) return <pre {...props} />;

  const code = child.props.children.trim();
  const className = child.props.className || "";
  const meta = child.props.meta as string | undefined;

  const language = className.replace("language-", "") || "text";
  const title = meta && (/title="(.+?)"/.exec(meta)?.[1] ?? meta);

  const html = await highlightCode(code, language);

  return <CodeSlot html={html} language={language} title={title} />;
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
  CodeGroup,
  img: ImagePreview,
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
};
