import { validateToken } from "@/Utils/Auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const jwtCookie = request.cookies.get("smartJwt")?.value;
  if (!jwtCookie || (jwtCookie && !validateToken(jwtCookie))) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }
}

export const config = {
  matcher: "/Admin/:path*",
};
