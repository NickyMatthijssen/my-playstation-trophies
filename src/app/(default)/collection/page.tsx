import {titleRepository} from "~/service-provider";
import Title from "~/components/Title";
import {TrophyTitle} from "psn-api";
import {WithId} from "mongodb";

export default async function TitlesPage() {
    const titles = await titleRepository.findAllOrderedByUpdatedDate();

    return (
        <div className="h-full overflow-auto">
            {titles.map((title: WithId<TrophyTitle>) => <Title title={title} key={title.npCommunicationId} />)}
        </div>
    );
}
