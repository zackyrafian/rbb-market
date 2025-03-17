import prisma from "@/utils/prisma";
import argon2 from "argon2";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try { 
        const {username, password} = await request.json();

        if (!username || password) { 
            return NextResponse.json(
                {error: "Username and password are required"},
                {status: 400}
            )
        }

        const user = await prisma.user.findUnique({
            where: username
        });

        if (!user) { 
            return NextResponse.json(
                {error: "Invalid username or password"},
                {status: 401}
            )
        }

        const isValid = await argon2.verify(user.password, password);

        if (!isValid) { 
            return NextResponse.json(
                {error: "Invalid username or password"},
                {status: 401}
            )
        }

    } catch (error) { 

    } finally { 
        await prisma.$disconnect();
    }

}
