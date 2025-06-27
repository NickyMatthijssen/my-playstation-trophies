import {Job, Worker} from "bullmq";
import {QueueName} from "~/enums/queue-name.enum";
import {JobName} from "~/enums/job-name.enum";
import {jobHandlerRegistryService} from "~/service-provider";
import {syncConnection} from "~/queue/sync.queue";

export const syncWorker = new Worker(
    QueueName.Sync,
    async (job: Job<any, any, JobName>) => {
        const jobHandler = jobHandlerRegistryService.get(job.name);
        if (!jobHandler) {
            throw new Error(`No job handler found for job ${job.name}`);
        }

        await jobHandler.handle(job.data);
    },
    {
        autorun: true,
        connection: syncConnection,
        concurrency: 5,
        removeOnComplete: { count: 1000 },
        removeOnFail: { count: 5000 },
    },
);

syncWorker.on('ready', () => console.log(`[INIT] Sync queue worker ready...`));

syncWorker.on('completed', job => {
    console.log(`[PROCESSED] Job ${job.id} has completed`);
});

syncWorker.on('failed', (job, err) => {
    console.log(`[ERROR] Job ${job?.id} has failed with message: "${err.message}"`);
});