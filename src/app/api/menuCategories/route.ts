import { prisma } from '@/utils/prismaClient'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const menuCategoriesPrisma = await prisma.menuCategory.findMany()

    // not serializable prisma dates
    const menuCategories = JSON.parse(JSON.stringify(menuCategoriesPrisma))

    return NextResponse.json({ menuCategories }, { status: 200 })
  } catch (error) {
    return NextResponse.json(`Error: ${error}`, { status: 500 })
  }
}
