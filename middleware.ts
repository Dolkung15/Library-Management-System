import { NextRequest, NextResponse } from "next/server";
import { authRoutes, protectedRoutes } from "./router/routes";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('currentUser')?.value

  if (
    protectedRoutes.includes(request.nextUrl.pathname) &&
    (!currentUser || Date.now() > JSON.parse(currentUser).expiredAt)
  ) {
    request.cookies.delete('currentUser')
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('currentUser')

    return response
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return NextResponse.redirect(new URL('/profile', request.url))
  }

  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    (!currentUser || JSON.parse(currentUser).role != 'admin')
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}
