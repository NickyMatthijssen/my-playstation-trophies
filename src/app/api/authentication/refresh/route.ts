import { NextResponse } from "next/server";
import trophyService from "~/services/TrophyService";

export async function POST() {
  await trophyService.refresh();

  return NextResponse.json({
    authorization: trophyService.authorization,
  });
}
