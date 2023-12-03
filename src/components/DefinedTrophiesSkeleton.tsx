import { Skeleton } from "./Skeleton";

export function DefinedTrophiesSkeleton() {
  return (
    <div className="flex space-x-4">
      {Array.from(new Array(3)).map((_, index) => (
        <div className="flex" key={index}>
          <Skeleton className="w-[36px] h-[48.11px] mx-2" />
          <Skeleton className="w-[11.28px] h-[18px] mb-1 mt-auto" />
        </div>
      ))}
    </div>
  );
}
