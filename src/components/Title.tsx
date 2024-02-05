import Link from "next/link";
import { TrophyTitle } from "psn-api";
import CompletionBar from "./CompletionBar";
import DefinedTrophies from "./DefinedTrophies";
import Icon from "./Icon";
import { PlatformBadge } from "./PlatformBadge";
import { PlatinumTrophy } from "./PlatinumTrophy";

type Props = {
  title: TrophyTitle;
};

export default function Title({ title }: Props) {
  return (
    <div className="flex w-full px-4 py-6 hover:animate-pulse relative space-x-4">
      <div className="pointer-events-none">
        <Icon
          url={title.trophyTitleIconUrl}
          float={<PlatformBadge platform={title.trophyTitlePlatform} />}
          alt={title.trophyTitleName}
        />
      </div>

      <div className="flex flex-col md:flex-row xl:flex-col 2xl:flex-row flex-1 border-b md:items-center xl:items-start 2xl:items-center md:space-x-4 xl:space-x-0 2xl:space-x-4 space-y-2.5 md:space-y-0 xl:space-y-2.5 2xl:space-y-0">
        <div className="flex-1">
          <Link
            href={`/titles/${title.npCommunicationId}`}
            className="block after:content-[' '] after:absolute after:inset-0 after:w-full after:h-full after:left-0 after:top-0"
          >
            {title.trophyTitleName}
          </Link>
        </div>

        <div className="hidden md:block xl:hidden 2xl:block">
          <PlatinumTrophy trophies={title.earnedTrophies} />
        </div>

        <div className="md:w-16 xl:w-full 2xl:w-16">
          <CompletionBar percentage={title.progress} />
        </div>

        <div className="flex items-center justify-between pb-2 md:pb-0 xl:pb-2 2xl:pb-0 xl:w-full 2xl:w-auto">
          <div className="flex-shrink-0">
            <DefinedTrophies trophies={title.earnedTrophies} />
          </div>

          <div className="flex-shrink-0 md:hidden xl:block 2xl:hidden">
            <PlatinumTrophy trophies={title.earnedTrophies} />
          </div>
        </div>
      </div>
    </div>
  );
}
