import {describe, expect, it} from "vitest";
import {JobHandlerRegistryService} from "~/services/job-handler-registry.service";
import {IJobHandler} from "~/types/job-handler.interface";

describe('testing the registry service in a chain with the same key', (): void => {
    const jobHandlerRegistryService = new JobHandlerRegistryService();

    const createJobHandler = (): IJobHandler => {
        return {
            get name(): string {
                return 'test';
            },
        } as IJobHandler;
    };

    it('returns undefined if there is no job handler for the given job type', (): void => {
        expect(jobHandlerRegistryService.get('test')).toBeUndefined();
    });

    it('should return the handler after adding it with register', () => {
        const jobHandler = createJobHandler();

        jobHandlerRegistryService.register(jobHandler);

        expect(jobHandlerRegistryService.get('test')).toBe(jobHandler);
    });

    it('should overwrite the handler if another handler is added with the same key', (): void => {
        const newJobHandler = createJobHandler();

        const registeredJobHandler = jobHandlerRegistryService.get('test');
        expect(registeredJobHandler).not.toBeUndefined();
        expect(registeredJobHandler).not.toBe(newJobHandler);

        jobHandlerRegistryService.register(newJobHandler);
        expect(jobHandlerRegistryService.get('test')).toBe(newJobHandler);
    });
});