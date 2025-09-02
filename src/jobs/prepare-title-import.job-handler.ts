import {JobName} from "~/enums/job-name.enum";
import {TrophyService} from "~/services/TrophyService";
import {IJobHandler} from "~/types/job-handler.interface";
import {TitleRepository} from "~/repositories/title.repository";
import {Queue} from "bullmq";

const DELAY_INTERVAL_IN_MILLISECONDS: number = 60 * 1000;

export class PrepareTitleImportJobHandler implements IJobHandler {
    public constructor(
        private readonly _trophyService: TrophyService,
        private readonly _titleRepository: TitleRepository,
        private readonly _syncQueue: Queue
    ) {
    }

    public get name(): string {
        return JobName.PrepareTitleImport;
    }

    public async handle(): Promise<void> {
        const titles = this._trophyService.getAllTitles();

        let index = 0;
        // If last updated at has changed or there is no existing title we can import the title/trophies.
        // Logically there are better ways to do this, like using a where in query to retrieve the documents and then filter and stuff.
        // But for this version i keep it like this. Since after this i also need to rewrite the token and trophy services.
        for await (const title of titles) {
            const existingTitle = await this._titleRepository.findOneByNpCommunicationId(title.npCommunicationId);

            if (!existingTitle || existingTitle.lastUpdatedDateTime !== title.lastUpdatedDateTime) {
                await this._syncQueue.add(JobName.ImportTitle, { title }, {
                    delay: DELAY_INTERVAL_IN_MILLISECONDS * Number(index),
                });

                index++;
            }
        }
    }
}
