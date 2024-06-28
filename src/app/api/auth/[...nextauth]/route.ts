import { Authentication } from '@/core/authentication'
import NextAuth from 'next-auth'

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(Authentication.options)
export { handler as GET, handler as POST }
