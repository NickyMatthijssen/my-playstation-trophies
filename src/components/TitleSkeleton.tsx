import { DefinedTrophiesSkeleton } from "./DefinedTrophiesSkeleton";
import { Skeleton } from "./Skeleton";

export function TitleSkeleton() {
  return (
    <div className="flex w-full px-4 py-6 hover:animate-pulse relative space-x-4">
      <div>
        <Skeleton className="w-24 h-24" />
      </div>

      <div className="flex flex-col md:flex-row xl:flex-col 2xl:flex-row flex-1 border-b md:items-center xl:items-start 2xl:items-center md:space-x-4 xl:space-x-0 2xl:space-x-4 space-y-2.5 md:space-y-0 xl:space-y-2.5 2xl:space-y-0">
        <div className="flex-1">
          <Skeleton className="h-3 w-56" />
        </div>

        <div className="flex items-center justify-between pb-2 md:pb-0 xl:pb-2 2xl:pb-0 xl:w-full 2xl:w-auto">
          <div className="flex-shrink-0">
            <DefinedTrophiesSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
