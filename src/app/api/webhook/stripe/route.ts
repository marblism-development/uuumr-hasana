import { Database } from '@/core/database'
import { PaymentService } from '@/server/libraries/payment'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const handleStripeWebhookSchema = z.object({
  body: z.string(),
  sig: z.string(),
})

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    if (!PaymentService.isActive()) {
      return new NextResponse(`Stripe not activated`, {
        status: 400,
      })
    }

    console.log('Stripe webhook received')

    const sig = headers().get('Stripe-Signature') as string

    // Read the request body as text
    const reqText = await req.text()
    // Convert the text to a buffer
    const reqBuffer = Buffer.from(reqText)

    const data = await PaymentService.onPayment(reqBuffer, sig)

    if (!data) {
      return new NextResponse(`could not parse the webhook`, {
        status: 200,
      })
    }

    const { userId, stripeCustomerId } = data

    if (userId) {
      const user = await Database.getUnprotected().user.findFirst({
        where: { id: userId },
      })

      if (stripeCustomerId) {
        await Database.getUnprotected().user.update({
          where: { id: user.id },
          data: { stripeCustomerId: stripeCustomerId },
        })
        console.log(
          `Stripe customer id "${stripeCustomerId}" saved on user "${user.id}"`,
        )
      }

      return new NextResponse(`Webhook successful`, {
        status: 200,
      })
    }

    if (stripeCustomerId) {
      const user = await Database.getUnprotected().user.findFirst({
        where: { stripeCustomerId },
      })
      console.log(
        `Found user "${user.id}" with stripe customer id "${stripeCustomerId}"`,
      )
      return new NextResponse(`Webhook successful`, {
        status: 200,
      })
    }

    return new NextResponse(`Webhook successful`, {
      status: 200,
    })
  } catch (error: any) {
    console.error('Could not handle Stripe webhook')
    console.error(error)
    return new NextResponse(`Unknown error`, {
      status: 500,
    })
  }
}
