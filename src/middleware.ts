import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/app/api/auth/[...nextauth]/options";

export async function middleware(request: NextRequest) {
  //return NextResponse.next();
  
  const session = await auth();

  const isLogged = !!session;

  if (isLogged && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } else if (!isLogged && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
