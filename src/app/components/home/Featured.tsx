'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { MenuItemType } from '@/types'

type FeaturedProps = { featuredItems: MenuItemType[] }

const Featured = ({ featuredItems }: FeaturedProps) => {
  return (
    <section id='featured' className='w-screen overflow-x-scroll'>
      {/* WRAPPER */}
      <div className='flex h-full w-max [&>*:nth-child(even)]:bg-quaternary'>
        {featuredItems?.map((item) => {
          return (
            // SINGLE ITEM
            <div
              key={item.id}
              className='flex h-full w-screen flex-col space-y-4 px-2 py-4 text-center text-primary lg:w-[50vw] lg:px-8 2xl:w-[33vw]'
            >
              {/* ITEM IMG */}
              <div className='relative flex-1 rounded-none'>
                <Image
                  src={item.img}
                  placeholder='blur'
                  blurDataURL={item.imgBlur}
                  fill
                  priority
                  sizes='(max-width: 768px) 50vw,(max-width: 1024px) 24vw, 16vw'
                  alt={item.name}
                  className='cursor-pointer rounded-3xl object-contain transition duration-300 ease-in-out hover:rotate-[8deg] hover:scale-110'
                />
              </div>

              {/* ITEM TEXT  */}
              <div className='flex flex-1 flex-col items-center justify-end space-y-4 pb-8'>
                {/* item title */}
                <h2 className='text-3xl font-semibold sm:text-4xl'>
                  {item.name}
                </h2>
                {/* item description */}
                <p className='px-4 sm:px-24 md:px-32 lg:px-0'>
                  {item.description}
                </p>
                {/* item price */}
                <h2 className='text-3xl sm:text-4xl'>${item.price}</h2>
                {/*  CTA */}
                <Link
                  href={`/menu/${item.categorySlug}/item/${item.id}`}
                  className='btn mx-auto transition duration-300 ease-in-out hover:scale-110'
                >
                  Add to Cart
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Featured
