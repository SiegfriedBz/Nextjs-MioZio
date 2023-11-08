import { prisma } from '@/utils/prismaClient'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  try {
    const categorySlug = searchParams.get('categorySlug')
    const isFeatured = searchParams.get('isFeatured') === 'true'

    console.log(categorySlug)

    const menuItemsPrisma = await prisma.menuItem.findMany({
      where: {
        ...(searchParams.get('categorySlug') != null
          ? // MenuByCategory page - fetch all items by category slug
            {
              categorySlug: categorySlug as string,
            }
          : // Home page - fetch all featured items
            { isFeatured: isFeatured as boolean }),
      },
    })

    // not serializable prisma dates
    const menuItems = JSON.parse(JSON.stringify(menuItemsPrisma))

    return Response.json({ menuItems }, { status: 200 })
  } catch (error) {
    return Response.json(`Error: ${error}`, { status: 500 })
  }
}
