import { TitleList } from "~/components/TitleList";
import { trophyService } from "~/services";

export default async function TitlesPage() {
  const response = await trophyService.getTitles();

  return (
    <TitleList
      defaultTitles={response.trophyTitles}
      nextOffset={response.nextOffset}
    />
  );
}
