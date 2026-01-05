import { Icon } from "@iconify-icon/react";

interface Props {
  icon: string;
  title: string;
  link: string;
}

export default function LinkComponent(props: Props) {
  return (
    <>
      {props.link ? (
        <span className="text-zinc-500  transition-all hover:text-zinc-700 dark:hover:text-zinc-300 hover:underline inline-block">
          <a href={props.link} target="_blank">
            <span className="flex items-center gap-1">
              {props.icon && <Icon icon={props.icon} />}
              {props.title && <code>{props.title}</code>}
            </span>
          </a>
        </span>
      ) : (
        <span className="text-zinc-500 transition-all hover:text-zinc-700 dark:hover:text-zinc-300 hover:underline inline-block">
          <div className="flex items-center gap-1">
            {props.icon && <Icon icon={props.icon} />}
            {props.title && <span>{props.title}</span>}
          </div>
        </span>
      )}
    </>
  );
}
