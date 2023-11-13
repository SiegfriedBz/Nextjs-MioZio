import { prisma } from '@/utils/prismaClient'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  try {
    const page = searchParams.get('page')

    const pageImagesPrisma = await prisma.image.findMany({
      where: { page: page },
    })

    // not serializable prisma dates
    const pageImages = JSON.parse(JSON.stringify(pageImagesPrisma))

    return NextResponse.json({ pageImages }, { status: 200 })
  } catch (error) {
    return NextResponse.json(`Error: ${error}`, { status: 500 })
  }
}
