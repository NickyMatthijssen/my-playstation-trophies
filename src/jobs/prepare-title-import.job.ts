import {AbstractHandlerJob, IJobHandler} from "~/jobs/abstract-handler.job";
import {JobName} from "~/enums/job-name.enum";
import {TrophyService} from "~/services";
import {syncQueue} from "~/queue/sync.queue";
import {MongoClient} from "mongodb";

const DELAY_INTERVAL_IN_MILLISECONDS: number = 60 * 1000;

export class PrepareTitleImportJob extends AbstractHandlerJob implements IJobHandler {
    private readonly _mongoClient: MongoClient;
    private readonly _trophyService: TrophyService;

    constructor(mongoClient: MongoClient, trophyService: TrophyService) {
        super();

        this._mongoClient = mongoClient;
        this._trophyService = trophyService;
    }

    get name(): string {
        return JobName.PrepareTitleImport;
    }

    async handle(): Promise<void> {
        const titles = this._trophyService.getAllTitles();

        let insertableTitles = [];
        // Retrieve a list of titles where last updated at has changed...
        for await (const title of titles) {
            const existingTitle = await this._mongoClient
                .db('psn')
                .collection('titles')
                .findOne({
                    $or: [
                        { npCommunicationId: title.npCommunicationId, lastUpdatedDateTime: { $ne: title.lastUpdatedDateTime}},
                        { npCommunicationId: title.npCommunicationId },
                    ]
                });

            if (existingTitle === null || existingTitle.lastUpdatedDateTime !== title.lastUpdatedDateTime) {
                insertableTitles.push(title);
            }
        }

        // TODO: Fix second loop, unnecessary and could be put in first.
        for (const index in insertableTitles) {
            await syncQueue.add(JobName.ImportTitle, { title: insertableTitles[index] }, {
                delay: DELAY_INTERVAL_IN_MILLISECONDS * Number(index),
            });
        }
    }
}
