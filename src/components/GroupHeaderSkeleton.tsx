import { DefinedTrophiesSkeleton } from "./DefinedTrophiesSkeleton";
import { Skeleton } from "./Skeleton";

export function GroupHeaderSkeleton() {
  return (
    <div className="flex w-full px-4 py-6 relative space-x-4">
      <div>
        <Skeleton className="w-24 h-24" />
      </div>

      <div className="flex flex-1 border-b items-center space-x-4">
        <div className="flex-1">
          <h2 className="block after:content-[' '] after:absolute after:inset-0 after:w-full after:h-full">
            <Skeleton className="h-4 w-72" />
          </h2>
        </div>

        <div className="flex-shrink-0">
          <DefinedTrophiesSkeleton />
        </div>
      </div>
    </div>
  );
}
