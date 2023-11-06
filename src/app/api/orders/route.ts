import { prisma } from '@/utils/prismaClient'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  try {
    const prismaOrders = await prisma.order.findMany()

    // not serializable prisma dates
    const orders = JSON.parse(JSON.stringify(prismaOrders))

    return Response.json({ orders }, { status: 200 })
  } catch (error) {
    return Response.json(`Error: ${error}`, { status: 500 })
  }
}
