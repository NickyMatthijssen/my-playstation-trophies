import { GroupHeaderSkeleton } from "~/components/GroupHeaderSkeleton";
import { Skeleton } from "~/components/Skeleton";
import { TrophySkeleton } from "~/components/TrophySkeleton";

export default function Loading() {
  return (
    <div className="overflow-hidden mx-auto h-full">
      <div className="px-4 py-6 border-b">
        <Skeleton className="w-56 h-4 my-1" />
      </div>
      <div className="overflow-auto h-full">
        <div className="mb-16">
          <GroupHeaderSkeleton />

          <div className="space-y-6 mt-6 pb-6">
            {Array.from(new Array(20)).map((index) => (
              <TrophySkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
