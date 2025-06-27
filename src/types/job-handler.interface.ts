export interface IJobHandler {
    get name(): string;
    handle(payload: unknown): Promise<void>;
}