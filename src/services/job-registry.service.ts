import {AbstractHandlerJob} from "~/jobs/abstract-handler.job";

export class JobRegistryService {
    private _jobs = new Map<string, AbstractHandlerJob>();

    register(job: AbstractHandlerJob): void {
        this._jobs.set(job.name, job);
    }

    get(name: string): AbstractHandlerJob | undefined {
        return this._jobs.get(name);
    }
}