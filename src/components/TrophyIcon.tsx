import Image from "next/image";
import { TitleThinTrophy, UserThinTrophy } from "psn-api";
import { Skeleton } from "./Skeleton";

type Props = {
  trophy: TitleThinTrophy & UserThinTrophy;
};

export function TrophyIcon({ trophy }: Props) {
  if (!trophy.trophyIconUrl || !trophy.trophyName) {
    return <Skeleton className="w-[86px] h-[86px]" />;
  }

  return (
    <div className="relative">
      <Image
        src={trophy.trophyIconUrl}
        width={86}
        height={86}
        alt={trophy.trophyName}
        className={!trophy.earned ? "opacity-25" : ""}
      />

      {!trophy.earned && (
        <Image
          src={`/${trophy.trophyType}-trophy.png`}
          className="absolute inset-0 z-10 left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2"
          width={60}
          height={60}
          alt="Locked trophy"
        />
      )}
    </div>
  );
}
