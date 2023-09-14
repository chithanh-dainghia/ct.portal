import { db } from '@/lib/db'
import { PrismaAdapter } from '@auth/prisma-adapter'

import NextAuth from 'next-auth'
import { HttpEmailProvider } from './http-email-provider'

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's id. */
      id: string
      /** The user's email */
      email: string
      /** The user's name */
      name: string | null
      /** The user's picture */
      picture: string | null
    }
  }
}

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(db),
  secret: process.env.SECRET,
  providers: [HttpEmailProvider],
  callbacks: {
    async jwt({ token, user }) {
      // if (user) {
      //   return {
      //     ...user,
      //   }
      // }

      if (user) {
        token.id = user.id
        token.email = user.email
      }

      return token
    },

    // async session({ session, token }) {
    //   // @ts-ignore
    //   session.user = token

    //   return session
    // },
  },
  debug: process.env.NODE_ENV === 'development',
})

/**
 * Temporary function to get the current user. We use this instead of calling
 * auth() directly because the next-auth types state `auth()` always returns a
 * session, but in reality it can return null.
 */
export async function getCurrentUser() {
  const session = await auth()

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!session?.user) {
    return null
  }

  return session.user
}
