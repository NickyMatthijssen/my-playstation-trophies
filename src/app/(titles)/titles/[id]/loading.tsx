import { GroupHeaderSkeleton } from "~/components/GroupHeaderSkeleton";
import { Skeleton } from "~/components/Skeleton";
import { TrophySkeleton } from "~/components/TrophySkeleton";

export default function Loading() {
  return (
    <>
      <div className="w-full border-b py-4 px-4 flex items-center space-x-4 sticky top-0 bg-neutral-900 z-10">
        <Skeleton className="w-6 h-6 !rounded-full" />

        <Skeleton className="w-56 h-4" />
      </div>
      <div className="w-full py-2">
        <div className="mb-16">
          <GroupHeaderSkeleton />

          <div className="space-y-6 mt-6 pb-6">
            {Array.from(new Array(20)).map((index) => (
              <TrophySkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
