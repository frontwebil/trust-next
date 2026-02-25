import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const ipHeader = req.headers.get("x-forwarded-for");
  const ip = ipHeader?.split(",")[0];

  const geoRes = await fetch(`https://geoip.vuiz.net/geoip?ip=${ip}`);
  const geo = await geoRes.json();

  console.log({
    ip,
    country: geo.country,
    region: geo.region,
    city: geo.city,
  });

  return NextResponse.json({ success: true });
}
