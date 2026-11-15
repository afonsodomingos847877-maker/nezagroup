import { NextRequest, NextResponse } from "next/server";
import { readCmsFile, writeCmsFile } from "@/lib/cms";

const ALLOWED_COLLECTIONS = new Set([
  "projects",
  "services",
  "products",
  "leadership",
  "partners",
  "news",
  "messages",
]);

function checkAuth(req: NextRequest): boolean {
  const expected = process.env.CMS_ADMIN_PASSWORD || "neza2026";
  const provided = req.headers.get("x-cms-password") || "";
  return provided === expected;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const collection = req.nextUrl.searchParams.get("collection") || "projects";
  if (!ALLOWED_COLLECTIONS.has(collection)) {
    return NextResponse.json({ error: "Invalid collection" }, { status: 400 });
  }
  const data = await readCmsFile(`${collection}.json`);
  return NextResponse.json({ data });
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { collection, data } = body;
  if (!ALLOWED_COLLECTIONS.has(collection)) {
    return NextResponse.json({ error: "Invalid collection" }, { status: 400 });
  }
  await writeCmsFile(`${collection}.json`, data);
  return NextResponse.json({ ok: true });
}

