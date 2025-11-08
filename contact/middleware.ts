import { NextRequest, NextResponse } from 'next/server';
import { getUserFromCookie } from './lib/auth';

export async function middleware(request: NextRequest) {
  const user =await getUserFromCookie();
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/dashboard') && !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if ((pathname === '/login' || pathname === '/register') && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
