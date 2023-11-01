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

  useEffect(() => {}, [selectedOption, count])

  return (
    <div className='flex w-full flex-col space-y-2'>
      {/* OPTIONS */}
      <div className='flex justify-between'>
        {options?.map((option, index) => {
          return (
            <div key={index} className='flex flex-col'>
              <span
                onClick={() => setSelectedOption(option.title)}
                className={twMerge(
                  'btn',
                  `capitalize ring ${
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
          <span className='text-lg'>Quantity</span>
        </div>
        <div className='flex space-x-2'>
          <div className='flex items-center space-x-1'>
            <button
              className='bg-light text-primary border-dark/10 border text-lg'
              onClick={() => setCount((prev) => prev - 1)}
            >
              -
            </button>
            <span className='text-primary text-lg'>{count}</span>
            <button
              className='bg-light text-primary border-dark/10 border text-xl'
              onClick={() => setCount((prev) => prev + 1)}
            >
              +
            </button>
          </div>
          <Link href='/cart' className='btn'>
            Add to cart
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ItemMiniCart
