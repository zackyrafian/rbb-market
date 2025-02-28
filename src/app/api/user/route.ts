import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try { 
        const {username, email, password} = await request.json();

        if (!username || !email || !password) { 
            return NextResponse.json(
                { error: "Missing required fields"}, 
                { status: 400 },
            );
        }
    } catch (error) { 

    } finally { 
        await prisma?.$disconnect();
    }
}