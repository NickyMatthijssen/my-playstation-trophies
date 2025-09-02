import {Db, WithId} from "mongodb";
import {TrophyTitle} from "psn-api";
import {AbstractRepository} from "~/repositories/abstract.repository";

export class TitleRepository extends AbstractRepository<TrophyTitle> {
    constructor(database: Db) {
        super(database, 'titles');
    }

    public async findOneByNpCommunicationId(npCommunicationId: string): Promise<WithId<TrophyTitle>|null> {
        return this.collection.findOne({ npCommunicationId });
    }

    public async findAllOrderedByUpdatedDate(): Promise<WithId<TrophyTitle>[]> {
        return this.collection.find().sort({lastUpdatedDateTime: -1}).toArray();
    }

    public async updateOrCreateOneByTitle(title: TrophyTitle): Promise<void> {
        await this.collection.updateOne({ npCommunicationId: title.npCommunicationId }, { $set: { ...title } }, { upsert: true });
    }
}
