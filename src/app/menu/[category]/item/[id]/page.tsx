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
    <section className='flex flex-col items-center justify-center space-y-4'>
      {/* IMAGE CONTAINER */}
      <div className='relative mt-2 h-full w-full flex-1'>
        <Image
          src={item.src}
          alt={item.alt}
          fill={true}
          className='object-contain'
        />
      </div>

      {/* TEXT CONTAINER */}
      <div className='text-primary flex flex-1 flex-col space-y-2 px-2'>
        <h2 className='text-2xl font-bold uppercase tracking-wide'>
          {item.title}
        </h2>
        <h3 className='text-sm'>{item.desc}</h3>
        <h2 className='text-2xl font-bold uppercase tracking-wide'>
          ${item.price}
        </h2>
        <div className='flex items-center justify-between'>
          <ItemMiniCart basePrice={item.price} options={item.options} />
        </div>
      </div>
    </section>
  )
}

export default Item
