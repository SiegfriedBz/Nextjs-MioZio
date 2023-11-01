'use client'

import Image from 'next/image'
import type { FullFeaturedItemType } from '@/app/page'

type FeaturedProps = { featuredItems: FullFeaturedItemType[] }

const Featured = ({ featuredItems }: FeaturedProps) => {
  const addToCart = (id: number): void => {
    console.log(id)
  }

  return (
    <section id='featured' className='w-screen overflow-x-scroll'>
      {/* WRAPPER */}
      <div className='[&>*:nth-child(even)]:bg-quaternary flex h-full w-max'>
        {featuredItems?.map((item) => {
          return (
            // SINGLE ITEM
            <div
              key={item.id}
              className='text-primary flex h-full w-screen flex-col space-y-4 px-2 py-4 text-center lg:w-[50vw] lg:px-8 2xl:w-[33vw]'
            >
              {/* ITEM IMG */}
              <div className='relative flex-1 rounded-full'>
                <Image
                  src={item?.src}
                  placeholder='blur'
                  blurDataURL={item?.blurDataUrl}
                  alt={item?.alt}
                  fill={true}
                  priority={true}
                  className='cursor-pointer rounded-full object-contain transition duration-300 ease-in-out hover:rotate-[16deg] hover:scale-110'
                />
              </div>

              {/* ITEM TEXT  */}
              <div className='flex flex-1 flex-col items-center justify-end space-y-4 pb-8'>
                {/* item title */}
                <h2 className='text-3xl font-semibold sm:text-4xl'>
                  {item?.title}
                </h2>
                {/* item description */}
                <p className='px-4 sm:px-24 md:px-32 lg:px-0'>{item?.desc}</p>
                {/* item price */}
                <h2 className='text-3xl sm:text-4xl'>${item?.price}</h2>
                {/*  CTA */}
                <button
                  onClick={() => addToCart(item?.id)}
                  className='mx-auto transition duration-300 ease-in-out hover:scale-110'
                >
                  Add to Cart
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Featured
