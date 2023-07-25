"use client";

import { useElementScroll } from "~/hooks";

type Props = React.PropsWithChildren & {
  callback: Function;
};

export default function LazyScroll({ children, callback }: Props) {
  const ref = useElementScroll<HTMLDivElement>(() => {
    if (!ref.current) return;

    if (
      ref.current.scrollHeight >=
      ref.current.scrollTop - ref.current.offsetHeight
    ) {
      callback();
    }
  });

  return (
    <div ref={ref} className="h-full overflow-auto">
      {children}
    </div>
  );
}
