"use client";

import { TrophyTitle, UserTitlesResponse } from "psn-api";
import LazyScroll from "./LazyScroll";
import Title from "./Title";
import { useInfiniteQuery } from "@tanstack/react-query";

export function TitleList() {
  const { data, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["title"],
    queryFn: async ({ pageParam }) => {
      if (isFetching) {
      }

      const response = await fetch(`/api/titles?offset=${pageParam}`);
      return (await response.json()) as UserTitlesResponse;
    },
    initialPageParam: 0,
    getNextPageParam: (page: UserTitlesResponse) => page.nextOffset,
  });

  const onEndOfList = () => {
    if (isFetching) {
      return;
    }

    fetchNextPage();
  };

  return (
    <LazyScroll callback={onEndOfList}>
      {data?.pages.map((page) =>
        page.trophyTitles.map((title: TrophyTitle) => (
          <Title title={title} key={title.npCommunicationId} />
        ))
      )}
    </LazyScroll>
  );
}
