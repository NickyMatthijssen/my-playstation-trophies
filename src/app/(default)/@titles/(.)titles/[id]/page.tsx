import {notFound} from "next/navigation";
import {BackButton} from "./back-button";
import {GroupHeader} from "~/components/GroupHeader";
import Trophy from "~/components/Trophy";
import {ITrophyGroup, titleRepository, trophyGroupRepository} from "~/service-provider";
import {WithId} from "mongodb";

type Props = {
    params: Promise<{ id: string }>,
}

export default async function TitleSidePage({ params }: Props) {
    const { id } = await params;

    const title = await titleRepository.findOneByNpCommunicationId(id);
    if (!title) {
        return notFound();
    }

    const groups = await trophyGroupRepository.findAllByNpCommunicationId(id);

    return (
        <div className="overflow-hidden mx-auto min-h-full">
            <div className="px-4 py-6 border-b flex items-center space-x-4">
                <div className="block xl:hidden">
                    <BackButton/>
                </div>

                <h1>{title.trophyTitleName}</h1>
            </div>
            <div className="overflow-auto h-full space-y-12">
                {groups.map((group: WithId<ITrophyGroup>) => (
                    <div key={group.trophyGroupId}>
                        <GroupHeader group={group}/>

                        <div className="space-y-6 mt-6 pb-6">
                            {group.trophies.map((trophy) => (
                                <Trophy trophy={trophy} key={trophy.trophyId}/>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
