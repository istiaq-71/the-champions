import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const verifyPaymentSchema = z.object({
  paymentId: z.string(),
  transactionId: z.string(),
  status: z.enum(['COMPLETED', 'FAILED']),
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
    const validatedData = verifyPaymentSchema.parse(body)

    // Find payment
    const payment = await prisma.payment.findUnique({
      where: { id: validatedData.paymentId },
      include: {
        enrollment: true,
      },
    })

    if (!payment) {
      return NextResponse.json(
        { message: 'Payment not found' },
        { status: 404 }
      )
    }

    // Verify payment belongs to user or admin
    if (payment.userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Verify transaction ID matches
    // In production, this should verify with payment gateway
    if (payment.transactionId && payment.transactionId !== validatedData.transactionId) {
      return NextResponse.json(
        { message: 'Invalid transaction ID' },
        { status: 400 }
      )
    }

    // Update payment status
    const updatedPayment = await prisma.payment.update({
      where: { id: validatedData.paymentId },
      data: {
        status: validatedData.status,
        transactionId: validatedData.transactionId,
        paidAt: validatedData.status === 'COMPLETED' ? new Date() : null,
      },
    })

    // If payment completed and enrollment exists, activate enrollment
    if (validatedData.status === 'COMPLETED' && payment.enrollmentId) {
      await prisma.enrollment.update({
        where: { id: payment.enrollmentId },
        data: {
          status: 'ACTIVE',
        },
      })
    }

    return NextResponse.json({
      payment: updatedPayment,
      message: validatedData.status === 'COMPLETED' 
        ? 'Payment verified successfully' 
        : 'Payment verification failed',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid input data', errors: error.errors },
        { status: 400 }
      )
    }

    console.error('Payment verification error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

