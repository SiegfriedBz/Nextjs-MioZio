import { prisma } from '@/utils/prismaClient'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  try {
    const menuItemId = searchParams.get('id')
    const categorySlug = searchParams.get('categorySlug')
    const isFeatured = searchParams.get('isFeatured') === 'true'

    const menuItemsPrisma = await prisma.menuItem.findMany({
      where: {
        ...(menuItemId != null
          ? {
              id: menuItemId as string,
            }
          : searchParams.get('categorySlug') != null
          ? {
              categorySlug: categorySlug as string,
              isFeatured: isFeatured as boolean,
            }
          : { isFeatured: isFeatured as boolean }),
      },
    })

    // not serializable prisma dates
    const menuItems = JSON.parse(JSON.stringify(menuItemsPrisma))

    return Response.json({ menuItems }, { status: 200 })
  } catch (error) {
    return Response.json(`Error: ${error}`, { status: 500 })
  }
}