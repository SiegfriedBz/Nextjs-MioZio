'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { handleToast } from '@/utils/handleToast'

import type { MenuOptionType, MenuItemType } from '@/types'
import { MenuCategorySlugEnum } from '@/types'
const AdminForm = () => {
  const router = useRouter()
  const { data: session } = useSession()

  /** state */
  const [menuItem, setMenuItem] = useState<Omit<MenuItemType, 'img'>>({
    name: '',
    description: '',
    price: 0,
    isFeatured: false,
    categorySlug: MenuCategorySlugEnum.BURGER,
    options: [],
  })
  // to add a new option
  const [option, setOption] = useState<MenuOptionType>({
    name: '',
    additionalPrice: 0,
  })
  const [imgFile, setImgFile] = useState<File | undefined>(undefined)

  /** helpers */
  const isAdmin = session?.user?.isAdmin

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (e.target.type === 'checkbox') {
      setMenuItem((prev) => ({ ...prev, isFeatured: !prev.isFeatured }))
    } else {
      setMenuItem((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
  }

  const addOption = () => {
    setMenuItem((prev) => ({
      ...prev,
      options: [...prev.options!, option],
    }))
    setOption({
      name: '',
      additionalPrice: 0,
    })
  }

  /** handlers */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // check if user is admin
    if (!isAdmin) {
      handleToast({
        type: 'info',
        message: 'You are not authorized to access this page.',
      })
      return router.push('/')
    }

    const { name, description, price, isFeatured, categorySlug, options } =
      menuItem

    if (!name || !description || !price || !categorySlug || !imgFile) {
      return handleToast({
        type: 'info',
        message: 'Please fill in all the fields.',
      })
    }

    let imagePublicId: string | undefined = undefined

    try {
      /** 1. upload image to cloudinary => get image public_id */
      const cldFormData = new FormData()
      cldFormData.append('imageFile', imgFile as File)
      cldFormData.append('categorySlug', categorySlug as MenuCategorySlugEnum)

      const cldResponse = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/cloudinary`,
        {
          method: 'POST',
          body: cldFormData,
        }
      )

      if (!cldResponse.ok)
        throw new Error("Couldn't upload image to cloudinary")

      const { public_id } = await cldResponse.json()
      imagePublicId = public_id

      if (!imagePublicId) throw new Error("Couldn't get image public_id")

      /** 2. post new item to db */
      const body = {
        name,
        description,
        price,
        isFeatured,
        categorySlug,
        options,
        img: imagePublicId,
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/menuItems`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      )

      if (!response.ok) throw new Error("Couldn't add menu item to db")

      // notify user
      handleToast({
        type: 'success',
        message: 'Menu item added to database successfully!',
      })

      // navigate to menu page
      router.push('/menu')
    } catch (error) {
      console.log(error)
      handleToast({
        type: 'error',
        message: 'Error creating new menu item, please try again.',
      })
    }
  }

  const handleDeleteOption = (
    e: React.MouseEvent<HTMLButtonElement>,
    optionName: string
  ) => {
    if (!menuItem.options) {
      setMenuItem((prev) => ({ ...prev, options: [] }))
      return
    }

    setMenuItem((prev) => ({
      ...prev,
      options: prev.options!.filter((option) => option.name !== optionName),
    }))
  }

  console.log(menuItem)

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
            name='name'
            type='text'
            value={menuItem.name}
            onChange={handleChange}
            className='rounded-md border border-gray-400 px-2 py-1 outline-none'
          />
        </div>

        <div className='my-4 flex flex-col'>
          <label className='font-semibold text-primary' htmlFor='description'>
            Description
          </label>
          <textarea
            id='description'
            name='description'
            value={menuItem.description}
            onChange={handleChange}
            className='rounded-md border border-gray-400 px-2 py-1  outline-none'
          />
        </div>

        <div className='my-4 flex flex-col'>
          <label className='font-semibold text-primary' htmlFor='price'>
            Price ($)
          </label>
          <input
            id='price'
            name='price'
            type='number'
            value={menuItem.price}
            onChange={handleChange}
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
              checked={menuItem.isFeatured}
              onChange={handleChange}
              className={`${
                menuItem.isFeatured ? 'accent-primary' : ''
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
            <div className='flex w-full flex-col space-y-1 sm:flex-row sm:items-center sm:space-x-1 sm:space-y-0'>
              <div className='flex w-full space-x-1 sm:w-2/3'>
                <div className='flex w-1/2 flex-col'>
                  <label htmlFor='newOptionName' className='text-dark/80'>
                    Name
                  </label>
                  <input
                    id='newOptionName'
                    type='text'
                    value={option.name}
                    onChange={(e) =>
                      setOption({ ...option, name: e.target.value })
                    }
                    className='rounded-md border border-gray-400 px-2 py-1 outline-none'
                  />
                </div>
                <div className='flex w-1/2 flex-col'>
                  <label
                    htmlFor='newOptionAdditionalPrice'
                    className='text-dark/80'
                  >
                    Extra (USD)
                  </label>
                  <input
                    id='newOptionAdditionalPrice'
                    type='text'
                    value={option.additionalPrice}
                    onChange={(e) =>
                      setOption({
                        ...option,
                        additionalPrice: Number.isNaN(+e.target.value)
                          ? 0
                          : +e.target.value,
                      })
                    }
                    className='rounded-md border border-gray-400 px-2 py-1 outline-none'
                  />
                </div>
              </div>
              <button
                type='button'
                onClick={addOption}
                className={twMerge(
                  'btn',
                  'self-start px-4 py-2 text-sm sm:w-1/3 sm:self-end'
                )}
              >
                Add Option
              </button>
            </div>
          </div>

          {/* options list */}
          {menuItem?.options && menuItem?.options?.length > 0 && (
            <div className='mb-4'>
              <table className='w-full border-separate border border-gray-400 '>
                <thead>
                  <tr className='text-left text-primary'>
                    <th className='py-1'>Name</th>
                    <th className='whitespace-nowrap py-1'>Extra (USD)</th>
                    <th className='py-1'></th>
                  </tr>
                </thead>
                <tbody>
                  {menuItem.options.map((option, index) => (
                    <tr key={index} className='text-left'>
                      <td className='w-1/2 py-1'>{option.name}</td>
                      <td className='w-1/2 py-1'>{option.additionalPrice}</td>
                      <td className='py-1'>
                        <button
                          onClick={(e) => handleDeleteOption(e, option.name)}
                          type='button'
                          className={twMerge(
                            'btn',
                            'bg-amber-500 px-2 py-1 text-sm'
                          )}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className='my-4 flex flex-col'>
          <label className='font-bold text-primary' htmlFor='category'>
            Category
          </label>
          <select
            id='options'
            value={menuItem.categorySlug}
            name='categorySlug'
            onChange={handleChange}
            className='rounded-md border border-gray-400 px-2 py-1 outline-none'
          >
            <>
              <option value='BURGER'>Burger</option>
              <option value='PIZZA'>Pizza</option>
              <option value='PASTA'>Pasta</option>
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
