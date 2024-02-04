import { TitleList } from "~/components/TitleList";
import { trophyService } from "~/services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { UserTitlesResponse } from "psn-api";

export default async function TitlesPage() {
  const client = new QueryClient();

  await client.fetchInfiniteQuery({
    queryKey: ["title"],
    queryFn: ({ pageParam }) => trophyService.getTitles(pageParam),
    initialPageParam: 0,
    getNextPageParam: (page: UserTitlesResponse) => page.nextOffset,
  });

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <TitleList />
    </HydrationBoundary>
  );
}
