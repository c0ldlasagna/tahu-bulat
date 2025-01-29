import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { nextUrl, headers, cookies } = request;
  const referer = headers.get('referer');

  // Allow direct access to "/"
  if (nextUrl.pathname === '/') {
    return NextResponse.next();
  }

  // Exclude static assets, Next.js internals, and API routes
  const staticFileRegex = /\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|woff2?|ttf|otf|eot|txt|xml|json)$/;
  if (
    staticFileRegex.test(nextUrl.pathname) || 
    nextUrl.pathname.startsWith('/_next') || 
    nextUrl.pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  // Check if user has already visited `/` by using a cookie
  const hasVisitedHome = cookies.get('visited_home');

  // If the user is not coming from `/` and has not visited `/` before, redirect them
  if (!hasVisitedHome && (!referer || new URL(referer).origin !== new URL(request.url).origin)) {
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.set('visited_home', 'true', { path: '/' }); // Set cookie to allow navigation
    return response;
  }

  return NextResponse.next();
}

// Apply middleware to all routes except static files, API routes, and Next.js internals
export const config = {
  matcher: '/:path*',
};
