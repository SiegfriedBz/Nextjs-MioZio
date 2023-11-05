import { prisma } from '../../../utils/prismaClient'

export async function GET() {
  try {
    const menuCategoriesPrisma = await prisma.menuCategory.findMany({
      include: {
        menuItems: true,
      },
    })

    const menuCategories = JSON.parse(JSON.stringify(menuCategoriesPrisma))

    return Response.json({ menuCategories }, { status: 200 })
  } catch (error) {
    return Response.json(`Error: ${error}`, { status: 500 })
  }
}

// export function POST(request) {
//   return new NextResponse('', { status: 201 })
// }
