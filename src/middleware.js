import { NextResponse } from 'next/server'

export function middleware(request) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyemail" || path === "/forgotpassword" || path === "/resetpassword";

    const token = request.cookies.get("token")?.value || "";

    if (path === "/") {
        if (Boolean(token)) {
            return NextResponse.redirect(new URL("/profile", request.nextUrl))
        }

        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    if (isPublicPath && Boolean(token)) {
        return NextResponse.redirect(new URL("/profile", request.nextUrl));
    }

    if (!isPublicPath && !Boolean(token)) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
}

export const config = {
    matcher: [
        "/",
        "/profile/:path*",
        "/login",
        "/signup",
        "/verifyemail",
        "/forgotpassword",
        "/resetpassword",
    ],
}