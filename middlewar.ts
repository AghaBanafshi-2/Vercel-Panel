import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PASSWORD = process.env.PANEL_PASSWORD || 'changeme';

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api/sub')) return NextResponse.next();

  const cookie = req.cookies.get('auth')?.value;
  if (cookie === PASSWORD) return NextResponse.next();

  if (req.nextUrl.pathname === '/login') return NextResponse.next();

  return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};