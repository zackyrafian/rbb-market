import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import argon2 from "argon2";

export async function POST(request: NextRequest) {
    try {
        const { username, email, password } = await request.json();

        if (!username || !email || !password) {
            return NextResponse.json(
                { error: "Username and password are required" },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: {username}
        })

        if (existingUser) { 
            return NextResponse.json(
                {error: "Username already exists"}, 
                {status: 409}
            )
        }

        const hashedPassword = await argon2.hash(password);

        const newUser = await prisma.user.create({
            data: {
              username,
              email,
              password: hashedPassword, 
            },
          });
        return NextResponse.json(
            {message: "User registered successfully", user: newUser},
            {status: 201}
        )
    } catch (error) {

    } finally {
        await prisma.$disconnect();
    }
}