'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

type Option = {
  title: string
  additionalPrice: number
}

type ItemMiniCartProps = {
  basePrice: number
  options: Option[]
}

const ItemMiniCart = ({ basePrice, options }: ItemMiniCartProps) => {
  const [selectedOption, setSelectedOption] = useState('Small')
  const [count, setCount] = useState(1)
  const [totalPrice, setTotalPrice] = useState(basePrice)

  useEffect(() => {
    const option = options?.find((option) => option.title === selectedOption)
    const additionalPrice = option?.additionalPrice || 0
    const totalPrice = (basePrice + additionalPrice) * count

    setTotalPrice(totalPrice)
  }, [selectedOption, count, basePrice, options])

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
              <span
                onClick={() => setSelectedOption(option.title)}
                className={twMerge(
                  'btn',
                  ` text-sm font-bold tracking-wide ring ${
                    option.title === selectedOption
                      ? 'bg-light text-primary ring-primary'
                      : 'bg-primary ring-light'
                  }`
                )}
              >
                {option.title}
              </span>
            </div>
          )
        })}
      </div>

      {/* COUNTER + CTA */}
      <div className='text-primary flex items-center justify-between'>
        <div>
          <span className='text-lg md:text-xl md:font-bold'>Quantity</span>
        </div>
        <div className='flex space-x-2'>
          <div className='flex items-center space-x-1'>
            <span
              className={`bg-light rounded-full border px-3 text-lg font-bold md:text-3xl ${
                count === 0
                  ? 'text-dark/30 border-dark/10 cursor-not-allowed'
                  : 'text-primary border-primary/30 cursor-pointer'
              }`}
              onClick={() => {
                return count > 0 ? setCount((prev) => prev - 1) : null
              }}
            >
              -
            </span>
            <span className='text-primary text-bold text-lg md:text-xl'>
              {count}
            </span>
            <span
              className='bg-light text-primary border-primary/30 cursor-pointer rounded-full border px-3 text-lg font-bold md:text-3xl'
              onClick={() => setCount((prev) => prev + 1)}
            >
              +
            </span>
          </div>
          <Link
            href='/cart'
            className={twMerge(
              'btn',
              'text-sm font-bold tracking-wide md:p-4 md:text-lg'
            )}
          >
            Add to cart
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ItemMiniCart
