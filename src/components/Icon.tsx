import clsx from "clsx";

type Size = "sm" | "md" | "lg";

type Props = {
  url: string;
  size?: Size;
};

function getSizeClass(size?: Size): string {
  switch (size) {
    case "sm":
      return "w-16 h-16";
    case "md":
      return "w-20 h-20";
    case "lg":
    default:
      return "w-24 h-24";
  }
}

export default function Icon({ url, size }: Props) {
  const className = getSizeClass(size);

  return (
    <div className={clsx("relative rounded-2xl overflow-hidden", className)}>
      <img src={url} className="w-full h-full object-contain relative z-10" />
      <div className="bg-neutral-100/25 animate-pulse absolute w-full h-full inset-0 z-0" />
    </div>
  );
}