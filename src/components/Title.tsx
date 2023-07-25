import Link from "next/link";
import { TrophyTitle } from "psn-api";
import CompletionBar from "./CompletionBar";
import DefinedTrophies from "./DefinedTrophies";
import Icon from "./Icon";
import PlatinumTrophy from "./PlatinumTrophy";

type Props = {
  title: TrophyTitle;
};

export default function Title({ title }: Props) {
  return (
    <div className="flex w-full px-4 py-6 hover:animate-pulse relative space-x-4">
      <div>
        <Icon url={title.trophyTitleIconUrl} />
      </div>

      <div className="flex flex-1 border-b items-center space-x-4">
        <div className="flex-1">
          <Link
            href={`/titles/${title.npCommunicationId}`}
            className="block after:content-[' '] after:absolute after:inset-0 after:w-full after:h-full"
          >
            {title.trophyTitleName}
          </Link>

          <span>{title.trophyTitlePlatform}</span>
        </div>

        <div>
          <PlatinumTrophy trophies={title.earnedTrophies} />
        </div>

        <div className="w-16">
          <CompletionBar percentage={title.progress} />
        </div>

        <div className="flex-shrink-0">
          <DefinedTrophies trophies={title.earnedTrophies} />
        </div>
      </div>
    </div>
  );
}
