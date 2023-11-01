import Slider from './components/home/Slider'
import Featured from './components/home/Featured'
import Offer from './components/home/Offer'
import { getBase64ImageUrl, getImageUrl } from '@/utils/cloudinaryUtils'
import type { ItemType, SliderImageType, OfferImageType } from '@/data'
import { sliderImagesData, featuredItemsData, offerImageData } from '@/data'

export type FullImageType = SliderImageType & {
  blurDataUrl: string
}
export type FullFeaturedItemType = ItemType & {
  blurDataUrl: string
}
export type FullOfferImageType = OfferImageType & {
  blurDataUrl: string
}

async function getData() {
  const sliderImgPromises = sliderImagesData.map(async (image) => {
    const src = getImageUrl(image.src)
    const blurDataUrl = await getBase64ImageUrl(image.src)
    const fullImage: FullImageType = {
      ...image,
      src,
      blurDataUrl,
    }

    return fullImage
  })

  const featuredItemsPromises = featuredItemsData.map(async (item) => {
    const src = getImageUrl(item.src)
    const blurDataUrl = await getBase64ImageUrl(item.src)
    const fullFeaturedItem: FullFeaturedItemType = {
      ...item,
      src,
      blurDataUrl,
    }

    return fullFeaturedItem
  })

  const offerImgPromise = async () => {
    const src = getImageUrl(offerImageData.src)
    const blurDataUrl = await getBase64ImageUrl(offerImageData.src)
    const fullImage: FullOfferImageType = {
      ...offerImageData,
      src,
      blurDataUrl,
    }

    return fullImage
  }

  const sliderImages = await Promise.all(sliderImgPromises)
  const featuredItems = await Promise.all(featuredItemsPromises)
  const offerImage = await offerImgPromise()
  return { sliderImages, featuredItems, offerImage }
}

export default async function Home() {
  const { sliderImages, featuredItems, offerImage } = await getData()

  return (
    <>
      <Slider images={sliderImages} />
      <Featured featuredItems={featuredItems} />
      <Offer image={offerImage} />
    </>
  )
}
