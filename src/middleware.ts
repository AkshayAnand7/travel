import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import { NextResponse } from 'next/server'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const path = nextUrl.pathname

  const isProtected = path.startsWith('/travel')
  const isLoginPage = path === '/login'

  // Root redirect
  if (path === '/') {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/travel', nextUrl))
    }
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  // If already logged in and visiting /login -> send to /travel
  if (isLoginPage) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/travel', nextUrl))
    }
    return NextResponse.next()
  }

  // If not logged in and visiting protected /travel route -> send to /login
  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/',
    '/login',
    '/travel',
    '/travel/:path*',
  ],
}
