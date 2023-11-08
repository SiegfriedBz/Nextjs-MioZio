'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

const AdminDeleteMenuItemButton = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data: session } = useSession()
  const isAdmin = session?.user?.isAdmin

  const handleDelete = async () => {
    console.log('handleDelete')
    const menuItemId = 'router'

    deleteMenuItem.mutate(menuItemId)
  }

  const deleteMenuItem = useMutation({
    mutationFn: async (menuItemId: string) => {
      const response = await fetch(
        `${process.env.NEXTAUTH_URL}/menuItems/${menuItemId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            cache: 'no-store',
          },
        }
      )
      return response.json()
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries('MenuItems')
    // },
  })

  if (!isAdmin) return null

  return (
    <div className='absolute right-1 top-[6.5rem]'>
      <button
        onClick={handleDelete}
        type='submit'
        className={twMerge('btn', 'px-4 py-2 text-base')}
      >
        Delete
      </button>
    </div>
  )
}

export default AdminDeleteMenuItemButton
