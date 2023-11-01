import { ItemType, menuItemByCategoryData } from '@/data'
import { getBase64ImageUrl, getImageUrl } from '@/utils/cloudinaryUtils'
import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

export type FullItemType = ItemType & {
  blurDataUrl: string
}

async function getData(category: string) {
  const itemsData = menuItemByCategoryData[category]

  const itemsDataPromises = itemsData.map(async (data) => {
    const src = getImageUrl(data.src)
    const blurDataUrl = await getBase64ImageUrl(data.src)
    const fullData: FullItemType = {
      ...data,
      src,
      blurDataUrl,
    }

    return fullData
  })

  const items = await Promise.all(itemsDataPromises)

  return items
}

type MenuByCategoryProps = {
  params: {
    category: string
  }
}

const MenuByCategory = async ({ params }: MenuByCategoryProps) => {
  const { category } = params

  const menuItems = await getData(category)

  return (
    // ITEMS WRAPPER
    <div className='flex flex-wrap items-center justify-center rounded-sm md:py-24'>
      {menuItems.map((item) => {
        // ITEM CONTAINER
        return (
          <Link
            key={item.id}
            href={`/item/${item.id}`}
            className='border-primary even:bg-quaternary group flex h-[60vh] w-full flex-col justify-between border-[0.01em] hover:shadow-sm sm:w-1/2 lg:w-[30%]'
          >
            {/* ITEM IMAGE CONTAINER */}
            <div className='relative mt-2 flex flex-1 place-content-center 2xl:mt-8'>
              <Image
                src={item.src}
                alt={item.alt}
                fill={true}
                className='rounded-full object-contain transition duration-300 ease-in-out group-hover:rotate-[8deg] 2xl:group-hover:scale-105'
              />
            </div>

            {/* ITEM TEXT CONTAINER */}
            <div className='relative flex flex-col items-center space-y-2 p-4 2xl:flex-row 2xl:justify-between 2xl:space-y-0 2xl:p-4'>
              <h2 className='text-primary text-xl font-bold uppercase tracking-wide'>
                {item.title}
              </h2>
              {/* PRICE - CTA */}
              <h2 className='text-primary text-xl font-semibold 2xl:font-bold'>
                ${item.price}
              </h2>
              <button
                className={twMerge(
                  'btn',
                  `absolute bottom-3 left-1/2 hidden -translate-x-1/2 px-4 py-2 text-sm transition duration-300 ease-in-out hover:scale-110 group-hover:z-50 group-hover:block xl:text-base 2xl:left-auto 2xl:right-4 2xl:translate-x-0 2xl:font-bold`
                )}
              >
                Add to cart
              </button>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default MenuByCategory
