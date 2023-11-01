import Link from 'next/link'
import React from 'react'
import PhoneLink from './PhoneLink'

const year = new Date().getFullYear()

const Footer = () => {
  return (
    <div className='bg-primary border-light text-light relative bottom-0 left-0 right-0 flex h-12 items-center justify-between border-t p-4 sm:h-24 lg:px-16 xl:px-32 2xl:px-48'>
      {/* brand name */}

      <Link href='/' className='text-lg font-bold uppercase tracking-wide'>
        Dolce Vita
      </Link>

      <PhoneLink className='bottom-12 left-1/2 hidden -translate-x-1/2 translate-y-1/2 sm:absolute sm:flex md:hidden' />

      <span className='text-sm font-bold'>
        &copy; {year} All rights reserved.
      </span>
    </div>
  )
}

export default Footer
