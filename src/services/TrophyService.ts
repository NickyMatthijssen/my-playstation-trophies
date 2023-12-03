import {
  getTitleTrophies,
  getTitleTrophyGroups,
  getUserTitles,
  getUserTrophiesEarnedForTitle,
  TitleThinTrophy,
  TitleTrophiesResponse,
  TitleTrophyGroupsResponse,
  TrophyCounts,
  UserThinTrophy,
  UserTitlesResponse,
  UserTrophiesEarnedForTitleResponse,
} from "psn-api";
import { TrophyGroup } from "psn-api/dist/models/trophy-group.model";
import { TokenService, AuthTokensResponse } from "./TokenService";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export interface ITrophy extends TitleThinTrophy, UserThinTrophy {}

export interface ITrophyGroup extends TrophyGroup {
  trophies: ITrophy[];
}

export type Platform = "trophy" | "trophy2" | undefined;

export class TrophyService {
  private tokenService: TokenService;

  private accessCode?: string;
  private authorization?: AuthTokensResponse;

  constructor(tokenService: TokenService) {
    this.tokenService = tokenService;
  }

  public async getTitles(offset: number = 0): Promise<UserTitlesResponse> {
    if (!this.accessCode || !this.authorization) {
      // await this.initialize();
      await this.tokenService.authorize();
    }

    return await getUserTitles(
      // { accessToken: this.authorization?.accessToken ?? "" },
      { accessToken: this.tokenService.authorization?.accessToken ?? "" },
      "me",
      { offset }
    );
  }

  public async getTrophies(id: string, platform: Platform): Promise<ITrophy[]> {
    const [trophiesResponse, earnedTrophiesResponse] = await Promise.all([
      this.getTitleTrophies(id, platform),
      this.getEarnedTitleTrophies(id, platform),
    ]);

    // Combine all trophies with the earned trophy data.
    return trophiesResponse.trophies.map((trophy) => ({
      ...trophy,
      ...earnedTrophiesResponse.trophies.find(
        (earnedTrophy) => earnedTrophy.trophyId === trophy.trophyId
      ),
    }));
  }

  public async getTitleTrophies(
    id: string,
    platform: Platform
  ): Promise<TitleTrophiesResponse> {
    if (!this.accessCode || !this.authorization) {
      // await this.initialize();
      await this.tokenService.authorize();
    }

    const response = await getTitleTrophies(
      // this?.authorization ?? ({} as AuthTokensResponse),
      this.tokenService?.authorization ?? ({} as AuthTokensResponse),
      id,
      "all",
      {
        npServiceName: platform,
      }
    );

    // @ts-ignore
    if (response.error) {
      throw new Error("Resource doesn't exist");
    }

    return response;
  }

  public async getEarnedTitleTrophies(
    id: string,
    platform: Platform
  ): Promise<UserTrophiesEarnedForTitleResponse> {
    if (!this.accessCode || !this.authorization) {
      // await this.initialize();
      await this.tokenService.authorize();
    }

    const response = await getUserTrophiesEarnedForTitle(
      // this.authorization ?? ({} as AuthTokensResponse),
      this.tokenService.authorization ?? ({} as AuthTokensResponse),
      "me",
      id,
      "all",
      {
        npServiceName: platform,
      }
    );

    // @ts-ignore
    if (response.error) {
      throw new Error("Resource doesn't exist");
    }

    return response;
  }

  public async getTitleTrophyGroups(
    id: string,
    platform: Platform
  ): Promise<TitleTrophyGroupsResponse> {
    if (!this.accessCode || !this.authorization) {
      await this.tokenService.authorize();
    }

    const response = await getTitleTrophyGroups(
      this.tokenService.authorization ?? ({} as AuthTokensResponse),
      id,
      {
        npServiceName: platform,
      }
    );

    // @ts-ignore
    if (response.error) {
      throw new Error("Resource doesn't exist");
    }

    return response;
  }

  public async getTitleTrophiesGrouped(
    id: string,
    platform: Platform
  ): Promise<Map<string, ITrophyGroup>> {
    const [groupsResponse, trophies] = await Promise.all([
      this.getTitleTrophyGroups(id, platform),
      this.getTrophies(id, platform),
    ]);

    const groups = new Map<string, ITrophyGroup>();

    for (const group of groupsResponse.trophyGroups) {
      if (!groups.has(group.trophyGroupId)) {
        groups.set(group.trophyGroupId, {
          ...group,
          trophies: [],
        });
      }

      const groupedTrophies = trophies.filter(
        (t) => t.trophyGroupId == group.trophyGroupId
      );

      for (const trophy of groupedTrophies) {
        groups.get(group.trophyGroupId)?.trophies.push(trophy);
      }
    }

    return groups;
  }

  public getEarnedTrophiesByGroup(group: ITrophyGroup): TrophyCounts {
    const trophies: TrophyCounts = {
      bronze: 0,
      silver: 0,
      gold: 0,
      platinum: 0,
    };

    for (const trophy of group.trophies) {
      if (!trophy.earned) continue;

      trophies[trophy.trophyType]++;
    }

    return trophies;
  }

  public async getGroupedTrophies(
    id: string
  ): Promise<ITrophyGroup[] | undefined> {
    for (const platform of ["trophy", "trophy2"] as Platform[]) {
      try {
        const groups = await this.getTitleTrophiesGrouped(id, platform);

        return Array.from(groups.values());
      } catch (e) {
        continue;
      }
    }

    return undefined;
  }
}
