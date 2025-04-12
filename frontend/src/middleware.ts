import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/token";
import { cookies } from "next/headers";

const protectedRoutes = ["/platform"];
const publicRoutes = ["/login", "/signup", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get("access_token")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.sub) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (
    isPublicRoute &&
    session?.sub &&
    !req.nextUrl.pathname.startsWith("/platform")
  ) {
    return NextResponse.redirect(new URL("/platform", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
