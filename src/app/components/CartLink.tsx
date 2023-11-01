'use client'

import Image from 'next/image'
import Link from 'next/link'

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
  return (
    <Link
      href='/cart'
      onClick={onClick}
      className={`flex items-center justify-center ${
        mobileMenu ? 'space-x-4' : 'space-x-2'
      }`}
    >
      <div className='relative h-8 w-8'>
        <Image src='/cart.png' fill={true} alt='cart' />
      </div>
      <div
        className={`${
          mobileMenu ? 'space-x-4' : 'space-x-2 font-bold'
        } ${className}`}
      >
        <span>Cart</span>
        <span>(3)</span>
      </div>
    </Link>
  )
}

export default CartLink
