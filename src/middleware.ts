import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, logout } from "./services/authService";

const authRoutes = ["/login", "/register"];

const rolebasedPrivateUser = {
  customer: [/^\/user/, /^\/kitchen/, /^\/profile/, /^\/settings/],
  mealProvider: [/^\/mealProvider/, /^\/kitchen/, /^\/profile/, /^\/settings/],
  admin: [/^\/admin/, /^\/kitchen/, /^\/profile/, /^\/settings/],
  superAdmin: [/^\/admin/, /^\/kitchen/, /^\/profile/, /^\/settings/],
};

type TRole = keyof typeof rolebasedPrivateUser;
export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const userInfo = await getCurrentUser();
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }
  const role = userInfo?.userRole as TRole;
  if (role && rolebasedPrivateUser[role]) {
    const allowedRoutes = rolebasedPrivateUser[role];
    const isAllowed = allowedRoutes.some((route) => pathname.match(route));
    if (!isAllowed) {
      await logout();
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  } else {
    await logout();
    return NextResponse.redirect(new URL("/login", request.url));
  }
};

export const config = {
  matcher: [
    "/profile",
    "/settings",
    "/kitchen",
    "/admin",
    "/admin/:page",
    "/user",
    "/user/:page",
    "/mealProvider",
    "/mealProvider/:page",
  ],
};
