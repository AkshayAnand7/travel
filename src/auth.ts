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
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const user_id = (credentials?.user_id as string)?.toUpperCase()
          const password = credentials?.password as string

          if (!user_id || !password) {
            console.log('[AUTH] Missing credentials')
            return null
          }

          const user = USERS.find(u => u.user_id === user_id)

          if (!user) {
            console.log('[AUTH] User not found:', user_id)
            return null
          }

          if (!user.is_active) {
            console.log('[AUTH] User disabled:', user_id)
            return null
          }

          if (password !== user.password) {
            console.log('[AUTH] Wrong password for:', user_id)
            return null
          }

          console.log('[AUTH] Login success:', user_id, user.role)
          return {
            id: user.id,
            user_id: user.user_id,
            name: user.full_name,
            role: user.role,
          }
        } catch (err) {
          console.error('[AUTH] Unexpected error:', err)
          return null
        }
      },
    }),
  ],
})
