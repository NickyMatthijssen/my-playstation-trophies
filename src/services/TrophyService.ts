import {
  AuthTokensResponse as PsnAuthTokensResponse,
  exchangeCodeForAccessToken,
  exchangeNpssoForCode,
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
  exchangeRefreshTokenForAuthTokens,
} from "psn-api";
import { TrophyGroup } from "psn-api/dist/models/trophy-group.model";
import fs from "fs";

declare let process: {
  env: {
    NPSSO: string;
  };
};

export const revalidate = 0;
export const dynamic = "force-dynamic";

export interface ITrophy extends TitleThinTrophy, UserThinTrophy {}

export interface ITrophyGroup extends TrophyGroup {
  trophies: ITrophy[];
}

export type Platform = "trophy" | "trophy2" | undefined;

export interface AuthTokensResponse extends PsnAuthTokensResponse {
  expirationDate?: string;
  refreshExpirationDate?: string;
}

export class TrophyService {
  private npsso: string;
  private accessCode?: string;
  private authorization?: AuthTokensResponse;

  constructor(npsso: string) {
    this.npsso = npsso;
  }

  public async initialize() {
    // if (!this.authorization) {
    //   console.log("get persisted authorization");
    this.authorization = this.getPersistentAuthorization();
    // }

    const now = new Date();
    const nowTime = now.getTime();
    const expirationDateTime = new Date(
      this.authorization?.expirationDate ?? "01-01-1970"
    ).getTime();
    const refreshExpirationDateTime = new Date(
      this.authorization?.refreshExpirationDate ?? "01-01-1970"
    ).getTime();

    if (
      (expirationDateTime < nowTime && refreshExpirationDateTime < nowTime) ||
      !this.authorization
    ) {
      this.accessCode = await exchangeNpssoForCode(this.npsso);
      this.authorization = await exchangeCodeForAccessToken(this.accessCode);

      this.authorization = this.extendAuthorization(this.authorization);
      this.setPersistentAuthorization(this.authorization);
    } else if (expirationDateTime < nowTime) {
      console.log("expired");
      await this.refresh();
    }
  }

  public async refresh() {
    const oldAuthorization =
      this.authorization ?? this.getPersistentAuthorization();

    if (!oldAuthorization) {
      throw new Error("Can't retrieve new tokens");
    }

    this.authorization = await exchangeRefreshTokenForAuthTokens(
      oldAuthorization.refreshToken
    );

    console.log("new tokens");

    this.authorization = this.extendAuthorization(this.authorization);
    this.setPersistentAuthorization(this.authorization);
  }

  private getPersistentAuthorization(): AuthTokensResponse | undefined {
    try {
      const data = fs.readFileSync("/var/tmp/keys.json");
      console.log("data from file", JSON.parse(data.toString()));

      return JSON.parse(data.toString()) as AuthTokensResponse;
    } catch (e) {
      return undefined;
    }
  }

  private setPersistentAuthorization(authorization: AuthTokensResponse): void {
    fs.writeFileSync("/var/tmp/keys.json", JSON.stringify(authorization));
  }

  private extendAuthorization(
    authorization: AuthTokensResponse
  ): AuthTokensResponse {
    const now = new Date();

    authorization.expirationDate = new Date(
      now.getTime() + authorization.expiresIn * 1000
    ).toISOString();

    authorization.refreshExpirationDate = new Date(
      now.getTime() + authorization.refreshTokenExpiresIn * 1000
    ).toISOString();

    return authorization;
  }

  public async getTitles(offset: number = 0): Promise<UserTitlesResponse> {
    if (!this.accessCode || !this.authorization) {
      await this.initialize();
    }

    return await getUserTitles(
      { accessToken: this.authorization?.accessToken ?? "" },
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
      await this.initialize();
    }

    const response = await getTitleTrophies(
      this?.authorization ?? ({} as AuthTokensResponse),
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
      await this.initialize();
    }

    const response = await getUserTrophiesEarnedForTitle(
      this.authorization ?? ({} as AuthTokensResponse),
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
      await this.initialize();
    }

    const response = await getTitleTrophyGroups(
      this.authorization ?? ({} as AuthTokensResponse),
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

export default new TrophyService(process.env.NPSSO);
