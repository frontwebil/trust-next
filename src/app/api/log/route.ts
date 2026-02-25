import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const ipHeader = req.headers.get("x-forwarded-for");
  const ip = ipHeader?.split(",")[0];

  const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
  const geo = await geoRes.json();

  console.log({
    ip,
    country: geo.country_name,
    city: geo.city,
  });

  return NextResponse.json({ success: true });
}
