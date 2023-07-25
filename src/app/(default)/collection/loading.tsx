import { TitleSkeleton } from "~/components/TitleSkeleton";

export default function Loading() {
  return (
    <div>
      {Array.from(new Array(10)).map((index) => (
        <TitleSkeleton key={index} />
      ))}
    </div>
  );
}
