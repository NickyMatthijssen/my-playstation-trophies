import {JobName} from "~/enums/job-name.enum";
import {TrophyTitle} from "psn-api";
import {Collection, Db} from "mongodb";
import {ITrophyGroup, TrophyService} from "~/services/TrophyService";
import {IJobHandler} from "~/types/job-handler.interface";

export class ImportTitleJobHandler implements IJobHandler {
    private readonly _titlesCollection: Collection<TrophyTitle>;
    private readonly _groupsCollection: Collection<{npCommunicationId: string, groups: ITrophyGroup[]}>;
    private readonly _trophyService: TrophyService;

    constructor(database: Db, trophyService: TrophyService) {
        this._titlesCollection = database.collection('titles');
        this._groupsCollection = database.collection('groups');
        this._trophyService = trophyService;
    }

    get name(): string {
        return JobName.ImportTitle;
    }

    async handle(payload: { title: TrophyTitle }): Promise<void> {
        await this._titlesCollection.updateOne({ npCommunicationId: payload.title.npCommunicationId }, { $set: { ...payload.title } }, { upsert: true });

        const groups =  await this._trophyService.getGroupedTrophies(payload.title.npCommunicationId);
        for (const group of (groups ?? [])) {
            await this._groupsCollection.updateOne({ npCommunicationId: payload.title.npCommunicationId, trophyGroupId: group.trophyGroupId, }, { $set: { ...group } }, { upsert: true });
        }
    }
}
