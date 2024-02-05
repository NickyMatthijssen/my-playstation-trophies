export * from "./TokenService";
export * from "./TrophyService";

import { TokenService } from "./TokenService";
import { TrophyService } from "./TrophyService";
import { VercelKVTokenStorage } from "./VercelKVTokenStorage";
import { PrismaTokenStorage } from "./PrismaTokenStorage";

declare let process: {
  env: {
    NPSSO: string;
    STORAGE_PROVIDER: "prisma" | "vercelkv";
  };
};

let storage;

switch (process.env.STORAGE_PROVIDER) {
  case "prisma":
    storage = new PrismaTokenStorage();
    break;
  case "vercelkv":
    storage = new VercelKVTokenStorage();
    break;
  default:
    throw new Error();
}

export const tokenService = new TokenService(storage, process.env.NPSSO);
export const trophyService = new TrophyService(tokenService);
