import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'travel-portal-secret-key-2026',
  trustHost: true,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.user_id = (user as any).user_id
        token.role = (user as any).role
      }
      return token
    },
    session({ session, token }) {
      if (session.user && token) {
        (session.user as any).id = token.id as string;
        (session.user as any).user_id = token.user_id as string;
        (session.user as any).role = token.role as string;
      }
      return session
    },
  },
  providers: [],
} satisfies NextAuthConfig
