export abstract class AbstractHandlerJob {
    abstract get name(): string;
    abstract handle(payload: unknown): Promise<void>;
}

export interface IJobHandler {
    get name(): string;
    handle(payload: unknown): Promise<void>;
}