import { prisma } from '@/utils/prismaClient'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const menuItemPrisma = await prisma.menuItem.findUnique({
      where: {
        id: id,
      },
    })

    // not serializable prisma dates
    const menuItem = JSON.parse(JSON.stringify(menuItemPrisma))

    return Response.json({ menuItem }, { status: 200 })
  } catch (error) {
    return Response.json(`Error: ${error}`, { status: 500 })
  }
}
