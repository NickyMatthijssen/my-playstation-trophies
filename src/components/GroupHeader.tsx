import TrophyService, { ITrophyGroup } from "~/services/TrophyService";
import DefinedTrophies from "./DefinedTrophies";
import Icon from "./Icon";
import { PlatinumTrophy } from "./PlatinumTrophy";

type Props = {
  group: ITrophyGroup;
};

export function GroupHeader({ group }: Props) {
  const earnedTrophies = TrophyService.getEarnedTrophiesByGroup(group);

  return (
    <div className="flex w-full px-4 py-6 relative space-x-4">
      <div>
        <Icon url={group.trophyGroupIconUrl} />
      </div>

      <div className="flex flex-1 border-b items-center space-x-4">
        <div className="flex-1">
          <h2 className="block after:content-[' '] after:absolute after:inset-0 after:w-full after:h-full">
            {group.trophyGroupName}
          </h2>

          <span>{group.trophyGroupDetail}</span>
        </div>

        <div>
          <PlatinumTrophy trophies={earnedTrophies} />
        </div>

        <div className="flex-shrink-0">
          <DefinedTrophies trophies={earnedTrophies} />
        </div>
      </div>
    </div>
  );
}
