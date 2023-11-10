import cloudinary from '@/utils/cloudinary/cloudinaryConfig'
import { join } from 'path'

const CLOUDINARY_APP_NAME = process.env.CLOUDINARY_APP_NAME
console.log(CLOUDINARY_APP_NAME)

export async function POST(request: Request, response: Response) {
  try {
    const formData = await request.formData()

    const menuItemCategory = formData.get(
      'menuItemCategory'
    ) as unknown as string
    const menuItemImageFile: File = formData.get(
      'menuItemImage'
    ) as unknown as File

    if (!menuItemImageFile || !menuItemCategory) {
      throw new Error('No image file / image category provided')
    }

    const path = join('/', 'tmp', menuItemImageFile.name)
    console.log(menuItemCategory)
    console.log(path)

    const cloudinaryResponse = await cloudinary.uploader.upload(path, {
      folder: `${CLOUDINARY_APP_NAME}/menuCategory/${menuItemCategory}`, // Cloudinary folder
    })

    // Extract relevant information from the Cloudinary response
    const { public_id, secure_url } = cloudinaryResponse
    console.log(public_id)
    console.log(secure_url)
    return Response.json({ public_id, secure_url }, { status: 200 })
  } catch (error) {
    return Response.json(`Error: ${error}`, { status: 500 })
  }
}
