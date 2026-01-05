type ContainerSize = "default" | "wide" | "full";

interface Props {
  size?: ContainerSize;
  children: React.ReactNode;
}

export default function Container({ size = "default", children }: Props) {
  const sizeClass = {
    default: "w-full max-w-[74ch]",
    wide: "w-full max-w-[94ch]",
    full: "max-w-none",
  }[size];

  return <div className={`mx-auto px-4 ${sizeClass}`}>{children}</div>;
}
