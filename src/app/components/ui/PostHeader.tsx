import { cn } from "@/app/utils";

interface PostHeaderProps {
  title: string;
  desc?: string;
  font?: string;
  color?: string;
}
export default function PostHeader({
  title,
  desc,
  font = "lh",
  color = "--accent-primary",
}: PostHeaderProps) {
  return (
    <header className="sm:mb-20 mb-8 text-center">
      <h1
        className={cn("text-2xl! font-semibold tracking-tight", `font-${font}`)}
      >
        {title}
      </h1>
      <p
        className={cn("mt-3 text-sm text-muted-foreground", `text-(${color})`)}
      >
        {desc}
      </p>
    </header>
  );
}
