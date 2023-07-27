import { TrophyCounts } from "psn-api";
import { useMemo } from "react";

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
          <img src={`/${type}-trophy.png`} width={44} />
          <span className="block mt-auto mb-1 text-xl font-thin w-4">
            {trophies[type as keyof TrophyCounts]}
          </span>
        </div>
      ))}
    </div>
  );
}
