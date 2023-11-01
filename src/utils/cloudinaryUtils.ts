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

export function getImageUrl(imageId: string) {
  try {
    return `${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}${imageId}`
  } catch (error) {
    console.log(error)
    return ''
  }
}
