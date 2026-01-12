import Link from "next/link";
import { Icon } from "@iconify-icon/react";
import ToggleTheme from "@/app/components/ui/ToggleTheme";
import { SearchDialog } from "@/app/components/ui/SearchDialog";

export default function Navbar() {
  return (
    <div className="right flex items-center gap-x-4 md:gap-x-8">
      <Link
        href="/blog"
        title="Blog"
        className="cursor-target flex items-center justify-center"
      >
        <span className="hidden md:block">Blog</span>
        <Icon icon="ri:article-line" className="block md:hidden" />
      </Link>

      <Link
        href="/projects"
        title="Projects"
        className="cursor-target flex items-center justify-center"
      >
        <span className="hidden md:block">Projects</span>
        <Icon icon="ri:lightbulb-line" className="block md:hidden" />
      </Link>

      <Link
        href="/interesting"
        title="Interesting"
        className="cursor-target flex items-center justify-center"
      >
        <span className="hidden md:block">Interesting</span>
        <Icon icon="solar:star-rings-broken" className="block md:hidden" />
      </Link>

      <Link
        href="/myself"
        title="Myself"
        className="flex items-center justify-center relative group no-cursor"
      >
        <div className="text-lg transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:rotate-12 group-hover:drop-shadow-lg flex items-center justify-center">
          <Icon icon="emojione:memo" />
        </div>
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-linear-to-r from-amber-400/30 to-orange-400/30 blur-md scale-150 transition-all duration-300 animate-pulse"></div>
        <div className="absolute -top-3 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 group-hover:animate-bounce text-xs">
          ❤️
        </div>
      </Link>

      <Link
        href="/friends"
        title="Friends"
        className="flex items-center justify-center relative group no-cursor"
      >
        <div className="text-lg transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:rotate-12 group-hover:drop-shadow-lg flex items-center justify-center">
          <Icon icon="fluent-emoji-flat:love-you-gesture-light" />
        </div>
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-linear-to-r from-amber-400/30 to-orange-400/30 blur-md scale-150 transition-all duration-300 animate-pulse"></div>
        <div className="absolute -top-3 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 group-hover:animate-bounce text-xs">
          🍻
        </div>
      </Link>

      <ToggleTheme />
      <SearchDialog />
    </div>
  );
}
