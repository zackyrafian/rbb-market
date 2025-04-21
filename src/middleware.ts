import { NextRequest, NextResponse } from "next/server";


export async function middleware(request:NextRequest) {
    if (request.nextUrl.pathname.startsWith("/uploads")) { 
        return NextResponse.next();
    }

    if (request.nextUrl.pathname.startsWith("/dashboard")) {
        const dahsboardResponse = await handleAuthentication(request);
        if (dahsboardResponse) return dahsboardResponse;
    }
}
async function handleUrlModification(request: NextRequest) {
    const url = request.nextUrl.clone();
    const path = url.pathname;

    if (path.startsWith('/uploads')) { 
        return null;
    }

    const lowercasePath = path.toLocaleLowerCase();
    const modifiedPath = lowercasePath.replace(/%20/g, "-");

    if (path !== modifiedPath) { 
        url.pathname = modifiedPath;
        return NextResponse.redirect(url);
    }

    return null;
}

async function handleAuthentication(request: NextRequest) { 
    const token = request.cookies.get("next-auth.session-token")?.value;

    if (!token) { 
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("next-auth.session-token");
        return response;
    }
}

                    
// next-auth.session-token
                  


export const config = { 
    matcher: [
        "/dashboard/:path*",
        "/((?!api|_next/static|_next/image|favicon.ico|uploads).*)"
      ],
}