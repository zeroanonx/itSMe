import type { MDXComponents } from "mdx/types";
import CodeBlock from "./Layout/CodeBlock";
import LinkComponent from "./ui/LinkComponent";
import Image from "./ui/Image";
import Logo from "./ui/Logo";
import { highlightCode } from "../utils/modules/shiki";
import { slugify } from "../utils";
import { JSX } from "react/jsx-runtime";

// 行内 code
// InlineCode.tsx
export function InlineCode(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className="
        rounded
        bg-neutral-200/60
        px-1 py-0.5
        text-sm
        font-mono
        dark:bg-neutral-800
      "
      {...props}
    />
  );
}

// 块级 code
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

// 避免 <div> 被 <p> 包裹，解决 hydration 错误
const P = (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />;

/**
 * @function 创建标题
 */
const createHeading = (level: number) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return ({ children }: { children: React.ReactNode }) => {
    const text = String(children);
    const id = slugify(text);

    return (
      <Tag id={id} className="scroll-mt-24">
        {children}
      </Tag>
    );
  };
};

export const mdxComponents: MDXComponents = {
  // p: P,
  pre: Pre,
  code: InlineCode,
  LinkComponent,
  Image,
  Logo,
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
};
