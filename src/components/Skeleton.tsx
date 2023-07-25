import clsx from "clsx";

type Props = {
  className?: string;
};

export function Skeleton({ className = "w-24 h-4" }: Props) {
  return (
    <div
      className={clsx("animate-pulse bg-neutral-400 rounded-lg", className)}
    />
  );
}
