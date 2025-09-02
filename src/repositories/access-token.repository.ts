import {AbstractRepository} from "~/repositories/abstract.repository";
import {AuthTokensResponse} from "~/services/TokenService";
import {Db, WithId} from "mongodb";

export class AccessTokenRepository extends AbstractRepository<AuthTokensResponse> {
    constructor(database: Db) {
        super(database, 'keys');
    }

    public async findCurrentToken(): Promise<WithId<AuthTokensResponse>|null> {
        return await this.collection.findOne();
    }

    public async setToken(tokens: AuthTokensResponse): Promise<void> {
        await this.collection.insertOne(tokens);
    }

    public async clearToken(): Promise<void> {
        await this.collection.deleteMany();
    }
}