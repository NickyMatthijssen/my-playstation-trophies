"use client";

import clsx from "clsx";
import { useSelectedLayoutSegment } from "next/navigation";
import { useMemo } from "react";

export default function DefaultLayout({
  children,
  titles,
}: {
  children: React.ReactNode;
  titles: React.ReactNode;
}) {
  const loginSegments = useSelectedLayoutSegment("titles");

  const gameSelected = useMemo(
    () => loginSegments !== "__DEFAULT__",
    [loginSegments]
  );

  return (
    <div className="grid xl:grid-cols-2 3xl:grid-cols-5 h-full">
      <div className="3xl:col-span-2 border-r h-full overflow-auto sticky top-0 relative z-0">
        {children}
      </div>
      <div
        className={clsx(
          "3xl:col-span-3 overflow-auto hidden xl:block absolute xl:relative w-screen h-screen xl:w-auto xl:h-auto inset-0 z-10 bg-neutral-900",
          { "!block": gameSelected }
        )}
      >
        {titles}
      </div>
    </div>
  );
}
