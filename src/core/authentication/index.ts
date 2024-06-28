import { PrismaAdapter } from '@auth/prisma-adapter'
import type { PrismaClient } from '@prisma/client'
import * as Bcrypt from 'bcryptjs'
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from 'next-auth'
import { type Adapter } from 'next-auth/adapters'
import type { Provider } from 'next-auth/providers'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { Database } from '../database'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

const providers: Provider[] = [
  CredentialsProvider({
    credentials: {
      email: { type: 'email' },
      password: { type: 'password' },
    },
    authorize: authorize(Database.getUnprotected()),
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    authorization: {
      params: {
        prompt: 'consent',
        access_type: 'offline',
        response_type: 'code',
      },
    },
  }),
  /**
   * ...add more providers here.
   *
   * Most other providers require a bit more work than the Discord provider. For example, the
   * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
   * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
   *
   * @see https://next-auth.js.org/providers/github
   */
]

const providerMap = providers.map(provider => {
  const isActive =
    provider?.options?.clientId || provider?.options?.clientSecret

  return { id: provider?.id, name: provider?.name, active: isActive }
})

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
const options: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session({ session, token }) {
      if (session.user) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        session.user.id = token.sub!
      }
      return session
    },
  },
  adapter: PrismaAdapter(Database.getUnprotected()) as Adapter,
  providers: providers,
  pages: {
    signIn: '/login',
    signOut: '/profile',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/home', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
}

function authorize(prisma: PrismaClient) {
  return async (
    credentials: Record<'email' | 'password', string> | undefined,
  ) => {
    if (!credentials) {
      throw new Error('Missing credentials')
    }

    if (!credentials.email) {
      throw new Error('"email" is required in credentials')
    }

    if (!credentials.password) {
      throw new Error('"password" is required in credentials')
    }

    const user = await prisma.user.findFirst({
      where: { email: credentials.email },
      select: { id: true, email: true, password: true },
    })

    if (!user?.password) {
      return null
    }

    // verify the input password with stored hash
    const isValid = await Bcrypt.compare(credentials.password, user.password)

    if (!isValid) {
      return null
    }

    return { id: user.id, email: user.email }
  }
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
const getServerAuthSession = () => getServerSession(options)

export const Authentication = {
  providers: providerMap,
  getSession: getServerAuthSession,
  options,
}
