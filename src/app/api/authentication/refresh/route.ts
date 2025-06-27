import { NextResponse } from "next/server";
import { tokenService } from "~/service-provider";

export async function GET() {
  let success = true;

  try {
    await tokenService.authorize();
  } catch (_) {
    success = false;
  }

  return NextResponse.json({
    success,
  });
}
