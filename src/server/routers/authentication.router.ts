import { Trpc } from '@/core/trpc/server'
import { User } from '@prisma/client'
import { TRPCError } from '@trpc/server'

import * as Jwt from 'jsonwebtoken'
import { z } from 'zod'
import { EmailService } from '../libraries/email'

export const AuthenticationRouter = Trpc.createRouter({
  sendResetPasswordEmail: Trpc.procedurePublic
    .input(z.object({ email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = (await ctx.databaseUnprotected.user.findUnique({
        where: { email: input.email },
      })) as User
      if (!user) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })
      }

      const payload = { userId: user.id }

      const secret = process.env.NEXTAUTH_SECRET as string

      const TIME_24_HOURS = 60 * 60 * 24

      const token = Jwt.sign(payload, secret, { expiresIn: TIME_24_HOURS })

      const url = process.env.BASE_URL

      const urlResetPassword = `${url}/reset-password/${token}`

      const type = EmailService.Type.AUTHENTICATION_FORGOT_PASSWORD

      try {
        await EmailService.send({
          type,
          email: user.email,
          name: user.name ?? user.email,
          subject: `Reset your password`,
          variables: {
            url_password_reset: urlResetPassword,
          },
        })

        return { success: true }
      } catch (error) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Could not send the email',
        })
      }
    }),

  resetPassword: Trpc.procedurePublic
    .input(z.object({ token: z.string(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const secret = process.env.NEXTAUTH_SECRET as string

      let decoded: any

      try {
        decoded = Jwt.verify(input.token, secret)
      } catch (error) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid token',
        })
      }

      const user = (await ctx.databaseUnprotected.user.findUnique({
        where: { id: decoded.userId },
      })) as User

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        })
      }

      await ctx.databaseUnprotected.user.update({
        where: { id: user.id },
        data: {
          password: input.password,
        },
      })

      return { success: true }
    }),
})
