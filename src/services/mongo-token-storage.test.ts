import {it, vi} from "vitest";
import {MongoTokenStorageService} from "~/services/mongo-token-storage.service";
import {MongoClient} from "mongodb";

it('should try to retrieve tokens from database', (): void => {
    // const client = vi.spyOn(MongoClient.prototype, 'db');
    //
    // const mongoTokenStorage = new MongoTokenStorageService(client.mock);
    //
    // mongoTokenStorage.get();
});