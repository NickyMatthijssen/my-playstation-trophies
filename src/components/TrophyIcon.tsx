import { TitleThinTrophy, UserThinTrophy } from "psn-api";

type Props = {
  trophy: TitleThinTrophy & UserThinTrophy;
};

export function TrophyIcon({ trophy }: Props) {
  return (
    <div className="relative">
      <img
        src={trophy.trophyIconUrl}
        width={86}
        height={86}
        alt={trophy.trophyName}
        className={!trophy.earned ? "opacity-25" : ""}
      />

      {!trophy.earned && (
        <img
          src={`/${trophy.trophyType}-trophy.png`}
          className="absolute inset-0 z-10 left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2"
          width={60}
        />
      )}
    </div>
  );
}
