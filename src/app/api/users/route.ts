import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validation/userSchema";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validated = registerSchema.parse(body);

        const hashedPassword = await bcrypt.hash(validated.password, 10);

        const user = await prisma.user.create({
            data: {
                name: validated.name,
                email: validated.email,
                password: hashedPassword,
            },
        });
    }
}