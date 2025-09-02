import {JobName} from "~/enums/job-name.enum";
import {TrophyTitle} from "psn-api";
import {TrophyService} from "~/services/TrophyService";
import {IJobHandler} from "~/types/job-handler.interface";
import {TitleRepository} from "~/repositories/title.repository";
import {TrophyGroupRepository} from "~/repositories/trophy-group.repository";

export class ImportTitleJobHandler implements IJobHandler {
    constructor(
        private readonly _titleRepository: TitleRepository,
        private readonly _trophyGroupRepository: TrophyGroupRepository,
        private readonly _trophyService: TrophyService,
    ) {
    }

    get name(): string {
        return JobName.ImportTitle;
    }

    async handle(payload: { title: TrophyTitle }): Promise<void> {
        await this._titleRepository.updateOrCreateOneByTitle(payload.title);

        const groups =  await this._trophyService.getGroupedTrophies(payload.title.npCommunicationId);
        for (const group of (groups ?? [])) {
            await this._trophyGroupRepository.updateOrCreateOneByTrophyGroup({ ...group, npCommunicationId: payload.title.npCommunicationId });
        }
    }
}
