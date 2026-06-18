import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(
request: NextRequest
) {
const token =
request.cookies.get("token");

const pathname =
request.nextUrl.pathname;

const protectedRoutes = [
"/developer",
"/admin",
"/staff",
];

const isProtected =
protectedRoutes.some((route) =>
pathname.startsWith(route)
);

if (
isProtected &&
!token
) {
return NextResponse.redirect(
new URL(
"/login",
request.url
)
);
}

return NextResponse.next();
}

export const config = {
matcher: [
"/developer/:path*",
"/admin/:path*",
"/staff/:path*",
],
};
