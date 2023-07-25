import { NextResponse } from "next/server";
import trophyService from "~/services/TrophyService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const response = await trophyService.getTitles(
    Number(searchParams.get("offset")) ?? 0
  );

  return NextResponse.json(response);
}
