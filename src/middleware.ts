import createMiddleware from "next-intl/middleware"
import { type NextRequest, NextResponse } from "next/server"
import { routing } from "./i18n/routing"
import { RETIRED_BLOG_REDIRECTS } from "./lib/retiredBlogRedirects"

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const destination = RETIRED_BLOG_REDIRECTS[request.nextUrl.pathname]

  if (destination) {
    const target = new URL(destination)
    target.search = request.nextUrl.search
    return NextResponse.redirect(target, 301)
  }

  return intlMiddleware(request)
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  // - … the ones starting with `/tui` (admin interface)
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    // - … the ones starting with `/tui` (admin interface)
    "/((?!api|trpc|_next|studio|_vercel|.*\\..*).*)",
    // Also match pathnames that start with a locale
    "/(en|es)/:path*",
  ],
}
