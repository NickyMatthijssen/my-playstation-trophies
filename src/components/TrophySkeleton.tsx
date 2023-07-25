import { Skeleton } from "./Skeleton";

export function TrophySkeleton() {
  return (
    <div className={"flex space-x-4 px-4"}>
      <div>
        <Skeleton className="w-[86px] h-[86px]" />
      </div>

      <div>
        <Skeleton className="h-5 w-72 mb-5" />
        <Skeleton className="h-4 w-56" />
        {/* <h3 className="text-2xl font-bold mb-2">{trophy.trophyName}</h3> */}
        {/* <p className="text-neutral-400">{trophy.trophyDetail}</p> */}
      </div>
    </div>
  );
}
