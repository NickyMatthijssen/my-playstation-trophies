import { GroupHeaderSkeleton } from "~/components/GroupHeaderSkeleton";
import { Skeleton } from "~/components/Skeleton";
import { TrophySkeleton } from "~/components/TrophySkeleton";

export default function Loading() {
  return (
    <div className="overflow-hidden mx-auto min-h-full">
      <div className="px-4 py-6 border-b flex items-center space-x-4">
        <Skeleton className="w-56 h-4 my-1" />
      </div>
      <div className="overflow-auto h-full space-y-12">
        <div className="mb-16">
          <GroupHeaderSkeleton />

          <div className="space-y-6 mt-6 pb-6">
            {Array.from(new Array(20)).map((_, index) => (
              <TrophySkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
