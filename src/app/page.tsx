import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import Slider from './components/home/Slider'
import Featured from './components/home/Featured'
import Offer from './components/home/Offer'
import { authOptions } from '@/utils/authOptions'
import { getBase64ImageUrl, getImageUrl } from '@/utils/getImageUrls'
import { handleCache } from '@/utils/handleCache'
import type { MenuItemType, PageImageType } from '@/types'

async function getData() {
  try {
    // FETCH SLIDER & SPECIAL OFFER IMAGES
    const pageImagesResponse = await fetch(
      `${process.env.NEXTAUTH_URL}/api/pages?page=home`,
      {
        headers: {
          method: 'GET',
          'Content-Type': 'application/json',
          cache: handleCache,
        },
      }
    )
    if (!pageImagesResponse.ok)
      throw new Error('Fetch pageImages: Network response was not ok.')

    const { pageImages } = await pageImagesResponse.json()

    const pageImagesPromises = pageImages.map(async (data: PageImageType) => {
      const img = getImageUrl(data.img!)
      const imgBlur = await getBase64ImageUrl(data.img!)
      const fullData: PageImageType = {
        ...data,
        img,
        imgBlur,
      }

      return fullData
    })

    const pageImagesData: PageImageType[] =
      await Promise.all(pageImagesPromises)

    const sliderImagesData: PageImageType[] = pageImagesData.filter(
      (img) => img?.kw == 'slider'
    )
    const [specialOfferImageData]: PageImageType[] = pageImagesData.filter(
      (img) => img?.kw == 'specialoffer'
    )
    // FETCH FEATURED ITEMS
    const featuredItemsResponse = await fetch(
      `${process.env.NEXTAUTH_URL}/api/menuItems?isFeatured=true`,
      {
        headers: {
          method: 'GET',
          'Content-Type': 'application/json',
          cache: 'no-store',
        },
      }
    )
    if (!featuredItemsResponse.ok)
      throw new Error('Fetch featuredItems: Network response was not ok.')

    const { menuItems: featuredItems } = await featuredItemsResponse.json()

    const featuredItemsPromises = featuredItems.map(
      async (data: MenuItemType) => {
        const img = getImageUrl(data.img!)
        const imgBlur = await getBase64ImageUrl(data.img!)
        const fullData: MenuItemType = {
          ...data,
          img,
          imgBlur,
        }

        return fullData
      }
    )

    const featuredItemsData: MenuItemType[] = await Promise.all(
      featuredItemsPromises
    )

    return { sliderImagesData, specialOfferImageData, featuredItemsData }
  } catch (error) {
    console.log(`Error: ${error}`)
    return notFound()
  }
}

export default async function Home() {
  // Get user session from server
  // and pass it to the SessionProvider (=> user session available in "use client" components from useSession hook)
  await getServerSession(authOptions)

  const { sliderImagesData, specialOfferImageData, featuredItemsData } =
    await getData()

  return (
    <>
      <Slider images={sliderImagesData} />
      <Featured featuredItems={featuredItemsData} />
      <Offer image={specialOfferImageData} />
    </>
  )
}
