import { NextRequest, NextResponse } from 'next/server'

// Payment creation should run on the server (uses session/headers)
export const dynamic = 'force-dynamic'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createPaymentSchema = z.object({
  enrollmentId: z.string().optional(),
  courseId: z.string(),
  amount: z.number().positive(),
  method: z.enum(['BKASH', 'ROCKET', 'CARD', 'CASH']),
  transactionId: z.string().optional(),
  bKashTrxId: z.string().optional(),
  rocketTrxId: z.string().optional(),
  cardLast4: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const validatedData = createPaymentSchema.parse(body)

    // Verify course exists and get price
    const course = await prisma.course.findUnique({
      where: { id: validatedData.courseId },
    })

    if (!course) {
      return NextResponse.json(
        { message: 'Course not found' },
        { status: 404 }
      )
    }

    // Verify amount matches course price
    if (Number(course.price) !== validatedData.amount) {
      return NextResponse.json(
        { message: 'Payment amount does not match course price' },
        { status: 400 }
      )
    }

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        userId: session.user.id,
        enrollmentId: validatedData.enrollmentId,
        amount: validatedData.amount,
        method: validatedData.method,
        status: 'PENDING',
        transactionId: validatedData.transactionId,
        bKashTrxId: validatedData.bKashTrxId,
        rocketTrxId: validatedData.rocketTrxId,
        cardLast4: validatedData.cardLast4,
      },
    })

    // For payment gateway integration, you would redirect to payment gateway here
    // For now, we'll return the payment ID for client-side handling

    return NextResponse.json({
      paymentId: payment.id,
      amount: payment.amount,
      method: payment.method,
      status: payment.status,
      message: 'Payment initiated. Complete the transaction through your payment method.',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid input data', errors: error.errors },
        { status: 400 }
      )
    }

    console.error('Payment creation error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

