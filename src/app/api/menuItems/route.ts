import { prisma } from '@/utils/prismaClient'
import cloudinary from '@/utils/cloudinary/cloudinaryConfig'
import { join } from 'path'
import { Prisma } from '@prisma/client'

const CLOUDINARY_APP_NAME = process.env.CLOUDINARY_APP_NAME
console.log(CLOUDINARY_APP_NAME)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  try {
    const categorySlug = searchParams.get('categorySlug')
    const isFeatured = searchParams.get('isFeatured') === 'true'

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

export async function POST(request: Request, response: Response) {
  const formData = await request.formData()

  const name = formData.get('name') as unknown as string
  const description = formData.get('description') as unknown as string
  const price = formData.get('price') as unknown as number
  const isFeatured = formData.get('isFeatured') as unknown as boolean

  //    /!!!!!! CHECK TYPE
  const options = formData.get('options') as unknown as Prisma.JsonArray
  //
  const categorySlug = formData.get('categorySlug') as unknown as string
  const imgFile: File = formData.get('imgFile') as unknown as File

  try {
    // 1. upload image to cloudinary
    if (!name || !description || !price || !categorySlug || !imgFile) {
      throw new Error('Missing fields')
    }

    const path = join('/', 'tmp', imgFile.name)

    const cloudinaryResponse = await cloudinary.uploader.upload(path, {
      folder: `${CLOUDINARY_APP_NAME}/menuCategory/${categorySlug}`, // Cloudinary folder
    })

    // Extract public_id from the Cloudinary response
    const { public_id, secure_url } = cloudinaryResponse

    console.log(public_id)

    if (!public_id) {
      throw new Error('Missing cloudinary image public_id')
    }

    console.log(name)
    console.log(description)
    console.log(price)
    console.log(isFeatured)
    console.log(options)
    console.log(JSON.parse(JSON.stringify(options)))
    console.log(categorySlug)

    // 2. add menu item to db
    const newMenuItemPrisma = await prisma.menuItem.create({
      data: {
        name: name,
        description: description,
        price: price,
        img: public_id,
        isFeatured: isFeatured || false,
        categorySlug: categorySlug,
        options: { options },
      },
    })

    // not serializable prisma dates
    const newMenuItem = JSON.parse(JSON.stringify(newMenuItemPrisma))

    console.log(newMenuItem)

    return Response.json({ newMenuItem }, { status: 201 })
  } catch (error) {
    return Response.json(`Error: ${error}`, { status: 500 })
  }
}
