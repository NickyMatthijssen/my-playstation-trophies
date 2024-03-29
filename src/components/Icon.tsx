import clsx from "clsx";
import Image from "next/image";

type Size = "sm" | "md" | "lg";

type Props = {
  url: string;
  size?: Size;
  float?: React.ReactElement;
  alt?: string;
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

export default function Icon({ url, size, float, alt = "" }: Props) {
  const className = getSizeClass(size);

  return (
    <div className={clsx("relative", className)}>
      <Image
        alt={alt}
        src={url}
        width={112}
        height={112}
        className="w-full h-full object-contain relative z-10 rounded-2xl relavive z-0"
      />
      <div className="bg-neutral-100/25 absolute w-full h-full inset-0 z-0 rounded-2xl" />

      {float && <div className="absolute -left-2 -top-2 z-10">{float}</div>}
    </div>
  );
}
