import { PrismaClient } from "@prisma/client";
import { AuthTokensResponse } from "./TokenService";
import { TokenStorage } from "./TokenStorage";

export class PrismaTokenStorage implements TokenStorage {
  private _client: PrismaClient;

  constructor() {
    this._client = new PrismaClient();
  }

  async get(): Promise<AuthTokensResponse | undefined> {
    return (await this._client.keys.findFirst()) as AuthTokensResponse;
  }

  async set(tokens: AuthTokensResponse) {
    await this._client.keys.deleteMany();

    await this._client.keys.create({
      data: tokens,
    });
  }
}
