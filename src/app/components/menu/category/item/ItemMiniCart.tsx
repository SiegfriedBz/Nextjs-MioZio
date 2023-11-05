'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAppContext } from '@/app/context/appContext'
import { motion, AnimatePresence } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { v4 as uuidv4 } from 'uuid'
import type { CartItemType } from '@/app/context/appContext'
import type { MenuItemType } from '@/types'

type ItemMiniCartProps = {
  item: MenuItemType
}

const ItemMiniCart = ({ item }: ItemMiniCartProps) => {
  const { id, name, price, options, img } = item

  const { cart, setCart, handleToast } = useAppContext()
  const [quantity, setQuantity] = useState(1)
  const [selectedOption, setSelectedOption] = useState('Small')
  const [totalPrice, setTotalPrice] = useState(price)

  useEffect(() => {
    const option = options?.find((option) => option.title === selectedOption)
    const additionalPrice = option?.additionalPrice || 0
    const totalPrice = (price + additionalPrice) * quantity

    setTotalPrice(totalPrice)
  }, [selectedOption, quantity, price, options])

  const onAddToCart = () => {
    console.log('onAddToCart')
    const cartItem: CartItemType = {
      cartItemId: uuidv4(),
      id: id!,
      name,
      quantity,
      totalPrice,
      selectedOption,
      img,
    }

    setCart([...cart, cartItem])
    handleToast({
      type: 'success',
      message: `${quantity} x ${selectedOption} ${name} added successfully!`,
    })
  }

  return (
    <div className='flex w-full flex-col space-y-2 md:space-y-4'>
      {/* TOTAL PRICE */}
      <h2 className='text-2xl font-bold uppercase tracking-wide'>
        ${Number(totalPrice)?.toFixed(2)}
      </h2>

      {/* OPTIONS */}
      <div className='flex justify-between'>
        {options?.map((option, index) => {
          return (
            <div key={index} className='flex flex-col'>
              <button
                onClick={() => setSelectedOption(option.title)}
                className={twMerge(
                  'btn',
                  ` text-sm font-bold tracking-wide ring ${
                    option.title === selectedOption
                      ? 'bg-primary ring-light'
                      : 'bg-light text-primary ring-primary'
                  }`
                )}
              >
                {option.title}
              </button>
            </div>
          )
        })}
      </div>

      {/* quantity + ADD TO CART CTA */}
      <div className='flex items-center justify-between text-primary'>
        <div>
          <span className='text-lg md:text-xl md:font-bold'>Quantity</span>
        </div>
        <div className='flex space-x-2'>
          <div className='flex items-center space-x-1'>
            <button
              className={`rounded-full border bg-light px-3 text-lg font-bold md:text-3xl ${
                quantity === 1
                  ? 'cursor-not-allowed border-dark/10 text-dark/30'
                  : 'border-primary/30 text-primary'
              }`}
              onClick={() => {
                return quantity > 1 ? setQuantity((prev) => prev - 1) : null
              }}
            >
              -
            </button>
            <span className='text-bold text-lg text-primary md:text-xl'>
              {quantity}
            </span>
            <button
              className='rounded-full border border-primary/30 bg-light px-3 text-lg font-bold text-primary md:text-3xl'
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>
          <button
            onClick={onAddToCart}
            className={twMerge(
              'btn',
              'text-base font-bold tracking-wide transition duration-300 sm:hover:scale-110 md:p-4 md:text-lg'
            )}
          >
            Add to cart
          </button>
        </div>
      </div>

      {/* GO TO CART CTA */}
      <AnimatePresence>
        {cart.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, x: '100vw' }}
            animate={{ opacity: 1, x: '0vw' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 180 }}
            className='flex w-full items-center justify-end'
          >
            <Link
              href='/cart'
              className={twMerge(
                'btn',
                'text-base font-bold tracking-wide transition duration-300 sm:hover:scale-110 md:p-4 md:text-lg'
              )}
            >
              <div className='relative h-6 w-6'>
                <Image
                  src='/cart.png'
                  fill
                  sizes='(max-width: 768px) 100vw, 100vw'
                  alt='cart'
                />
              </div>
              <span className='ps-2'>Go to cart</span>
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default ItemMiniCart
