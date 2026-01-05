import type { ComponentProps } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { JSX } from "react/jsx-runtime";

import CodeBlock from "@/app/components/layout/CodeBlock";
import { highlightCode } from "@/app/utils/modules/shiki";
import { slugify } from "@/app/utils";
import LinkComponent from "@/app/components/ui/LinkComponent";
import Logo from "@/app/components/ui/Logo";
import Image from "@/app/components/ui/Image";
import SvgHover from "@/app/components/others/SvgHover";
import RetinaLine from "@/app/components/others/RetinaLine";
import RuleDropShadow from "@/app/components/others/RuleDropShadow";
import GhostAnimation from "@/app/components/others/GhostAnimation";
import CircleShadowLoading from "@/app/components/others/CircleShadowLoading";
import BallBlurLoading from "@/app/components/others/BallBlurLoading";

type MDXComponents = ComponentProps<typeof MDXRemote>["components"];

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

export const mdxComponents: MDXComponents = {
  pre: Pre,
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  LinkComponent,
  Logo,
  Image,
  SvgHover,
  RetinaLine,
  RuleDropShadow,
  GhostAnimation,
  CircleShadowLoading,
  BallBlurLoading,
};
