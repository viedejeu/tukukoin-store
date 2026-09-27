import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJwt } from './lib/auth';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authCookie = request.cookies.get('tukukoin_admin_session');

    if (!authCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const payload = await verifyJwt(authCookie.value);
    
    if (!payload) {
      // Invalid token
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // RBAC: Editors cannot access settings or users
    if (payload.role === 'EDITOR') {
      const isRestricted = request.nextUrl.pathname.startsWith('/admin/settings') || 
                           request.nextUrl.pathname.startsWith('/admin/users');
      if (isRestricted) {
        return NextResponse.redirect(new URL('/admin', request.url)); // Redirect to admin dashboard
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
