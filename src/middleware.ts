import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

export const middleware = async (request: NextRequest, event: NextFetchEvent) => {
  if (request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register")) {
    return NextResponse.next();
  }

  let cookie = request.cookies.get('sessionToken')?.value
  console.log(cookie)
  
  if(!cookie){
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
};
