'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { v4 as uuidv4 } from 'uuid'
import { useCartStore } from '@/utils/zustand/store'
import { handleToast } from '@/utils/handleToast'
import type { CartItemType, MenuItemType } from '@/types'

type ItemMiniCartProps = {
  item: MenuItemType
}

const ItemMiniCart = ({ item }: ItemMiniCartProps) => {
  const { id, name, price, options, img } = item

  // local state
  const [quantity, setQuantity] = useState(1)
  const [selectedOptionName, setSelectedOptionName] = useState('small')
  const [totalPrice, setTotalPrice] = useState(price)

  // zustand
  const { cartItems, addToCart } = useCartStore()

  // rehydrate zustand cart store
  useEffect(() => {
    useCartStore.persist.rehydrate()
  }, [])

  // update total price on quantity/option change
  useEffect(() => {
    const option = options?.find((option) => option.name === selectedOptionName)
    const additionalPrice = option?.additionalPrice || 0
    const totalPrice = (price + additionalPrice) * quantity

    setTotalPrice(totalPrice)
  }, [selectedOptionName, quantity, price, options])

  // handlers
  const onAddToCart = () => {
    const cartItem: CartItemType = {
      cartemId: uuidv4(),
      name,
      quantity,
      totalPrice,
      selectedOptionName,
      img,
    }

    // add to cart store
    addToCart(cartItem)
    // notify user
    handleToast({
      type: 'success',
      message: `${quantity} x ${selectedOptionName} ${name} added successfully!`,
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
        {options?.map((option) => {
          return (
            <div key={option.name} className='flex flex-col'>
              <button
                onClick={() => setSelectedOptionName(option.name)}
                className={twMerge(
                  'btn',
                  ` text-sm font-bold tracking-wide ring ${
                    option.name === selectedOptionName
                      ? 'bg-primary ring-light'
                      : 'bg-light text-primary ring-primary'
                  }`
                )}
              >
                {option.name}
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
        {cartItems.length > 0 ? (
          <MotionLink
            href='/cart'
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.5 }}
            exit={{ scale: 0, opacity: 0 }}
            // transition={{ duration: 0.5 }}
            className={twMerge(
              'btn',
              'absolute right-1.5 top-[5.75rem] flex h-12 w-12 items-center justify-center rounded-full p-2 transition duration-300 sm:hover:scale-110 md:h-16 md:w-16 md:p-4 md:text-lg'
            )}
          >
            <div className='relative flex h-12 w-12 items-center justify-center md:h-16 md:w-16'>
              <Image
                src='/cart.png'
                fill
                alt='cart'
                className='object-contain'
              />
            </div>
          </MotionLink>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default ItemMiniCart

const MotionLink = motion(Link)
