import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import { NextResponse } from 'next/server'

const { auth } = NextAuth(authConfig)

// All protected route prefixes
const PROTECTED_PREFIXES = ['/travel']

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const path = nextUrl.pathname

  const isOnLogin = path === '/login'

  // --- LOGIN PAGE LOGIC ---
  if (isOnLogin) {
    if (isLoggedIn) {
      const callbackUrl = nextUrl.searchParams.get('callbackUrl')
      if (callbackUrl && callbackUrl.startsWith('/travel')) {
        return NextResponse.redirect(new URL(callbackUrl, nextUrl))
      }
      return NextResponse.redirect(new URL('/travel', nextUrl))
    }
    return NextResponse.next()
  }

  // --- PROTECTED ROUTES LOGIC ---
  const isProtectedRoute = PROTECTED_PREFIXES.some(prefix => path.startsWith(prefix))

  if (isProtectedRoute) {
    if (!isLoggedIn) {
      const loginUrl = new URL('/login', nextUrl)
      loginUrl.searchParams.set('callbackUrl', path)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/travel/:path*',
    '/login',
  ],
}
