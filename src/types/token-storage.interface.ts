import { AuthTokensResponse as PsnAuthTokensResponse } from "psn-api";
import {AuthTokensResponse} from "~/services/TokenService";

export interface ITokenStorage {
  get: () => Promise<AuthTokensResponse | undefined>;
  set: (tokens: PsnAuthTokensResponse) => Promise<void>;
}
