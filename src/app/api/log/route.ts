import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const geo = await res.json();

    console.log({
      ip: geo.ip,
      country: geo.country_name,
      region: geo.region,
      city: geo.city,
    });

    return NextResponse.json({ success: true, geo });
  } catch (err) {
    return NextResponse.json({ success: false, error: err });
  }
}
