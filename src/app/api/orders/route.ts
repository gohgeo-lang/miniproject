import { prisma } from "@/lib/prisma";
import { orderSchema } from "@/lib/validation/orderSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = orderSchema.parse(body);

    const newOrder = await prisma.washOrder.create({
      data: {
        date: new Date(parsed.date),
        timeSlot: parsed.timeSlot,
        serviceType: parsed.serviceType,
        totalPrice: parsed.totalPrice,
        userId: parsed.userId,
        carId: parsed.carId,
      },
    });
    return NextResponse.json(newOrder, { status: 201 });
  } catch (err: any) {
    console.error("예약 생성 실패:", err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const orders = await prisma.washOrder.findMany({
      orderBy: { createdAt: "desc" },
      include: { car: true, user: true },
    });
    return NextResponse.json(orders);
  } catch (err: any) {
    return NextResponse.json({ error: "예약 조회 실패" }, { status: 500 });
  }
}
