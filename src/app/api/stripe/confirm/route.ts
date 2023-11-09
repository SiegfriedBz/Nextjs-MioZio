import { prisma } from '@/utils/prismaClient'

// Update order status to PAID & add intent_id
export async function PATCH(request: Request, response: Response) {
  const body = await request.json()
  const { orderId, paymentIntentId } = body

  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        intent_id: paymentIntentId,
        status: 'PAID',
      },
    })

    if (!updatedOrder) throw new Error('Order not found, please try again')

    return Response.json(
      { updatedOrder, message: 'Your payment was processed successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return Response.json({ message: `Error: ${error}` }, { status: 500 })
  }
}
