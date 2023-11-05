import { SocialImageType } from '@/types'

export function getImageUrl(imageId: string) {
  try {
    return `${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}${imageId}`
  } catch (error) {
    console.log(error)
    return ''
  }
}

export async function getBase64ImageUrl(imageId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}w_100/e_blur:300,q_auto,f_webp/${imageId}`
    )
    const buffer = await response.arrayBuffer()
    const data = Buffer.from(buffer).toString('base64')
    return `data:image/webp;base64,${data}`
  } catch (error) {
    console.log(error)
    return ''
  }
}

export function getSocialImage({
  title,
  cloudName,
  imagePublicID,
  cloudinaryUrlBase = 'https://res.cloudinary.com',
  version = null,
  titleFont = 'roboto',
  titleExtraConfig = '_bold',
  imageWidth = 1200,
  imageHeight = 630,
  textAreaWidth = 630,
  textAreaHeight = 450,
  textLeftOffset = 750,
  textBottomOffset = 275,
  textColor = 'FFFFFF',
  titleFontSize = 60,
}: SocialImageType) {
  // configure social media image dimensions, quality, and format
  const imageConfig = [
    `w_${imageWidth}`,
    `h_${imageHeight}`,
    'c_fill',
    'f_auto',
  ].join(',')

  // configure the title text
  const titleConfig = [
    `w_${textAreaWidth}`,
    `h_${textAreaHeight}`,
    'c_fit',
    `co_rgb:${textColor}`,
    'g_west',
    `x_${textLeftOffset}`,
    `y_${textBottomOffset}`,
    `l_text:${titleFont}_${titleFontSize}${titleExtraConfig}:${encodeURIComponent(
      title
    )}`,
  ].join(',')

  // combine all the pieces required to generate a Cloudinary URL
  const urlParts = [
    cloudinaryUrlBase,
    cloudName,
    'image',
    'upload',
    imageConfig,
    titleConfig,
    version,
    imagePublicID,
  ]

  // remove any falsy sections of the URL (e.g. an undefined version)
  const validParts = urlParts.filter(Boolean)

  // join all the parts into a valid URL to the generated image
  return validParts.join('/')
}
