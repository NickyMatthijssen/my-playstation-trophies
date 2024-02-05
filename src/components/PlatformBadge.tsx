import { useMemo } from "react";

type PlatformBadgeProps = {
  platform: string;
};

export function PlatformBadge({ platform }: PlatformBadgeProps) {
  const platforms = useMemo<string[]>(() => platform.split(","), [platform]);

  return (
    <div className="group space-y-1">
      {platforms.map((platform) => (
        <div
          className="bg-neutral-800 text-sm inline-block px-2 py-0.5 rounded"
          key={platform}
        >
          {platform}
        </div>
      ))}
    </div>
  );
}
