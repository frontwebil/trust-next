import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const ipHeader = req.headers.get("x-forwarded-for");
  const ip = ipHeader?.split(",")[0];

  const geoRes = await fetch(`https://geoip.vuiz.net/geoip?ip=${ip}`);
  const geo = await geoRes.json();

  if (!ip) {
    return NextResponse.json({ success: false });
  }

  await prisma.ipGeo.create({
    data: {
      ip,
      country: geo.country ?? "Not found",
      region: geo.region ?? "Not found",
      city: geo.city ?? "Not found",
    },
  });

  return NextResponse.json({ success: true });
}
