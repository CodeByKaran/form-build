import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  const isLogged = !!session;

  if (
    isLogged &&
    (request.nextUrl.pathname.startsWith("/sign-in") ||
      request.nextUrl.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/prot", request.url));
  } else if (!isLogged && request.nextUrl.pathname.startsWith("/prot")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/prot", "/sign-in", "/sign-up", "/"],
};
