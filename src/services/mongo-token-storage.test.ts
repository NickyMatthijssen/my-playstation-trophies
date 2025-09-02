import {expect, it, vi} from "vitest";
import {MongoTokenStorageService} from "~/services/mongo-token-storage.service";
import {AccessTokenRepository} from "~/repositories/access-token.repository";
import {AuthTokensResponse} from "~/services/TokenService";

it('should try to retrieve tokens from database', async (): Promise<void> => {
    const findCurrentToken = vi.fn();
    findCurrentToken.mockReturnValue({ _id: '1234567890', accessToken: '1234567890'});

    const accessTokenRepository = {
        findCurrentToken: findCurrentToken,
        setToken: vi.fn(),
        clearToken: vi.fn(),
    } as unknown as AccessTokenRepository;

    const mongoTokenStorage = new MongoTokenStorageService(accessTokenRepository);

    expect(await mongoTokenStorage.get()).toMatchObject({ accessToken: '1234567890' });
});

it('should return undefined if there was no object found', async (): Promise<void> => {
    const findCurrentToken = vi.fn();
    findCurrentToken.mockReturnValue(null);

    const accessTokenRepository = {
        findCurrentToken: findCurrentToken,
        setToken: vi.fn(),
        clearToken: vi.fn(),
    } as unknown as AccessTokenRepository;

    const mongoTokenStorage = new MongoTokenStorageService(accessTokenRepository);

    expect(await mongoTokenStorage.get()).toBeUndefined();
});

it('should return undefined if there was no object found', async (): Promise<void> => {
    const clearToken = vi.fn();
    const setToken = vi.fn();

    const accessTokenRepository = {
        findCurrentToken: vi.fn(),
        setToken: setToken,
        clearToken: clearToken,
    } as unknown as AccessTokenRepository;

    const mongoTokenStorage = new MongoTokenStorageService(accessTokenRepository);

    await mongoTokenStorage.set({ accessToken: '12345678' } as AuthTokensResponse);

    expect(clearToken).toBeCalled();
    expect(setToken).toBeCalled();
    expect(setToken).toBeCalledWith({ accessToken: '12345678' });
});