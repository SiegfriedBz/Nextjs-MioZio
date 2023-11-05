import { getBase64ImageUrl, getImageUrl } from '@/utils/getImageUrls'
import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import type { MenuItemType } from '@/utils/types'
import { notFound } from 'next/navigation'

const handleCache =
  process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store'

async function getData(category: string) {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/menuItems?categorySlug=${category}`,
      {
        headers: {
          method: 'GET',
          'Content-Type': 'application/json',
          cache: 'no-store',
        },
      }
    )
    if (!response.ok) throw new Error('Network response was not ok.')

    const { menuItems } = await response.json()

    const promises = menuItems.map(async (data: MenuItemType) => {
      const img = getImageUrl(data.img!)
      const imgBlur = await getBase64ImageUrl(data.img!)
      const fullData: MenuItemType = {
        ...data,
        img,
        imgBlur,
      }

      return fullData
    })

    const menuItemsData: MenuItemType[] = await Promise.all(promises)

    return menuItemsData
  } catch (error) {
    console.log(`Error: ${error}`)
    return notFound()
  }
}

type MenuByCategoryProps = {
  params: {
    category: string
  }
}

const MenuByCategory = async ({ params }: MenuByCategoryProps) => {
  const { category } = params

  const menuItemsData = await getData(category)

  return (
    // ITEMS WRAPPER
    <div className='flex flex-wrap items-center justify-center rounded-sm md:py-24'>
      {menuItemsData?.map((item) => {
        // ITEM CONTAINER
        return (
          <Link
            key={item.id}
            href={`${category}/item/${item.id}`}
            className='group flex h-[60vh] w-full flex-col justify-between border-[0.01em] border-primary even:bg-quaternary hover:shadow-sm sm:w-1/2 lg:w-[30%]'
          >
            {/* ITEM IMAGE CONTAINER */}
            <div className='relative mt-2 flex flex-1 place-content-center 2xl:mt-8'>
              <Image
                src={item.img}
                placeholder='blur'
                blurDataURL={item.imgBlur}
                alt={item.name}
                fill
                sizes='(max-width: 768px) 100vw, 50vw'
                className='rounded-3xl object-contain transition duration-300 ease-in-out group-hover:rotate-[8deg] 2xl:group-hover:scale-105'
              />
            </div>

            {/* ITEM TEXT CONTAINER */}
            <div className='relative flex flex-col items-center space-y-2 p-4 2xl:flex-row 2xl:justify-between 2xl:space-y-0 2xl:p-4'>
              <h2 className='text-xl font-bold uppercase tracking-wide text-primary'>
                {item.name}
              </h2>
              {/* PRICE - CTA */}
              <h2 className='text-xl font-semibold text-primary 2xl:font-bold'>
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
