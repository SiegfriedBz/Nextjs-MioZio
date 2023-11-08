'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/utils/zustand/store'
import { useEffect } from 'react'

type CartLinkProps = {
  onClick?: () => void
  mobileMenu?: boolean
  className?: string
}

const CartLink = ({
  onClick,
  mobileMenu = false,
  className = '',
}: CartLinkProps) => {
  // zustand
  const { cartItems } = useCartStore()

  // rehydrate zustand cart store
  useEffect(() => {
    useCartStore.persist.rehydrate()
  }, [])

  const totalItemsCount = cartItems.reduce((acc, item) => {
    return acc + item.quantity
  }, 0)

  return (
    <Link
      href='/cart'
      onClick={onClick}
      className={`flex items-center justify-center ${
        mobileMenu ? 'space-x-4' : 'space-x-2'
      }`}
    >
      <div className='relative h-8 w-8'>
        <Image
          src='/cart.png'
          fill
          sizes='(max-width: 768px) 100vw, 100vw'
          alt='cart'
        />
      </div>
      <div
        className={`${
          mobileMenu ? 'space-x-4' : 'space-x-2 font-bold'
        } ${className}`}
      >
        <span>Cart</span>
        <span>({totalItemsCount})</span>
      </div>
    </Link>
  )
}

export default CartLink
