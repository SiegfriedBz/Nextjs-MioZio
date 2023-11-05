import { NextResponse } from 'next/server'
import { prisma } from '../../../utils/prismaClient'

// import type { NextRequest } from 'next/server.js'

export const GET = async () => {
  try {
    const menuCategories = await prisma.menuCategory.findMany({
      include: {
        menuItems: true,
      },
    })

    return NextResponse.json({ menuCategories }, { status: 200 })
  } catch (error) {
    return NextResponse.json(`Error: ${error}`, { status: 500 })
  }
}

// export function POST(request) {
//   return new NextResponse('', { status: 201 })
// }
