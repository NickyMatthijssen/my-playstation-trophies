import {MongoClient} from "mongodb";

export * from "./TokenService";
export * from "./TrophyService";

import { TokenService } from "./TokenService";
import { TrophyService } from "./TrophyService";
import { MongoTokenStorage } from "./MongoTokenStorage";
import { JobRegistryService } from "./job-registry.service";
import { ImportTitleJob } from "~/jobs/import-title.job";
import {PrepareTitleImportJob} from "~/jobs/prepare-title-import.job";
import { TitleRepository } from "~/repositories/title.repository";
import {TrophyGroupRepository} from "~/repositories/trophy-group.repository";

if (undefined === process.env.MONGO_DB_CONNECTION_STRING || undefined === process.env.NPSSO) {
    throw new Error('Missing necessary environment variables.');
}

export const mongoClient = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);
export const mongoDatabase = mongoClient.db('psn');

export const storage = new MongoTokenStorage(mongoClient);
export const tokenService = new TokenService(storage, process.env.NPSSO);
export const trophyService = new TrophyService(tokenService);
export const jobRegistryService = new JobRegistryService();

jobRegistryService.register(new PrepareTitleImportJob(mongoClient, trophyService));
jobRegistryService.register(new ImportTitleJob(mongoDatabase, trophyService));

export const titleRepository = new TitleRepository(mongoDatabase);
export const trophyGroupRepository = new TrophyGroupRepository(mongoDatabase);