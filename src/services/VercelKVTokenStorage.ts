import { kv } from "@vercel/kv";
import { AuthTokensResponse } from "./TokenService";
import { TokenStorage } from "./TokenStorage";

export class VercelKVTokenStorage implements TokenStorage {
  async get(): Promise<AuthTokensResponse | undefined> {
    return (await kv.get<AuthTokensResponse>("key")) ?? undefined;
  }

  async set(tokens: AuthTokensResponse) {
    await kv.set("key", tokens);
  }
}
