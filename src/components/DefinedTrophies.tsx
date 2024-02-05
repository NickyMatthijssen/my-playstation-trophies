import Image from "next/image";
import { TrophyCounts } from "psn-api";

type Props = {
  trophies: TrophyCounts;
};

export default function DefinedTrophies({ trophies }: Props) {
  const copy: Partial<TrophyCounts> = { ...trophies };
  delete copy.platinum;

  const types = Object.keys(copy).reverse();

  return (
    <div className="flex space-x-4">
      {types.map((type) => (
        <div key={type} className="flex">
          <Image
            src={`/${type}-trophy.png`}
            width={44}
            height={50.38}
            alt={`${type} trophy`}
          />
          <span className="block mt-auto mb-1 text-xl font-thin w-4">
            {trophies[type as keyof TrophyCounts]}
          </span>
        </div>
      ))}
    </div>
  );
}
