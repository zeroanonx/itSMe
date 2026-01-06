type ContainerSize = "default" | "wide" | "full";

interface Props {
  size?: ContainerSize;
  children: React.ReactNode;
}

export default function Container({ size = "default", children }: Props) {
  const sizeClass = {
    default: "w-full md:max-w-[74ch] max-w-[96%]",
    wide: "w-full md:max-w-[94ch] max-w-[96%]",
    full: "max-w-none max-w-[98%]",
  }[size];

  return (
    <div className={`mx-auto container relative px-4 ${sizeClass}`}>
      {children}
    </div>
  );
}
