import {ITokenStorage} from "~/types/token-storage.interface";
import {AuthTokensResponse} from "~/services/TokenService";
import {MongoClient} from "mongodb";

export class MongoTokenStorageService implements ITokenStorage {
    private _client: MongoClient;

    constructor(client: MongoClient) {
        this._client = client;
    }

    async get(): Promise<AuthTokensResponse | undefined> {
        const result = await this._client.db('psn').collection('keys').findOne();

        if (!result) {
            return undefined;
        }

        const { _id, ...authTokens } = result;
        return authTokens as AuthTokensResponse;

    }

    async set(tokens: AuthTokensResponse) {
        await this._client.db('psn').collection('keys').deleteMany();

        await this._client.db('psn').collection('keys').insertOne(tokens);
    }
}
