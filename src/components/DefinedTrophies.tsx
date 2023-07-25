import { TrophyCounts } from "psn-api";

type Props = {
  trophies: TrophyCounts;
};

export default function DefinedTrophies({ trophies }: Props) {
  // @ts-ignore
  delete trophies.platinum;
  const types = Object.keys(trophies).reverse();

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
