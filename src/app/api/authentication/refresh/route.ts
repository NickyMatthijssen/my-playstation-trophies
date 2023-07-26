import { CronJob } from "quirrel/next-app";
import trophyService from "~/services/TrophyService";

const RefreshJob = CronJob(
  "api/authentication/refresh",
  "@weekly",
  async () => {
    await trophyService.refresh();
  }
);

export const POST = RefreshJob as Function;
