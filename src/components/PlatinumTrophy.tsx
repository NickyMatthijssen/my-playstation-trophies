import { TrophyCounts } from "psn-api";

type Props = {
  trophies: TrophyCounts;
};

export function PlatinumTrophy({ trophies }: Props) {
  if (!trophies.platinum) {
    return <></>;
  }

  return (
    <img
      src="/platinum-trophy.png"
      alt="Platinum"
      width={76}
      height={92}
      className="object-contain"
    />
  );
}
