import { AuthTokensResponse } from ".";
import { AuthTokensResponse as PsnAuthTokensResponse } from "psn-api";

export interface TokenStorage {
  get: () => Promise<AuthTokensResponse | undefined>;
  set: (tokens: PsnAuthTokensResponse) => Promise<void>;
}
