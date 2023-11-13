import { prisma } from '@/utils/prismaClient'
import { NextResponse } from 'next/server'

// admin route - update order status
export async function PATCH(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const body = await request.json()
  const { status } = body

  try {
    await prisma.order.update({
      where: { id: id },
      data: { status },
    })

    return NextResponse.json({
      message: 'Order status updated successfully!',
      status: 200,
    })
  } catch (error) {
    return NextResponse.json(`Error: ${error}`, { status: 500 })
  }
}

// admin route
export async function DELETE(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    await prisma.order.delete({
      where: { id: id },
    })

    return NextResponse.json({
      message: 'Order deleted successfully!',
      status: 200,
    })
  } catch (error) {
    return NextResponse.json(`Error: ${error}`, { status: 500 })
  }
}
