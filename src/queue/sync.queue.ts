import {ConnectionOptions, Queue} from "bullmq";
import {QueueName} from "~/enums/queue-name.enum";
import {JobName} from "~/enums/job-name.enum";

export const syncConnection: ConnectionOptions = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
};

export const syncQueue = new Queue(QueueName.Sync, {
    connection: syncConnection,
});

syncQueue.add(JobName.PrepareTitleImport, {}, {
    repeat: {
        pattern: '0 0 1 * * *',
    },
});