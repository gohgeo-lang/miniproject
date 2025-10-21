import { prisma } from "@/lib/prisma";
import { carSchema } from "@/lib/validation/carSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const parsed = carSchema.parse(data);

    const car = await prisma.car.create({
      data: {
        brand: parsed.brand,
        model: parsed.model,
        year: parsed.year,
        size: parsed.size,
        plate: parsed.plate,
        userId: parsed.userId,
      },
    });

    return NextResponse.json(car, { status: 201 });
  } catch (err: any) {
    console.error("차량 등록 실패:", err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
