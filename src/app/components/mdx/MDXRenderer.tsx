import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/app/components/mdx/MDXComponents";

export default function MDXRenderer({ source }: { source: string }) {
  return <MDXRemote source={source} components={mdxComponents} />;
}
