import { prisma } from '@/utils/prismaClient'
import { NextResponse } from 'next/server'

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

    return NextResponse.json({ menuItem }, { status: 200 })
  } catch (error) {
    return NextResponse.json(`Error: ${error}`, { status: 500 })
  }
}

// admin route
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  try {
    await prisma.menuItem.delete({
      where: {
        id: id,
      },
    })

    return NextResponse.json(
      { message: 'Menu item deleted successfully.' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(`Error: ${error}`, { status: 500 })
  }
}
