import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest) {
  // Check for secret to confirm this is a valid request
  if (req.nextUrl.searchParams.get("secret_token") !== process.env.SECRET_TOKEN) {
    return new NextResponse("Invalid token", { status: 401 });
  }

  const path = req.nextUrl.searchParams.get("path") || "/";
  revalidatePath(path);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
