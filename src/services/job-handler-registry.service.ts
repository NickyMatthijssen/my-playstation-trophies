import {IJobHandler} from "~/types/job-handler.interface";

export class JobHandlerRegistryService {
    private _jobs = new Map<string, IJobHandler>();

    public register(job: IJobHandler): void {
        this._jobs.set(job.name, job);
    }

    public get(name: string): IJobHandler | undefined {
        return this._jobs.get(name);
    }
}