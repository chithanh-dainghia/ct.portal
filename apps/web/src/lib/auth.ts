import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { prisma } from '@/lib/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'

export const authOptions = NextAuth({
  // pages: {
  //   signIn: '/signin',
  // },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        password: { label: 'Password', type: 'password' },
        email: { label: 'Email', type: 'email' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) {
          return null
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password,
        )

        if (!passwordMatch) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          randomKey: 'Hey cool',
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user, session, trigger }) => {
      console.log('jst callback', { token, user, session })

      if (trigger === 'update' && session?.name) {
        // eslint-disable-next-line no-param-reassign
        token.name = session.name
      }

      if (user) {
        const u = user as unknown as any
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        }
      }
      return token
    },

    session({ session, token, user }) {
      console.log('session callback', { session, token, user })

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      }
    },
  },
})
