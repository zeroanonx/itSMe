interface Props {
  alt: string;
  src: string;
  className?: string;
  style?: object;
}

export default function Image({ className, style, ...rest }: Props) {
  return (
    <div className={`relative ${className || ""}`} style={style}>
      <img {...rest} className="object-contain" />
    </div>
  );
}
