import type { ComponentProps } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxServerComponents } from "./mdx.server";
import { mdxClientComponents } from "./mdx.client";

type MDXComponents = ComponentProps<typeof MDXRemote>["components"];

export const mdxComponents: MDXComponents = {
  ...mdxServerComponents,
  ...mdxClientComponents,
};
