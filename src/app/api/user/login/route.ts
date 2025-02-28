import { NextRequest, NextResponse } from "next/server";



export async function POST(request:NextRequest) {
    try {
        const {username, password} = await request.json();

        const user = await prisma?.user.findUnique({
            where: username,
        })

        if (!user) { 
            return NextResponse.json({ error: "user not found"}, {status: 404})
        }

    } catch (error) { 
        console.error("Login error", error);
        return NextResponse.json(
            { error: "Interval server error"},
            { status: 500 },
        )
    } finally {
        await prisma?.$disconnect();
    }
}