import { NextRequest, NextResponse } from "next/server";
import { db } from "@/utils/db";

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

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) { 
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 } 
            )
        }

        // TEMP 
        if (password.length < 2) { 
            return NextResponse.json(
                { error: "Password must be at least 8 characters long"},
                { status: 400 }
            )
        }

        const existingUser = await db.user.findFirst({
            where: {
                OR: [
                    { username },
                    { email }
                ]
            }
        });

        if (existingUser) { 
            return NextResponse.json(
                {error: "Username  or email already exists"}, 
                {status: 409}
            )
        }

        const hashedPassword = await argon2.hash(password);

        const newUser = await db.user.create({
            data: {
              username,
              email,
              password: hashedPassword, 
            },
          });
        return NextResponse.json(
            {message: "User registered successfully", user: {id: newUser.id, username, email}},
            {status: 201}
        )
    } catch (error) {
        return NextResponse.json(
            {message: "User Failed register", error},
            {status: 500}
        )

    } finally {
        await db.$disconnect();
    }
}