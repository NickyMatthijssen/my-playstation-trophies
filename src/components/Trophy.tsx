import clsx from "clsx";
import { TitleThinTrophy, UserThinTrophy } from "psn-api";
import { useMemo } from "react";
import { TrophyIcon } from "./TrophyIcon";
import dayjs from "dayjs";

type Props = {
  trophy: TitleThinTrophy & UserThinTrophy;
};

export default function Trophy({ trophy }: Props) {
  const earnedDateTime = useMemo(
    () => dayjs(trophy.earnedDateTime).format("DD MMM YYYY, HH:mm"),
    [trophy.earnedDateTime]
  );

  const dateTime = (
    <small className="self-start text-neutral-400">{earnedDateTime}</small>
  );

  return (
    <div
      className={clsx("flex space-x-4 px-4", !trophy.earned && "opacity-50")}
    >
      <div className="flex-shrink-0">
        <TrophyIcon trophy={trophy} />
      </div>

      <div className="flex-grow">
        <div className="mb-2">
          <h3 className="text-2xl font-bold">{trophy.trophyName}</h3>
          {trophy.earned && <div className="md:hidden">{dateTime}</div>}
        </div>
        <p className="text-neutral-400">{trophy.trophyDetail}</p>
      </div>

      {trophy.earned && (
        <div className="hidden md:block flex-shrink-0">{dateTime}</div>
      )}
    </div>
  );
}
