import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from './auth.config'

// Hardcoded user credentials
const USERS = [
  {
    id: '1',
    user_id: 'JAGAN',
    full_name: 'Jagan',
    password: 'jagan@123',
    role: 'admin',
    is_active: true,
  },
]

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'travel-portal-secret-key-2026',
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const user_id = (credentials?.user_id as string)?.toUpperCase()
          const password = credentials?.password as string

          if (!user_id || !password) {
            return null
          }

          const user = USERS.find(u => u.user_id === user_id)

          if (!user || !user.is_active || password !== user.password) {
            return null
          }

          return {
            id: user.id,
            user_id: user.user_id,
            name: user.full_name,
            role: user.role,
          }
        } catch (err) {
          console.error('[AUTH] Error in authorize:', err)
          return null
        }
      },
    }),
  ],
})
