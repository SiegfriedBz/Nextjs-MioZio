import { NextResponse } from 'next/server'
import { prisma } from '../../../utils/prismaClient'

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url)

  const menuItemId = searchParams.get('id')
  const categorySlug = searchParams.get('categorySlug')
  const isFeatured = searchParams.get('isFeatured') === 'true'
  console.log(menuItemId)

  const query =
    menuItemId !== null
      ? {
          id: menuItemId as string,
        }
      : searchParams.get('categorySlug') !== null
      ? {
          categorySlug: categorySlug as string,
          isFeatured: isFeatured as boolean,
        }
      : {
          isFeatured: isFeatured as boolean,
        }

  try {
    const menuItems = await prisma.menuItem.findMany({
      where: query,
    })

    return new NextResponse(JSON.stringify({ menuItems }), { status: 200 })
  } catch (error) {
    return NextResponse.json(`Error: ${error}`, { status: 500 })
  }
}
