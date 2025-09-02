import {ITokenStorage} from "~/types/token-storage.interface";
import {AuthTokensResponse} from "~/services/TokenService";
import {AccessTokenRepository} from "~/repositories/access-token.repository";

export class MongoTokenStorageService implements ITokenStorage {
    private _accessTokenRepository: AccessTokenRepository;

    constructor(accessTokenRepository: AccessTokenRepository) {
        this._accessTokenRepository = accessTokenRepository;
    }

    async get(): Promise<AuthTokensResponse | undefined> {
        const result = await this._accessTokenRepository.findCurrentToken();

        if (!result) {
            return undefined;
        }

        const { _id, ...authTokens } = result;
        return authTokens;

    }

    async set(tokens: AuthTokensResponse) {
        await this._accessTokenRepository.clearToken();

        await this._accessTokenRepository.setToken(tokens);
    }
}
