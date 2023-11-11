'use client'

import { useSession } from 'next-auth/react'
import CartLink from '../CartLink'
import LoadingPulse from '../LoadingPulse'
import Link from 'next/link'

const CartLinkOrAdminAddItemLink = () => {
  const { data: session, status } = useSession()

  const isLoading = status === 'loading'
  const isAdmin = session?.user?.isAdmin

  if (isLoading) return <LoadingPulse />

  return (
    <div>
      {isAdmin ? (
        <Link
          href='/admin/add-menu-item'
          className='font-bold uppercase tracking-wide text-primary'
        >
          Add Menu Item
        </Link>
      ) : (
        <CartLink className='uppercase tracking-wide text-primary' />
      )}
    </div>
  )
}

export default CartLinkOrAdminAddItemLink
