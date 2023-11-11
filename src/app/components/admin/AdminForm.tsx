'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import type { MenuOptionType, MenuCategoryType, MenuItemType } from '@/types'
import { MenuCategorySlugEnum } from '@/types'
import { twMerge } from 'tailwind-merge'
import { handleToast } from '@/utils/handleToast'
import { useRouter } from 'next/navigation'

const MenuCategoryDisplayNames: { [key in MenuCategorySlugEnum]: string } = {
  [MenuCategorySlugEnum.PIZZA]: 'pizza',
  [MenuCategorySlugEnum.PASTA]: 'pasta',
  [MenuCategorySlugEnum.BURGER]: 'burger',
}

const AdminForm = () => {
  const router = useRouter()
  const { data: session } = useSession()

  /** state */
  const [name, setName] = useState<string | undefined>(undefined)
  const [description, setDescription] = useState<string | undefined>(undefined)
  const [price, setPrice] = useState<number | undefined>(undefined)
  const [imgFile, setImgFile] = useState<File | undefined>(undefined)
  const [isFeatured, setIsFeatured] = useState(false)
  // options
  const [options, setOptions] = useState<MenuOptionType[]>([])
  const [option, setOption] = useState<MenuOptionType>({
    name: '',
    additionalPrice: 0,
  })
  //
  const [categorySlug, setCategorySlug] = useState<
    MenuCategorySlugEnum | undefined
  >(undefined)

  /** helpers */
  const isAdmin = session?.user?.isAdmin
  if (!isAdmin) return null

  const addOption = () => {
    setOptions((prev) => [...prev, option])
    setOption({
      name: '',
      additionalPrice: 0,
    })
  }

  /** handlers */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name || !description || !price || !imgFile || !categorySlug) {
      // notify user
      return handleToast({
        type: 'info',
        message: 'Please fill in all fields.',
      })
    }

    try {
      const formData = new FormData()

      // populate form data except img
      const newItemBase: Omit<MenuItemType, 'img'> = {
        name: name,
        description: description,
        price: price,
        isFeatured: isFeatured || false,
        options: options,
        categorySlug: categorySlug,
      }
      for (var key in newItemBase) {
        if (newItemBase.hasOwnProperty(key)) {
          formData.append(key, newItemBase[key])
        }
      }

      // append img to form data
      formData.set('imgFile', imgFile)

      // post new menu item to db
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/menuItems`,
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!response.ok) throw new Error()

      await response.json()

      // notify user
      handleToast({
        type: 'success',
        message: 'Menu item added to database successfully!',
      })

      // navigate to menu page
      router.push('/menu')
    } catch (error) {
      console.log(error)
      // notify user
      handleToast({
        type: 'error',
        message: 'Error uploading image to Cloudinary / adding menu item to db',
      })
    }
  }

  return (
    <div>
      <h1 className='text-xl font-bold text-primary'>Add Menu Item</h1>

      <form onSubmit={handleSubmit} className='flex flex-col'>
        <div className='my-4 flex flex-col'>
          <label className='font-semibold text-primary' htmlFor='name'>
            Name
          </label>
          <input
            id='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='rounded-md border border-gray-400 px-2 py-1 outline-none'
          />
        </div>

        <div className='my-4 flex flex-col'>
          <label className='font-semibold text-primary' htmlFor='description'>
            Description
          </label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='rounded-md border border-gray-400 px-2 py-1  outline-none'
          />
        </div>

        <div className='my-4 flex flex-col'>
          <label className='font-semibold text-primary' htmlFor='price'>
            Price ($)
          </label>
          <input
            id='price'
            type='number'
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            className='rounded-md border border-gray-400 px-2 py-1  outline-none'
          />
        </div>

        <div className='my-4 flex flex-col'>
          <label className='font-semibold text-primary' htmlFor='img'>
            Image
          </label>
          <input
            id='img'
            type='file'
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : undefined
              setImgFile(file)
            }}
            className='rounded-md border border-gray-400 outline-none'
          />
        </div>

        <div className='my-4 flex flex-col'>
          <label className='text-primary' htmlFor='featured'>
            <input
              id='featured'
              type='checkbox'
              checked={isFeatured}
              onChange={() => setIsFeatured((prev) => !prev)}
              className={`${
                isFeatured ? 'accent-primary' : ''
              } rounded-md border border-gray-400 px-2 py-1 outline-none`}
            />
            <span className='ms-2 font-semibold'>Is featured</span>
          </label>
        </div>

        <div className='my-4 flex flex-col'>
          <label className='font-semibold text-primary' htmlFor='options'>
            Options
          </label>
          {/* add option */}
          <div className='my-1 flex flex-col'>
            <span className='text-primary'>New Option</span>
            <ul className='flex flex-col space-y-1 lg:flex-row lg:space-x-8'>
              <li className='ms-4 flex items-center space-x-2'>
                <label className='w-1/2 text-primary' htmlFor='newOptionName'>
                  Name
                </label>
                <input
                  id='newOptionName'
                  type='text'
                  value={option.name}
                  onChange={(e) =>
                    setOption({ ...option, name: e.target.value })
                  }
                  className='w-1/2 rounded-md border border-gray-400 px-2 py-1 outline-none'
                />
              </li>
              <li className='ms-4 flex items-center space-x-2'>
                <label
                  className='w-1/2 text-primary'
                  htmlFor='newOptionAdditionalPrice'
                >
                  Additional price ($)
                </label>
                <input
                  id='newOptionAdditionalPrice'
                  type='number'
                  value={option.additionalPrice}
                  onChange={(e) =>
                    setOption({ ...option, additionalPrice: +e.target.value })
                  }
                  className='w-1/2 rounded-md border border-gray-400 px-2 py-1 outline-none'
                />
              </li>
              <button
                type='button'
                onClick={addOption}
                className={twMerge(
                  'btn',
                  'mb-2 max-w-max self-end px-4 py-2 text-sm lg:mt-1 lg:flex-1'
                )}
              >
                Add Option
              </button>
            </ul>
          </div>

          {/* options list */}
          <div className='my-4'>
            <ul className='flex flex-col space-y-1 lg:flex-row lg:space-x-8'></ul>
            {options.map((option, index) => (
              <div key={index} className='my-2'>
                <li className='flex items-center space-x-2'>
                  <label className='w-1/2 text-primary'>Name</label>
                  <span className='w-1/2 rounded-md border border-gray-400 px-2 py-1 outline-none'>
                    {option.name}
                  </span>
                </li>
                <li className='flex items-center space-x-2'>
                  <label className='w-1/2 text-primary'>
                    Additional price ($)
                  </label>
                  <span className='w-1/2 rounded-md border border-gray-400 px-2 py-1 outline-none'>
                    {option.additionalPrice}
                  </span>
                </li>
              </div>
            ))}
          </div>
        </div>

        <div className='my-4 flex flex-col'>
          <label className='font-bold text-primary' htmlFor='category'>
            Category
          </label>
          <select
            id='options'
            value={categorySlug}
            onChange={(e) =>
              setCategorySlug(e.target.value as MenuCategorySlugEnum)
            }
            className='rounded-md border border-gray-400 outline-none'
          >
            <>
              <option>Select a category</option>
              {Object.entries(MenuCategoryDisplayNames).map(
                ([key, displayName]) => (
                  <option key={key} value={key}>
                    {displayName}
                  </option>
                )
              )}
            </>
          </select>
        </div>

        <button type='submit' className={twMerge('btn', 'my-4 px-4 py-2')}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default AdminForm
