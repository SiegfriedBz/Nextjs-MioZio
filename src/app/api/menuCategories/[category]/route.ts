import { MenuCategorySlugEnum } from '@/types'
import { prisma } from '@/utils/prismaClient'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { category: MenuCategorySlugEnum } }
) {
  const { category } = params

  try {
    const menuCategoryWithItemsPrisma = await prisma.menuCategory.findMany({
      where: { slug: category as unknown as keyof typeof MenuCategorySlugEnum },
      include: {
        menuItems: true,
      },
    })

    const menuCategoryItemsPrisma = menuCategoryWithItemsPrisma?.[0].menuItems

    // not serializable prisma dates
    const menuCategoryItems = JSON.parse(
      JSON.stringify(menuCategoryItemsPrisma)
    )

    return NextResponse.json({ menuCategoryItems }, { status: 200 })
  } catch (error) {
    return NextResponse.json(`Error: ${error}`, { status: 500 })
  }
}
