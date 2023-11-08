'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { twMerge } from 'tailwind-merge'
import { handleToast } from '@/utils/handleToast'

type Props = {
  menuItemCategory: string
  menuItemId: string
}

const AdminDeleteMenuItemButton = ({ menuItemCategory, menuItemId }: Props) => {
  const router = useRouter()
  const { data: session } = useSession()
  const isAdmin = session?.user?.isAdmin

  const handleDelete = async () => {
    if (!isAdmin) return

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/menuItems/${menuItemId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error()
      }
      const data = await response.json()

      // notify user
      handleToast({
        type: 'success',
        message: `${data.message}.`,
      })

      // navigate to menu/[category] page
      router.push(`/menu/${menuItemCategory}`)
    } catch (error) {
      console.log(error)
      handleToast({
        type: 'error',
        message: `Error deleting menu item.`,
      })
    }
  }

  if (!isAdmin) return null

  return (
    <div className='absolute bottom-1 right-1'>
      <button
        onClick={handleDelete}
        type='submit'
        className={twMerge(
          'btn',
          'z-50 bg-tertiary-dark px-4 py-2 text-base transition duration-300 ease-in-out hover:scale-105'
        )}
      >
        Delete
      </button>
    </div>
  )
}

export default AdminDeleteMenuItemButton
