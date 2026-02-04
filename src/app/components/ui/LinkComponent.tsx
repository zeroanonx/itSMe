import { Icon } from "@iconify-icon/react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/app/components/shadcn/hover-card";

interface Props {
  icon?: string;
  title: string;
  link?: string;
  previewImg?: string;
  previewDesc?: string;
}

export default function LinkComponent(props: Props) {
  const content = (
    <span className="text-zinc-500 px-1 transition-all hover:text-zinc-700 dark:hover:text-zinc-300 hover:underline inline-block">
      <span className="flex items-center gap-1">
        {props.icon && <Icon icon={props.icon} />}
        {props.title && <code>{props.title}</code>}
      </span>
    </span>
  );

  if (!props.previewImg) {
    return props.link ? (
      <a href={props.link} target="_blank">
        {content}
      </a>
    ) : (
      content
    );
  }

  return (
    <HoverCard openDelay={150} closeDelay={80}>
      <HoverCardTrigger asChild>
        {props.link ? (
          <a href={props.link} target="_blank">
            {content}
          </a>
        ) : (
          content
        )}
      </HoverCardTrigger>

      <HoverCardContent
        side="bottom"
        align="start"
        sideOffset={12}
        className="w-60 h-50 p-0 overflow-hidden"
      >
        <a
          href={props.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full overflow-hidden rounded-md cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <img
            src={props.previewImg}
            className="w-full h-full object-cover m-0!"
          />
        </a>
      </HoverCardContent>
    </HoverCard>
  );
}
