import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, logout } from "./services/authService";

const authRoutes = ["/login", "/register"];

const rolebasedPrivateUser = {
  customer: [
    /^\/user(\/.*)?$/,
    /^\/kitchen(\/.*)?$/,
    /^\/profile$/,
    /^\/settings$/,
    /^\/subscription$/,
  ],
  mealProvider: [
    /^\/mealProvider(\/.*)?$/,
    /^\/kitchen(\/.*)?$/,
    /^\/profile$/,
    /^\/settings$/,
    /^\/subscription$/,
  ],
  admin: [
    /^\/admin(\/.*)?$/,
    /^\/kitchen(\/.*)?$/,
    /^\/profile$/,
    /^\/settings$/,
    /^\/subscription$/,
  ],
  superAdmin: [
    /^\/admin(\/.*)?$/,
    /^\/kitchen(\/.*)?$/,
    /^\/profile$/,
    /^\/settings$/,
    /^\/subscription$/,
  ],
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
        new URL(`/login?redirectPath=${pathname}`, request.url)
      );
    }
  }
  const role = userInfo?.userRole as TRole;
  if (role && rolebasedPrivateUser[role]) {
    const allowedRoutes = rolebasedPrivateUser[role];
    const isAllowed = allowedRoutes.some((route) => {
      const match = pathname.match(route);
      return match !== null;
    });
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
    "/subscription",
    "/kitchen/(.*)",
    "/admin/(.*)",
    "/user/(.*)",
    "/mealProvider/(.*)",
  ],
};
