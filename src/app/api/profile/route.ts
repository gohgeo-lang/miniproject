import { prisma } from "@/lib/prisma";
import { profileSchema } from "@/lib/validation/profileSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const parsed = profileSchema.parse(data);

    const profile = await prisma.customerProfile.create({
      data: {
        phone: parsed.phone,
        address: parsed.address,
        latitude: parsed.latitude,
        longitude: parsed.longitude,
        userId: parsed.userId,
      },
    });

    return NextResponse.json(profile, { status: 201 });
  } catch (err: any) {
    console.error("프로필 등록 실패:", err);
  }
  return NextResponse.json({ error: err.message }, { status: 400 });
}
