import Link from "next/link";
import { notFound } from "next/navigation";
import { GroupHeader } from "~/components/GroupHeader";
import Trophy from "~/components/Trophy";
import { trophyService } from "~/services";

export default async function TitlePage({ params: { id } }: any) {
  const groups = await trophyService.getGroupedTrophies(id);

  if (!groups) {
    return notFound();
  }

  return (
    <>
      <div className="w-full border-b py-4 px-4 flex items-center space-x-4 sticky top-0 bg-neutral-900 z-10">
        <Link
          href="/collection"
          className="w-6 h-6 p-1 flex items-center justify-center rounded-full bg-neutral-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </Link>

        <h1>{groups[0].trophyGroupName}</h1>
      </div>
      <div className="w-full py-2 space-y-12">
        {groups.map((group) => (
          <div key={group.trophyGroupId}>
            <GroupHeader group={group} />

            <div className="space-y-6 mt-6 pb-6">
              {group.trophies.map((trophy) => (
                <Trophy trophy={trophy} key={trophy.trophyId} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
