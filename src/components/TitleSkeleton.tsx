import { DefinedTrophiesSkeleton } from "./DefinedTrophiesSkeleton";
import { Skeleton } from "./Skeleton";

export function TitleSkeleton() {
  return (
    <div className="flex w-full px-4 py-6 hover:animate-pulse relative space-x-4">
      <div>
        <Skeleton className="w-24 h-24" />
      </div>

      <div className="flex flex-1 border-b items-center space-x-4">
        <div className="flex-1">
          <Skeleton className="h-3 w-56 mb-4" />

          <Skeleton className="h-2 w-12" />
        </div>

        <div className="flex-shrink-0">
          <DefinedTrophiesSkeleton />
        </div>
      </div>
    </div>
  );
}
