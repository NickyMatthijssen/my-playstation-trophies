import {JobName} from "~/enums/job-name.enum";
import {syncQueue} from "~/queue/sync.queue";
import {MongoClient} from "mongodb";
import {TrophyService} from "~/services/TrophyService";
import {IJobHandler} from "~/types/job-handler.interface";

const DELAY_INTERVAL_IN_MILLISECONDS: number = 60 * 1000;

export class PrepareTitleImportJobHandler implements IJobHandler {
    private readonly _mongoClient: MongoClient;
    private readonly _trophyService: TrophyService;

    public constructor(mongoClient: MongoClient, trophyService: TrophyService) {
        this._mongoClient = mongoClient;
        this._trophyService = trophyService;
    }

    public get name(): string {
        return JobName.PrepareTitleImport;
    }

    public async handle(): Promise<void> {
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
