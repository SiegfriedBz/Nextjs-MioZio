import { menuItemByCategoryData } from '@/data'
import { notFound } from 'next/navigation'
import type { ItemType } from '@/data'
import { FullItemType } from '@/app/page'
import { getBase64ImageUrl, getImageUrl } from '@/utils/cloudinaryUtils'
import Image from 'next/image'
import ItemMiniCart from '@/app/components/menu/category/item/ItemMiniCart'

async function getData({ category, id }: { category: string; id: string }) {
  const itemData = menuItemByCategoryData[category].find(
    (item) => item.id === +id
  )

  if (!itemData) {
    return notFound()
  }

  const itemDataPromise = async (data: ItemType) => {
    const src = getImageUrl(data.src)
    const blurDataUrl = await getBase64ImageUrl(data.src)
    const fullData: FullItemType = {
      ...itemData,
      src,
      blurDataUrl,
    }

    return fullData
  }

  const item = await itemDataPromise(itemData)

  return item
}

type ItemProps = {
  params: {
    category: string
    id: string
  }
}

const Item = async ({ params }: ItemProps) => {
  const { category, id } = params

  const item = await getData({ category, id })

  return (
    <section className='flex flex-col items-center justify-around space-y-1 p-4 sm:space-y-2 sm:px-16 md:flex-row md:space-x-4 md:px-8 lg:px-24 xl:px-32 2xl:px-48'>
      {/* IMAGE CONTAINER */}
      <div className='relative h-full w-full flex-1 pt-1'>
        <Image
          src={item.src}
          alt={item.alt}
          fill={true}
          className='object-contain transition-all duration-300 md:hover:rotate-[8deg] md:hover:scale-105'
        />
      </div>

      {/* TEXT CONTAINER */}
      <div className='flex flex-1 flex-col space-y-1 px-2 text-primary sm:space-y-2 md:space-y-8'>
        <h2 className='text-2xl font-bold uppercase tracking-wide md:text-3xl'>
          {item.title}
        </h2>
        <h3 className='text-sm md:text-base'>{item.desc}</h3>
        <ItemMiniCart item={item} />
      </div>
    </section>
  )
}

export default Item
