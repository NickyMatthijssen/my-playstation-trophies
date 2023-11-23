type Props = {
  percentage: number;
  flexType?: "flex-col" | "flex-row";
};

export default function CompletionBar({ percentage }: Props) {
  return (
    <div className="flex flex-row md:flex-col xl:flex-row 2xl:flex-col items-center md:items-end xl:items-center 2xl:items-end space-x-4">
      <span className="text-right text-2xl">{percentage}%</span>

      <div className="h-2 w-full bg-neutral-600 rounded-lg">
        <div
          className="bg-neutral-300 h-full rounded-lg"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
