import { Database } from "sqlite3";
import {
  AuthTokensResponse as PsnAuthTokensResponse,
  exchangeCodeForAccessToken,
  exchangeNpssoForCode,
  exchangeRefreshTokenForAuthTokens,
} from "psn-api";

export interface AuthTokensResponse extends PsnAuthTokensResponse {
  expirationDate?: string;
  refreshExpirationDate?: string;
}

export class TokenService {
  private _client: Database;
  private _npsso: string;
  private _authorization?: AuthTokensResponse;

  public get authorization(): AuthTokensResponse | undefined {
    return this._authorization;
  }

  constructor(client: Database, npsso: string) {
    this._client = client;
    this._npsso = npsso;
  }

  public async authorize() {
    if (!this.authorization) {
      this._authorization = await this.getToken();
    }

    // Authorize the api by getting the token.
    const now = new Date();
    const nowTime = now.getTime();
    const expirationDateTime = new Date(
      this.authorization?.expirationDate ?? "01-01-1970"
    ).getTime();
    const refreshExpirationDateTime = new Date(
      this.authorization?.refreshExpirationDate ?? "01-01-1970"
    ).getTime();

    // Check if a new token should be fetched, this only happens if there is no authorization found
    // or if the token and refresh token are both expired.
    if (
      (expirationDateTime < nowTime && refreshExpirationDateTime < nowTime) ||
      !this.authorization
    ) {
      const accessCode = await exchangeNpssoForCode(this._npsso);
      const psnAuthorization = await exchangeCodeForAccessToken(accessCode);

      this.setToken(psnAuthorization);
    }
    // If the token is expired we refresh the token through the refresh token.
    else if (expirationDateTime < nowTime) {
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
    return new Promise((resolve, reject) => {
      this._client.get(
        `
      SELECT * FROM tokens;
    `,
        (error?: Error, row?: AuthTokensResponse) => {
          if (error) {
            return reject(error);
          }

          return resolve(row);
        }
      );
    });
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

    this._client.serialize(() => {
      this._client.run(`
      DELETE FROM tokens
      WHERE 1
    `);

      this._client.run(
        `
      INSERT INTO tokens (accessToken, expiresIn, idToken, refreshToken, refreshTokenExpiresIn, scope, tokenType, expirationDate, refreshExpirationDate)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
        [...Object.values(authorization)],
        (err) => console.log(err)
      );
    });
  }
}
