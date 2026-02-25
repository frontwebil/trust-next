import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { hash, net } = await req.json();

    if (!hash || !net) {
      return NextResponse.json(
        { error: "hash і net обовʼязкові" },
        { status: 400 },
      );
    }

    const record = await prisma.hashAddress.create({
      data: {
        hash,
        netCrypto: net,
      },
    });

    return NextResponse.json({ success: true, id: record.id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
