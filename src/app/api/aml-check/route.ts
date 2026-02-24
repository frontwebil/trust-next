// app/api/aml-check/route.ts
import { NextRequest, NextResponse } from "next/server";

function getMockRisk(address: string): "low" | "medium" | "high" {
  const lastChar = address.slice(-1).toLowerCase();
  if ("0123456".includes(lastChar)) return "low";
  if ("789abc".includes(lastChar)) return "medium";
  return "high";
}

export async function POST(req: NextRequest) {
  const { address, chain } = await req.json();

  if (!address || !chain) {
    return NextResponse.json(
      { error: "address і chain обовʼязкові" },
      { status: 400 },
    );
  }

  // Імітуємо затримку API
  await new Promise((res) => setTimeout(res, 1200));

  const risk = getMockRisk(address);

  const scoreMap = {
    low: Math.floor(Math.random() * 30) + 5, // 5–34
    medium: Math.floor(Math.random() * 30) + 40, // 40–69
    high: Math.floor(Math.random() * 25) + 75, // 75–99
  };

  return NextResponse.json({
    address,
    chain,
    risk,
    score: scoreMap[risk],
    checkedAt: new Date().toISOString(),
    // Фейкові деталі для UI
    details: {
      transactions: Math.floor(Math.random() * 500) + 10,
      firstSeen: "2021-03-14",
      sanctions: risk === "high",
      mixerUsage: risk !== "low",
      darknetLinks: risk === "high",
    },
  });
}
