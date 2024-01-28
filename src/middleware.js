import { NextResponse } from 'next/server'

export function middleware(request) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyemail";

    const token = request.cookies.get("token")?.value || "";

    if (isPublicPath && Boolean(token)) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
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
    ],
}