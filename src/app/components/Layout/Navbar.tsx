import Link from "next/link";
import React from "react";
import { Icon } from "@iconify/react";
import ToggleTheme from "@/app/components/ui/ToggleTheme";
import Search from "./Search";

export default function Navbar() {
  return (
    <div className="right flex items-center gap-x-4 md:gap-x-8">
      <Link href="/blog" title="Blog" className="cursor-target">
        <span className="hidden md:block">Blog</span>
        <Icon icon="ri:article-line" className="block md:hidden" />
      </Link>
      <Link href="/projects" title="Projects" className="cursor-target">
        <span className="hidden md:block">Projects</span>
        <Icon icon="ri:lightbulb-line" className="block md:hidden" />
      </Link>

      <Link href="/products" title="Products" className="cursor-target">
        <span className="hidden md:block">Products</span>
        <Icon icon="eos-icons:products-outlined" className="block md:hidden" />
      </Link>
      <Link href="/interesting" title="Interesting" className="cursor-target">
        <span className="hidden md:block">Interesting</span>
        <Icon icon="solar:star-rings-broken" className="block md:hidden" />
      </Link>

      <ToggleTheme />
      <Search />
    </div>
  );
}
