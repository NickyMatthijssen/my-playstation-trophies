import { NextResponse } from "next/server";
import trophyService from "~/services/TrophyService";

export async function POST() {
  let success = true;

  try {
    await trophyService.refresh();
  } catch (_) {
    success = false;
  }

  return NextResponse.json({
    success,
  });
}
