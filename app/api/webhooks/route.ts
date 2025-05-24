import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
import User from '@/app/Models/UserSchema'
import connectToDB from '@/app/lib/connectToDB'

export async function POST(req: NextRequest) {
  try {
    const signingSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET
    if (!signingSecret) {
      return new Response('Missing Clerk webhook signing secret', { status: 500 })
    }

    const evt = await verifyWebhook(req, { signingSecret })
    if (evt.type === 'user.created') {
      const { id, email_addresses } = evt.data
      const email = email_addresses?.[0]?.email_address
      if (!email) {
        return new Response('No email found in payload', { status: 400 })
      }
      await connectToDB()
      await User.updateOne(
        { clerkUserId: id },
        { $set: { clerkUserId: id, EmailAddress: email } },
        { upsert: true }
      )
    }
    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Webhook error:', err)
    return new Response('Webhook error', { status: 400 })
  }
}
