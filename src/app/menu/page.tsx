import type { MenuCategoryDataType } from '@/data'
import { menuCategoryData } from '@/data'
import { getBase64ImageUrl, getImageUrl } from '@/utils/cloudinaryUtils'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

// trick tailwind
const possibleBgColors = ['bg-[#009345]', 'bg-[#CF2B36]', 'bg-transparent']

type FullImageType = MenuCategoryDataType & {
  blurDataUrl: string
}

async function getData() {
  const menuCategoryDataPromises = menuCategoryData.map(async (data) => {
    const src = getImageUrl(data.src)
    const blurDataUrl = await getBase64ImageUrl(data.src)
    const fullData: FullImageType = {
      ...data,
      src,
      blurDataUrl,
    }

    return fullData
  })

  const menuCategories = await Promise.all(menuCategoryDataPromises)

  return { menuCategories }
}

const Menu = async () => {
  const { menuCategories } = await getData()

  return (
    <div className='md:h-section flex flex-col px-4 md:flex-row md:py-24 lg:px-16 xl:px-32 2xl:px-48 [&>*:nth-child(even)]:border-b-2 [&>*:nth-child(even)]:border-t-2 [&>*:nth-child(even)]:border-light md:[&>*:nth-child(even)]:border-0'>
      {menuCategories?.map((menuCategory) => {
        // CATEGORY
        return (
          <Link
            href={`/menu/${menuCategory.slug}`}
            className={`${menuCategory?.bgColor} h-section-third flex w-full bg-cover bg-center hover:shadow-md md:h-full md:w-[33vw]`}
            key={menuCategory.id}
            style={{ backgroundImage: `url(${menuCategory.src})` }}
          >
            {/* category text container */}
            <div
              className={`flex w-1/2 flex-col items-start justify-start space-y-1 py-4 ps-4 sm:space-y-4 sm:p-8 xl:justify-center 2xl:space-y-8 ${menuCategory?.textColor}`}
            >
              <h3 className='text-2xl font-bold uppercase tracking-wide opacity-80 sm:text-3xl md:text-5xl'>
                {menuCategory.title}
              </h3>
              <h4 className='text-base opacity-60 sm:text-lg md:text-xl lg:text-2xl'>
                {menuCategory.desc}
              </h4>
              <button
                className={twMerge(
                  'btn',
                  `hidden shadow-sm 
                    shadow-primary ring-primary 
                    transition duration-300 ease-in-out
                     hover:scale-110 2xl:block ${
                       menuCategory?.textColor === 'text-dark'
                         ? 'bg-dark  text-light ring-1'
                         : 'bg-light text-primary ring-2'
                     }`
                )}
              >
                Explore
              </button>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Menu
