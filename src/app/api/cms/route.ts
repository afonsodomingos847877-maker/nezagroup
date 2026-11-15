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
  const expectedEmail = (
    process.env.CMS_ADMIN_EMAIL || "admin@nezagroup.co.mz"
  )
    .trim()
    .toLowerCase();
  const expectedPassword = process.env.CMS_ADMIN_PASSWORD || "@Admin123@";

  const providedEmail = (req.headers.get("x-cms-email") || "")
    .trim()
    .toLowerCase();
  const providedPassword = req.headers.get("x-cms-password") || "";

  return providedEmail === expectedEmail && providedPassword === expectedPassword;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const collection = req.nextUrl.searchParams.get("collection") || "projects";

  if (collection === "summary") {
    const [projects, services, products, leadership, partners, news, messages] =
      await Promise.all([
        readCmsFile<unknown[]>("projects.json"),
        readCmsFile<unknown[]>("services.json"),
        readCmsFile<unknown[]>("products.json"),
        readCmsFile<unknown[]>("leadership.json"),
        readCmsFile<{ clients: unknown[]; partners: unknown[] }>("partners.json"),
        readCmsFile<unknown[]>("news.json"),
        readCmsFile<unknown[]>("messages.json"),
      ]);

    return NextResponse.json({
      summary: {
        projects: projects.length,
        services: services.length,
        products: products.length,
        leadership: leadership.length,
        clients: partners.clients?.length || 0,
        partners: partners.partners?.length || 0,
        news: news.length,
        messages: messages.length,
      },
      recentMessages: messages.slice(0, 5),
    });
  }

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
