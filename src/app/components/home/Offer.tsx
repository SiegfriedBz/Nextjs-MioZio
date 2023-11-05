import Image from 'next/image'
import Link from 'next/link'
import Counter from './Counter'
import { twMerge } from 'tailwind-merge'
import type { PageImageType } from '@/utils/types'

type OfferProps = {
  image: PageImageType
}

const Offer = ({ image }: OfferProps) => {
  return (
    <section className='flex flex-col items-center bg-[url("/specialOfferBg.png")] lg:flex-row lg:space-x-24'>
      {/* OFFER TEXT container */}
      <div className='flex flex-1 flex-col justify-center space-y-4 px-4 py-4 lg:space-y-8 lg:py-0 lg:pe-0 lg:ps-16'>
        {/* title */}
        <h2 className='font-extrabold text-light/90 lg:text-7xl'>
          Delicious Burger & French Fries
        </h2>
        {/* dsec */}
        <h4 className='text-justify text-light/80'>
          I&apos;m baby authentic gorpcore cred, food truck roof party
          microdosing gastropub. Cardigan deep v air plant direct trade, fanny
          pack microdosing offal etsy gentrify roof party
        </h4>
        {/* counter */}
        <h2 className='text-tertiary lg:text-7xl'>
          <Counter />
        </h2>

        {/* CTA */}
        <Link
          href='/menu'
          className={twMerge(
            'btn',
            'w-max transition duration-300 ease-in-out hover:scale-110'
          )}
        >
          Order Now
        </Link>
      </div>

      {/* OFFER IMG container */}
      <div className='relative flex h-full w-full flex-1 items-center justify-center'>
        <Image
          src={image.img}
          placeholder='blur'
          blurDataURL={image.imgBlur}
          fill
          priority
          sizes='(max-width: 768px) 100vw, 50vw'
          alt='special offer'
          className='rounded-3xl object-contain'
        />
      </div>
    </section>
  )
}

export default Offer
