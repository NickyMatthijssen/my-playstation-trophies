import clsx from "clsx";
import { TitleThinTrophy, UserThinTrophy } from "psn-api";
import { TrophyIcon } from "./TrophyIcon";

type Props = {
  trophy: TitleThinTrophy & UserThinTrophy;
};

export default function Trophy({ trophy }: Props) {
  return (
    <div
      className={clsx("flex space-x-4 px-4", !trophy.earned && "opacity-50")}
    >
      <div className="flex-shrink-0">
        <TrophyIcon trophy={trophy} />
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-2">{trophy.trophyName}</h3>
        <p className="text-neutral-400">{trophy.trophyDetail}</p>
      </div>
    </div>
  );
}
