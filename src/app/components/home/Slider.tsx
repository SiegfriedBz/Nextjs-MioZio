'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { buttonEnterVariants } from '@/utils/motionVariants'
import type { FullSliderImageType } from '@/app/page'

type SliderProps = { images: FullSliderImageType[] }

const Slider = ({ images }: SliderProps) => {
  const router = useRouter()
  const [currentSlideId, setcurrentSlideId] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setcurrentSlideId((prev) => (prev === images?.length - 1 ? 0 : prev + 1))
    }, 2000)

    return () => {
      clearInterval(timer)
    }
  }, [images])

  return (
    <section id='slider' className='flex flex-col lg:flex-row'>
      {/* text container */}
      <motion.div className='flex flex-1 flex-col items-center justify-center space-y-4 bg-light sm:space-y-8 lg:space-y-12'>
        <div className='flex  flex-col space-y-2 text-center font-extrabold uppercase tracking-wide text-primary sm:space-y-4 lg:space-y-8'>
          <div className='space-y-2 sm:space-y-4'>
            <motion.h2
              initial={{ opacity: 0, x: -350 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                type: 'spring',
                stiffness: 180,
              }}
            >
              Always
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, x: 350 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.25,
                duration: 0.75,
                type: 'spring',
                stiffness: 180,
              }}
              className='inline-block'
            >
              Fresh & tasty
            </motion.h2>
          </div>
          <div className='space-y-2 px-4 sm:space-y-4 sm:px-32 md:px-48 lg:px-16 lg:text-3xl xl:px-24 2xl:px-48'>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.5,
                duration: 2,
              }}
              className='inline-block'
            >
              {images[currentSlideId]?.title}
            </motion.h3>
          </div>
        </div>
        <div className='transition duration-300 ease-in-out hover:scale-110'>
          <motion.button
            variants={buttonEnterVariants}
            onClick={() => router.push('/menu')}
            initial='initial'
            animate='animate'
            className='btn'
          >
            Order now
          </motion.button>
        </div>
      </motion.div>

      {/* slider images container */}
      <div className='relative flex-1'>
        <Image
          src={images[currentSlideId]?.src}
          placeholder='blur'
          blurDataURL={images[currentSlideId]?.blurDataUrl}
          className='h-full w-full object-cover'
          fill={true}
          priority={true}
          alt={images[currentSlideId]?.alt}
          sizes='(max-width: 768px) 100vw, 50vw'
        />
      </div>
    </section>
  )
}

export default Slider
