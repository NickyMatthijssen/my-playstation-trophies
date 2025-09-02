import {beforeEach, describe, expect, it, vi} from "vitest";
import {ImportTitleJobHandler} from "~/jobs/import-title.job-handler";
import {ITrophyGroup, TrophyService} from "~/services/TrophyService";
import {TitleRepository} from "~/repositories/title.repository";
import {TrophyGroupRepository} from "~/repositories/trophy-group.repository";
import {TrophyTitle} from "psn-api";

describe('testing the ImportTitleJobHandler class', () => {
    const getGroupedTrophies = vi.fn();
    const updateOrCreateOneByTrophyGroup = vi.fn();
    const updateOrCreateOneByTitle = vi.fn();

    const trophyService = {
        getGroupedTrophies,
    } as unknown as TrophyService;
    const titleRepository = {
        updateOrCreateOneByTitle,
    } as unknown as TitleRepository;
    const trophyGroupRepository = {
        updateOrCreateOneByTrophyGroup,
    } as unknown as TrophyGroupRepository;

    const handler = new ImportTitleJobHandler(titleRepository, trophyGroupRepository, trophyService);

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('returns the correct name', () => expect(handler.name).toEqual('import-title'));

    it('should persist a title and it\'s trophy groups.', async () => {
        getGroupedTrophies.mockResolvedValue([
            { trophyGroupId: '1' } as ITrophyGroup,
            { trophyGroupId: '2' } as ITrophyGroup,
        ]);

        await new ImportTitleJobHandler(titleRepository, trophyGroupRepository, trophyService).handle({ title: { npCommunicationId: 'title_id' } as TrophyTitle });

        expect(updateOrCreateOneByTitle).toBeCalled();
        expect(updateOrCreateOneByTitle).toBeCalledWith({ npCommunicationId: 'title_id' });

        expect(getGroupedTrophies).toBeCalled();
        expect(getGroupedTrophies).toBeCalledWith('title_id');

        expect(updateOrCreateOneByTrophyGroup).toBeCalledTimes(2);
        expect(updateOrCreateOneByTrophyGroup).toHaveBeenNthCalledWith(1, { trophyGroupId: '1', npCommunicationId: 'title_id' });
        expect(updateOrCreateOneByTrophyGroup).toHaveBeenNthCalledWith(2, { trophyGroupId: '2', npCommunicationId: 'title_id' });
    });
});
