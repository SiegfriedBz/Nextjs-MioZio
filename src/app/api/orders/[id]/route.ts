import { prisma } from '@/utils/prismaClient'

// admin route - update order status
export async function PATCH(
  request: Request,
  { params: { id } }: { params: { id: string } },
  response: Response
) {
  const body = await request.json()
  const { status } = body

  try {
    await prisma.order.update({
      where: { id: id },
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

// admin route
export async function DELETE(
  request: Request,
  { params: { id } }: { params: { id: string } },
  response: Response
) {
  try {
    await prisma.order.delete({
      where: { id: id },
    })

    return Response.json({
      message: 'Order deleted successfully!',
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return Response.json(`Error: ${error}`, { status: 500 })
  }
}
