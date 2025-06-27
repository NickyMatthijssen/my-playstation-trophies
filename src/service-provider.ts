import {MongoClient} from "mongodb";
import { TokenService } from "./services/TokenService";
import { TrophyService } from "./services/TrophyService";
import { MongoTokenStorageService } from "./services/mongo-token-storage.service";
import { JobHandlerRegistryService } from "./services/job-handler-registry.service";
import { ImportTitleJobHandler } from "~/jobs/import-title.job-handler";
import {PrepareTitleImportJobHandler} from "~/jobs/prepare-title-import.job-handler";
import { TitleRepository } from "~/repositories/title.repository";
import {TrophyGroupRepository} from "~/repositories/trophy-group.repository";

if (undefined === process.env.MONGO_DB_CONNECTION_STRING || undefined === process.env.NPSSO) {
    throw new Error('Missing necessary environment variables.');
}

export const mongoClient = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);
export const mongoDatabase = mongoClient.db('psn');

export const storage = new MongoTokenStorageService(mongoClient);
export const tokenService = new TokenService(storage, process.env.NPSSO);
export const trophyService = new TrophyService(tokenService);
export const jobHandlerRegistryService = new JobHandlerRegistryService();

jobHandlerRegistryService.register(new PrepareTitleImportJobHandler(mongoClient, trophyService));
jobHandlerRegistryService.register(new ImportTitleJobHandler(mongoDatabase, trophyService));

export const titleRepository = new TitleRepository(mongoDatabase);
export const trophyGroupRepository = new TrophyGroupRepository(mongoDatabase);