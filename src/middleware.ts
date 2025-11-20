// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const AUTH_ROUTES = ["/login", "/signup", "/forgot-password", "/reset-password"];

// const PROTECTED_ROUTES = [
//   "/view-royalities",
//   "/royal-dashboard",
//   "/withdraw-funds",
//   "/royalty-report",
//   "/transaction-reports",
// ];

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // 🔹 Get token from cookies (middleware can’t use localStorage)
//   const cookieHeader = request.headers.get("cookie"); // full cookie string
//   console.log("Cookie Header:", cookieHeader);

//   // If you want the value of auth_token specifically:
//   const token = cookieHeader
//     ?.split("; ")
//     .find((row) => row.startsWith("auth_token="))
//     ?.split("=")[1];

//   const isProtected = PROTECTED_ROUTES.includes(pathname);
//   console.log("isProtected:", pathname, isProtected);

//   const isAuthRoute = AUTH_ROUTES.includes(pathname);
//   console.log("isauthxdfnbfnbvgm", isAuthRoute);
//   console.log("Auth Token:", token);
//   if (isProtected && !token) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   if (isAuthRoute && token) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
// };
// app/middleware.ts
// middleware.ts
// middleware.ts
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const AUTH_ROUTES = ["/login", "/signup", "/forgot-password", "/reset-password"];
const PROTECTED_ROUTES = [
  "/view-royalities",
  "/royal-dashboard",
  "/withdraw-funds",
  "/royalty-report",
  "/transaction-reports",
];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  console.log("Middleware Path:", pathname, "| Token:", !!token);

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/api/user/:path*",
  ],
};
