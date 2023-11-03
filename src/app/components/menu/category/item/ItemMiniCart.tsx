'use client'

import { useState, useEffect } from 'react'
import { useAppContext } from '@/app/context/appContext'
import { twMerge } from 'tailwind-merge'
import { v4 as uuidv4 } from 'uuid'
import type { ItemType } from '@/data'
import type { CartItemType } from '@/app/context/appContext'

type ItemMiniCartProps = {
  item: ItemType
}

const ItemMiniCart = ({ item }: ItemMiniCartProps) => {
  const { id, title, price, options, src } = item

  const { cart, setCart } = useAppContext()
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
    const cartItem: CartItemType = {
      cartItemId: uuidv4(),
      id,
      title,
      quantity,
      totalPrice,
      selectedOption,
      src,
    }

    setCart([...cart, cartItem])
  }

  return (
    <div className='flex w-full flex-col space-y-2 md:space-y-4'>
      {/* TOTAL PRICE */}
      <h2 className='text-2xl font-bold uppercase tracking-wide'>
        ${totalPrice.toFixed(2)}
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

      {/* quantityER + CTA */}
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
    </div>
  )
}

export default ItemMiniCart
