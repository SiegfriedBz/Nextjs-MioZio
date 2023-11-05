import { notFound } from 'next/navigation'
import { getBase64ImageUrl, getImageUrl } from '@/utils/getImageUrls'
import Image from 'next/image'
import ItemMiniCart from '@/app/components/menu/category/item/ItemMiniCart'
import type { MenuItemType } from '@/utils/types'

const handleCache =
  process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store'

async function getData(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/menuItems?id=${id}`,
      {
        cache: handleCache,
      }
    )
    if (!response.ok) throw new Error('Network response was not ok.')

    const { menuItems } = await response.json()
    const menuItem = menuItems?.[0] as MenuItemType

    if (!menuItem) throw new Error('MenuItem not found.')

    const menuItemPromise = async (menuItem: MenuItemType) => {
      const img = getImageUrl(menuItem.img!)
      const imgBlur = await getBase64ImageUrl(menuItem.img!) // Wait for the async result
      const fullData: MenuItemType = {
        ...menuItem,
        img,
        imgBlur,
      }

      return fullData
    }

    const menuItemData = menuItemPromise(menuItem)
    return menuItemData
  } catch (error) {
    console.log(`Error: ${error}`)
    return notFound()
  }
}

type ItemProps = {
  params: {
    category: string
    id: string
  }
}

const Item = async ({ params }: ItemProps) => {
  const { id: menuItemId } = params

  const menuItemData = await getData(menuItemId)

  return (
    <section className='flex flex-col items-center justify-around space-y-1 p-4 sm:space-y-2 sm:px-16 md:flex-row md:space-x-4 md:px-8 lg:px-24 xl:px-32 2xl:px-48'>
      {/* IMAGE CONTAINER */}
      <div className='relative h-full w-full flex-1 pt-1'>
        {menuItemData?.img && (
          <Image
            src={menuItemData.img}
            placeholder='blur'
            blurDataURL={menuItemData.imgBlur}
            alt={menuItemData.name}
            fill
            sizes='(max-width: 768px) 50vw,(max-width: 1024px) 33vw, 50vw'
            className='rounded-3xl object-contain transition-all duration-300 md:hover:rotate-[8deg] md:hover:scale-105'
          />
        )}
      </div>

      {/* TEXT CONTAINER */}
      <div className='flex flex-1 flex-col space-y-1 px-2 text-primary sm:space-y-2 md:space-y-8'>
        <h2 className='text-2xl font-bold uppercase tracking-wide md:text-3xl'>
          {menuItemData.name}
        </h2>
        <h3 className='text-sm md:text-base'>{menuItemData.description}</h3>
        <ItemMiniCart item={menuItemData} />
      </div>
    </section>
  )
}

export default Item
