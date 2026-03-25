import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { canAccessPath, protectedPrefixes, roleHome } from "@/lib/permissions/routes";
import type { UserRole } from "@/lib/permissions/roles";

export async function proxy(request: NextRequest) {
    const response = await updateSession(request);
    const { pathname } = request.nextUrl;

    const isProtected = protectedPrefixes.some(
        (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    );

    if (!isProtected) return response;

    const role = request.cookies.get("user_role")?.value as UserRole | undefined;

    const accessToken = request.cookies.get("sb-access-token")?.value
        || request.cookies.get("sb-access-token.0")?.value;

    if (!accessToken) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (!role) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (!canAccessPath(role, pathname)) {
        return NextResponse.redirect(new URL(roleHome[role], request.url));
    }

    return response;
}

export const config = {
    matcher: ["/admin/:path*", "/rrhh/:path*", "/candidato/:path*", "/revisoria/:path*"],
};
