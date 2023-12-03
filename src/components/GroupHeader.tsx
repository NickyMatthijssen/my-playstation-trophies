import { trophyService } from "~/services";
import { ITrophyGroup } from "~/services";
import DefinedTrophies from "./DefinedTrophies";
import Icon from "./Icon";
import { PlatinumTrophy } from "./PlatinumTrophy";

type Props = {
  group: ITrophyGroup;
};

export function GroupHeader({ group }: Props) {
  const earnedTrophies = trophyService.getEarnedTrophiesByGroup(group);

  return (
    <div className="flex w-full px-4 py-6 relative space-x-4">
      <div>
        <Icon url={group.trophyGroupIconUrl} />
      </div>

      <div className="flex flex-1 flex-col md:flex-row border-b md:items-center md:space-x-4">
        <div className="flex-1">
          <h2 className="block after:content-[' '] after:absolute after:inset-0 after:w-full after:h-full mb-3 md:mb-3">
            {group.trophyGroupName}
          </h2>
        </div>

        <div className="flex flex-shrink-0 items-center space-x-4">
          <div>
            <PlatinumTrophy trophies={earnedTrophies} />
          </div>

          <div className="flex-shrink-0">
            <DefinedTrophies trophies={earnedTrophies} />
          </div>
        </div>
      </div>
    </div>
  );
}
