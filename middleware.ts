import { NextRequest, NextResponse } from 'next/server'

// A temporary 307 keeps old 2026 ticket/date pages out of view
// without permanently changing their URLs for the next season.
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = '/'
  url.search = ''
  return NextResponse.redirect(url, 307)
}

export const config = {
  matcher: ['/((?!api|_next|images|videos|favicon.ico|robots.txt|sitemap.xml|llms.txt).*)'],
}
