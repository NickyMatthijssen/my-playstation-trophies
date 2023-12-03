import { NextResponse } from "next/server";
import { trophyService } from "~/services";

export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const response = await trophyService.getTitles(
    Number(searchParams.get("offset")) ?? 0
  );

  return NextResponse.json(response);
}
