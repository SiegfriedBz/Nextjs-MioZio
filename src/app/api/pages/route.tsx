import { NextResponse } from 'next/server'
import { prisma } from '../../../utils/prismaClient'

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url)

  const page = searchParams.get('page')

  try {
    const pageImages = await prisma.image.findMany({
      where: { page: page },
    })
    return new NextResponse(JSON.stringify({ pageImages }), { status: 200 })
  } catch (error) {
    return NextResponse.json(`Error: ${error}`, { status: 500 })
  }
}
