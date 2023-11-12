// SEED CLOUDINARY WITH IMAGES
import cloudinary from '@/utils/cloudinary/cloudinaryConfig'
import 'dotenv/config'
import fs from 'fs'
import path from 'path'

type ImagePathType = {
  filePath: string
  public_id: string
}

const CLOUDINARY_APP_NAME = process.env.CLOUDINARY_APP_NAME
const FOLDER_PATH = './seed/data/images'

// Log cloudinary configuration
console.log('cloudinary.config: ', cloudinary.config())
console.log('===')

// Log error message
function logErrorAndExit(message: string) {
  console.error(`Error: ${message}`)
  // process.exit(errorCode)
}

// Function to remove file extension
function removeFileExtension(filename: string) {
  return filename.replace(/\.[^.]+$/, '')
}

// get images from FOLDER_PATH
function getImagesInDirectory(directory: string) {
  const isImageFile = (filePath: string) => {
    const extname = path.extname(filePath).toLowerCase()
    return ['.jpg', '.jpeg', '.png'].includes(extname)
  }

  const imagePaths: ImagePathType[] = []

  function traverseDirectory(currentDirectory: string, relativePath: string) {
    fs.readdirSync(currentDirectory).forEach((file) => {
      const filePath = path.join(currentDirectory, file)
      const fileRelativePath = path.join(relativePath, file)
      if (fs.statSync(filePath).isDirectory()) {
        traverseDirectory(filePath, fileRelativePath)
      } else if (isImageFile(filePath)) {
        // Remove the file extension from the file name
        const fileNameWithoutExtension = removeFileExtension(file)
        const subfolder = path.relative(FOLDER_PATH, path.dirname(filePath))

        let public_id
        if (subfolder) {
          public_id = `${CLOUDINARY_APP_NAME}/${subfolder}/${fileNameWithoutExtension}`
        } else {
          public_id = `${CLOUDINARY_APP_NAME}/${fileNameWithoutExtension}`
        }
        imagePaths.push({
          filePath,
          public_id,
        })
      }
    })
  }

  traverseDirectory(directory, '')
  return imagePaths
}

console.log('Retrieving images...')
const imagePaths = getImagesInDirectory(FOLDER_PATH)
console.log(`✅ ${imagePaths?.length} images retrieved successfully`)
console.log('===')
console.log('Uploading images...')

// Uploads an image file
const uploadImage = async (imageInfo: ImagePathType) => {
  const { filePath, public_id } = imageInfo
  const options = {
    unique_filename: false,
    overwrite: true, // Allow overwriting the asset with new versions
    public_id,
  }

  try {
    // Upload the image
    await cloudinary.uploader.upload(filePath, options)
    return public_id
  } catch (error) {
    console.log('===')
    logErrorAndExit(`⛔️ Error uploading image: ${public_id}`)
    console.log('===')
  }
}

// Main function --- Uploads all image files
const seedCloudinary = async () => {
  const results = await Promise.all(
    imagePaths.map(async (imageInfo) => {
      try {
        const publicId = await uploadImage(imageInfo)
        console.log(`✅ Image uploaded successfully: ${publicId}`)
        return publicId
      } catch (error) {
        return null // Return null to indicate an error for this image
      }
    })
  )

  const successfulUploads = results.filter((result) => result !== null)
  console.log('===')
  console.log(`✅ ${successfulUploads.length} images uploaded successfully`)
  console.log('===')
  console.log(successfulUploads)
}

seedCloudinary()
