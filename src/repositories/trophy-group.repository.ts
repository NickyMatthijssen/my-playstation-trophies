import {Db, WithId} from "mongodb";
import {ITrophyGroup} from "~/services/TrophyService";
import {AbstractRepository} from "~/repositories/abstract.repository";

export class TrophyGroupRepository extends AbstractRepository<ITrophyGroup> {
    constructor(database: Db) {
        super(database, 'groups');
    }

    public async findAllByNpCommunicationId(npCommunicationId: string): Promise<WithId<ITrophyGroup>[]> {
        return this.collection.find({ npCommunicationId }).toArray();
    }

    public async updateOrCreateOneByTrophyGroup(group: ITrophyGroup & { npCommunicationId: string }): Promise<void> {
        await this.collection.updateOne({ npCommunicationId: group.npCommunicationId, trophyGroupId: group.trophyGroupId, }, { $set: { ...group } }, { upsert: true });
    }
}
