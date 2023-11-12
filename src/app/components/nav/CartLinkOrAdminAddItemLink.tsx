'use client'

import { useSession } from 'next-auth/react'
import CartLink from '../CartLink'
import LoadingPulse from '../LoadingPulse'
import Link from 'next/link'

type Props = {
  mobileMenu?: boolean
  closeModalMenu?: () => void
}

const CartLinkOrAdminAddItemLink = ({ mobileMenu, closeModalMenu }: Props) => {
  const { data: session, status } = useSession()
  const isLoading = status === 'loading'
  const isSignedIn = status === 'authenticated'
  const isAdmin = session?.user?.isAdmin

  if (isLoading) return <LoadingPulse />

  return (
    <div>
      {isAdmin ? (
        <Link
          onClick={() =>
            mobileMenu && closeModalMenu ? closeModalMenu() : null
          }
          href='/admin/add-menu-item'
          className={`uppercase tracking-wide ${
            mobileMenu ? '' : 'font-bold text-primary '
          } `}
        >
          Add Menu Item
        </Link>
      ) : (
        <CartLink
          onClick={closeModalMenu}
          mobileMenu={mobileMenu}
          className={`uppercase tracking-wide ${
            mobileMenu ? '' : 'font-bold text-primary '
          } `}
        />
      )}
    </div>
  )
}

export default CartLinkOrAdminAddItemLink
