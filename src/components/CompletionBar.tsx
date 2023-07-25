type Props = {
  percentage: number;
};

export default function CompletionBar({ percentage }: Props) {
  return (
    <div className="flex flex-col">
      <span className="text-right text-2xl">{percentage}%</span>

      <div className="h-2 w-full bg-neutral-600">
        <div
          className="bg-neutral-300 h-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
