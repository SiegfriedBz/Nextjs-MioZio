import cloudinary from '@/utils/cloudinary/cloudinaryConfig'
import { NextResponse } from 'next/server'
import { join } from 'path'

const CLOUDINARY_APP_NAME = process.env.CLOUDINARY_APP_NAME

/** POST /api/cloudinary
 * - admin upload image to Cloudinary folder MioZio/menuCategory/{categorySlug}
 * - return public_id
 * - public_id is used to retrieve image from Cloudinary
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const itemCategorySlug = formData.get('categorySlug') as unknown as string
    const itemImageFile: File = formData.get('imageFile') as unknown as File

    if (!itemImageFile || !itemCategorySlug) {
      throw new Error('No image file / image category provided')
    }

    const path = join('/', 'tmp', itemImageFile.name)

    const response = await cloudinary.uploader.upload(path, {
      folder: `${CLOUDINARY_APP_NAME}/menuCategory/${itemCategorySlug}`, // Cloudinary folder
      resource_type: 'image',
    })

    // Extract relevant information from the Cloudinary response
    const { public_id, secure_url } = response

    return NextResponse.json({ public_id }, { status: 200 })
  } catch (error) {
    return NextResponse.json(`Error: ${error}`, { status: 500 })
  }
}
