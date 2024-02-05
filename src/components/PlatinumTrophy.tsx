import Image from "next/image";
import { TrophyCounts } from "psn-api";

type Props = {
  trophies: TrophyCounts;
};

export function PlatinumTrophy({ trophies }: Props) {
  if (!trophies.platinum) {
    return <></>;
  }

  return (
    <Image
      src="/platinum-trophy.png"
      alt="Platinum trophy"
      width={76}
      height={92}
      className="object-contain"
    />
  );
}
