import {beforeEach, describe, expect, it, vi} from "vitest";
import {ImportTitleJobHandler} from "~/jobs/import-title.job-handler";
import {ITrophyGroup, TrophyService} from "~/services/TrophyService";
import {TitleRepository} from "~/repositories/title.repository";
import {TrophyGroupRepository} from "~/repositories/trophy-group.repository";
import {TrophyTitle} from "psn-api";
import {PrepareTitleImportJobHandler} from "~/jobs/prepare-title-import.job-handler";
import {Queue} from "bullmq";

describe('testing the ImportTitleJobHandler class', () => {
    // const getGroupedTrophies = vi.fn();
    // const updateOrCreateOneByTrophyGroup = vi.fn();
    // const updateOrCreateOneByTitle = vi.fn();
    //
    const getAllTitles = vi.fn();
    const findOneByNpCommunicationId = vi.fn();
    const add = vi.fn();

    const trophyService = {
        getAllTitles,
    } as unknown as TrophyService;
    const titleRepository = {
        findOneByNpCommunicationId,
    } as unknown as TitleRepository;
    const syncQueue = {
        add,
    } as unknown as Queue;

    const handler = new PrepareTitleImportJobHandler(trophyService, titleRepository, syncQueue);

    beforeEach(() => {
        vi.clearAllMocks();

        getAllTitles.mockReturnValue((async function* () {
            yield { npCommunicationId: 'title_id', lastUpdatedDateTime: '2025-07-11' } as TrophyTitle;
        })());
    });

    it('returns the correct name', () => expect(handler.name).toEqual('prepare-title-import'));

    it('should add job to queue if title does not exist yet', async () => {
        findOneByNpCommunicationId.mockReturnValue(null);

        await handler.handle();

        expect(findOneByNpCommunicationId).toBeCalled();
        expect(add).toBeCalled();
    });

    it('should add job to queue if title exists but last update is not equal to persisted title', async () => {
        findOneByNpCommunicationId.mockReturnValue({ npCommunicationId: 'title_id', lastUpdatedDateTime: '2025-07-10' } as TrophyTitle);

        await handler.handle();

        expect(findOneByNpCommunicationId).toBeCalled();
        expect(add).toBeCalled();
    });

    it('should not add job to queue if title exists and last update is equal to persisted title', async () => {
        findOneByNpCommunicationId.mockReturnValue({ npCommunicationId: 'title_id', lastUpdatedDateTime: '2025-07-11' } as TrophyTitle);

        await handler.handle();

        expect(findOneByNpCommunicationId).toBeCalled();
        expect(add).toBeCalledTimes(0);
    });
});
