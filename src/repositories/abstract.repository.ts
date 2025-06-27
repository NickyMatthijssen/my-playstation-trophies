import {Db, Collection, Document} from "mongodb";

export abstract class AbstractRepository<TSchema extends Document> {
    protected collection: Collection<TSchema>;

    protected constructor(database: Db, collection: string) {
        this.collection = database.collection<TSchema>(collection);
    }
}