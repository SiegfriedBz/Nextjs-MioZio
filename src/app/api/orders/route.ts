import { prisma } from '@/utils/prismaClient'
import { Prisma } from '@prisma/client'

// ADMIN CAN GET ALL ORDERS
// LOGGED IN USER CAN GET THEIR ORDERS
export async function GET(request: Request, response: Response) {
  const { searchParams } = new URL(request.url)
  const userIsAdmin = searchParams.get('userIsAdmin') === 'true'
  const userEmail = searchParams.get('userEmail')

  if (!userEmail) {
    return Response.json({ message: 'unauthorized' }, { status: 401 })
  }

  try {
    const prismaOrders = await prisma.order.findMany({
      where: { ...(userIsAdmin ? {} : { userEmail: userEmail }) },
      orderBy: { updatedAt: 'desc' },
    })

    // not serializable prisma dates
    const orders = JSON.parse(JSON.stringify(prismaOrders))

    return Response.json({ orders }, { status: 200 })
  } catch (error) {
    return Response.json(`Error: ${error}`, { status: 500 })
  }
}

// LOGGED IN USER CAN CREATE A NEW ORDER
export async function POST(request: Request, response: Response) {
  console.log('POST')
  const { searchParams } = new URL(request.url)
  const userEmail = searchParams.get('userEmail')

  if (!userEmail) {
    return Response.json({ message: 'unauthorized' }, { status: 401 })
  }

  const body = await request.json()

  const data = {
    ...body,
    totalPrice: body.totalPrice.toFixed(2),
    cartItems: body.cartItems as Prisma.JsonArray,
  }

  try {
    await prisma.order.create({
      data: data,
    })

    return Response.json({
      message: 'Order submitted successfully!',
      status: 201,
    })
  } catch (error) {
    console.log(error)
    return Response.json(`Error: ${error}`, { status: 500 })
  }
}

// ADMIN CAN UPDATE ORDER STATUS
export async function PATCH(request: Request, response: Response) {
  const { searchParams } = new URL(request.url)
  const isAdmin = searchParams.get('isAdmin') === 'true'

  if (!isAdmin) {
    return Response.json({ message: 'unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { id: orderId, status } = body

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status },
    })

    return Response.json({
      message: 'Order status updated successfully!',
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return Response.json(`Error: ${error}`, { status: 500 })
  }
}

// ADMIN CAN DELETE ORDER
export async function DELETE(request: Request, response: Response) {
  const { searchParams } = new URL(request.url)
  const isAdmin = searchParams.get('isAdmin') === 'true'
  const orderId = searchParams.get('orderId')

  console.log(isAdmin)
  console.log(orderId)

  if (!isAdmin) {
    return Response.json({ message: 'unauthorized' }, { status: 401 })
  }

  if (!orderId) {
    return Response.json({ message: 'order id is required' }, { status: 404 })
  }

  try {
    await prisma.order.delete({
      where: { id: orderId },
    })

    return Response.json({
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return Response.json(`Error: ${error}`, { status: 500 })
  }
}
