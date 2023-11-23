import { notFound } from "next/navigation";
import { BackButton } from "~/components/BackButton";
import { GroupHeader } from "~/components/GroupHeader";
import Trophy from "~/components/Trophy";
import trophyService from "~/services/TrophyService";

export default async function TitleSidePage({ params: { id } }: any) {
  const groups = await trophyService.getGroupedTrophies(id);

  if (!groups) {
    notFound();
  }

  return (
    <div className="overflow-hidden mx-auto h-full">
      <div className="px-4 py-6 border-b flex items-center space-x-4">
        <div className="block xl:hidden">
          <BackButton />
        </div>

        <h1>{groups[0].trophyGroupName}</h1>
      </div>
      <div className="overflow-auto h-full space-y-12">
        {groups.map((group) => (
          <div key={group.trophyGroupId}>
            <GroupHeader group={group} />

            <div className="space-y-6 mt-6 pb-24">
              {group.trophies.map((trophy) => (
                <Trophy trophy={trophy} key={trophy.trophyId} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
