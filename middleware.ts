// middleware.ts (in your project root, same level as package.json)
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip API routes, static files, and Next.js internals
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.') ||
    pathname === '/'
  ) {
    return NextResponse.next();
  }

  // Define your actual page routes (not dynamic API routes)
  const pageRoutes = [
    '/login', 
    '/signup', 
    '/project', 
    '/dashboard',
    '/auth',
    '/profile'
  ];
  
  // If it's a known page route, let it through
  if (pageRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check if this matches your dynamic API route pattern: /userId/slug/path
  const dynamicRoutePattern = /^\/([^\/]+)\/([^\/]+)\/(.+)$/;
  const match = pathname.match(dynamicRoutePattern);
  
  if (match) {
    const [, userId] = match;
    
    // Block obviously invalid userIds
    const invalidPrefixes = ['project', 'api', 'admin', 'user', 'auth', 'login', 'signup', 'dashboard'];
    if (invalidPrefixes.includes(userId.toLowerCase())) {
      return NextResponse.redirect(new URL('/404', request.url));
    }
    
    // Validate userId format (adjust based on your actual userId format)
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(userId);
    const isValidUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/i.test(userId);
    const isValidAlphanumeric = userId.length >= 6 && /^[a-zA-Z0-9_-]+$/.test(userId);
    
    if (!isValidObjectId && !isValidUUID && !isValidAlphanumeric) {
      return NextResponse.redirect(new URL('/404', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};