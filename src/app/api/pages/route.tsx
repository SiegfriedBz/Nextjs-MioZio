import { prisma } from '../../../utils/prismaClient'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const page = searchParams.get('page')

  try {
    const pageImagesPrisma = await prisma.image.findMany({
      where: { page: page },
    })

    const pageImages = JSON.parse(JSON.stringify(pageImagesPrisma))

    return Response.json({ pageImages }, { status: 200 })
  } catch (error) {
    return Response.json(`Error: ${error}`, { status: 500 })
  }
}
