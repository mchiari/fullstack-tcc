import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { verifyAuth } from "./lib/utils";

export const middleware = async (req: NextRequest, e: NextFetchEvent) => {
  if (req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register")) {
    return NextResponse.next();
  }

  //handling css and assets
  if (req.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  let token = req.cookies.get("sessionToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((error) => {
      req.cookies.delete("sessionToken")
      return false
    }));

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  //TODO: HANDLE MIDDLEWARE AUTH

  return NextResponse.next();
};
