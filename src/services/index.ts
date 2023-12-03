export * from "./TokenService";
export * from "./TrophyService";

import { TokenService } from "./TokenService";
import { TrophyService } from "./TrophyService";
import client from "database/client.mjs";

declare let process: {
  env: {
    NPSSO: string;
  };
};

export const tokenService = new TokenService(client, process.env.NPSSO);
export const trophyService = new TrophyService(tokenService);
