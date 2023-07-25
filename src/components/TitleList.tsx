"use client";

import { TrophyTitle, UserTitlesResponse } from "psn-api";
import { useRef, useState } from "react";
import LazyScroll from "./LazyScroll";
import Title from "./Title";

type Props = {
  defaultTitles: TrophyTitle[];
  nextOffset?: number;
};

export function TitleList({ defaultTitles, nextOffset = 0 }: Props) {
  const isFetching = useRef(false);

  const [titles, setTitles] = useState(defaultTitles);
  const [offset, setOffset] = useState(nextOffset);
  const [hasMore, setHasMore] = useState(true);
  const [debounce, setDebounce] = useState<NodeJS.Timeout>();

  async function onEndOfList() {
    if (!hasMore || isFetching.current) return;

    isFetching.current = true;

    if (debounce) {
      clearTimeout(debounce);
      setDebounce(undefined);
      return;
    }

    const timeout = setTimeout(async () => {
      const response = await fetch(`/api/titles?offset=${offset}`);
      const json = (await response.json()) as UserTitlesResponse;

      setTitles((titles) => [...titles, ...json.trophyTitles]);
      setOffset(json.nextOffset ?? json.totalItemCount);
      setHasMore(!!json.nextOffset);

      isFetching.current = false;
    }, 500);

    setDebounce(timeout);
  }

  return (
    <LazyScroll callback={onEndOfList}>
      {titles.map((title) => (
        <Title title={title} key={title.npCommunicationId} />
      ))}
    </LazyScroll>
  );
}
