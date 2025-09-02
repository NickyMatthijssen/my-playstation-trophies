import {
  AuthTokensResponse as PsnAuthTokensResponse,
  exchangeCodeForAccessToken,
  exchangeNpssoForCode,
  exchangeRefreshTokenForAuthTokens,
} from "psn-api";
import { ITokenStorage } from "../types/token-storage.interface";

export interface AuthTokensResponse extends PsnAuthTokensResponse {
  expirationDate?: string;
  refreshExpirationDate?: string;
}

// TODO:: Rewrite entire token service...
export class TokenService {
  private _storage: ITokenStorage;
  private _npsso: string;
  private _authorization?: AuthTokensResponse;

  public get authorization(): AuthTokensResponse | undefined {
    return this._authorization;
  }

  constructor(storage: ITokenStorage, npsso: string) {
    this._storage = storage;
    this._npsso = npsso;
  }

  public async authorize() {
    if (!this.authorization) {
      this._authorization = await this.getToken();
    }

    // Authorize the api by getting the token.
    const now = new Date();
    // Lazy fix for expiration datetime.
    now.setTime(now.getTime() + 1 * 60 * 60 * 1000);
    const nowTime = now.getTime();
    const expirationDateTime = new Date(
      this.authorization?.expirationDate ?? "01-01-1970"
    );
    expirationDateTime.setTime(now.getTime() - 1 * 60 * 60 * 1000);
    const refreshExpirationDateTime = new Date(
      this.authorization?.refreshExpirationDate ?? "01-01-1970"
    ).getTime();

    // Check if a new token should be fetched, this only happens if there is no authorization found
    // or if the token and refresh token are both expired.
    if (
      (expirationDateTime.getTime() < nowTime &&
        refreshExpirationDateTime < nowTime) ||
      !this.authorization
    ) {
      const accessCode = await exchangeNpssoForCode(this._npsso);
      const psnAuthorization = await exchangeCodeForAccessToken(accessCode);

      this.setToken(psnAuthorization);
    }
    // If the token is expired we refresh the token through the refresh token.
    else if (expirationDateTime.getTime() < nowTime) {
      // Or if the token should be refreshed.
      await this.refresh();
    }
  }

  public async refresh() {
    const psnAuthorization = await exchangeRefreshTokenForAuthTokens(
      this._authorization?.refreshToken ?? ""
    );

    this.setToken(psnAuthorization);
  }

  public async getToken(): Promise<AuthTokensResponse | undefined> {
    return this._storage.get();
  }

  public async setToken(psnAuthorization: PsnAuthTokensResponse) {
    const now = new Date();

    const authorization: AuthTokensResponse = { ...psnAuthorization };

    authorization.expirationDate = new Date(
        now.getTime() + authorization.expiresIn * 1000
    ).toISOString();

    authorization.refreshExpirationDate = new Date(
        now.getTime() + authorization.refreshTokenExpiresIn * 1000
    ).toISOString();

    this._authorization = authorization;

    this._storage.set(authorization);
  }
}
