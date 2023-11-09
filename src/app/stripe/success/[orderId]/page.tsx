'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import LoadingPulse from '@/app/components/LoadingPulse'
import { twMerge } from 'tailwind-merge'
import { handleToast } from '@/utils/handleToast'
import type { OrderType } from '@/types'
import { OrderStatusEnum } from '@/types'

const orderStatusDisplayNames: { [key in OrderStatusEnum]: string } = {
  [OrderStatusEnum.PENDING]: 'pending',
  [OrderStatusEnum.PAID]: 'paid',
  [OrderStatusEnum.ON_THE_WAY]: 'on the way',
  [OrderStatusEnum.DELIVERED]: 'delivered',
  [OrderStatusEnum.CANCELLED]: 'cancelled',
}

type Props = {
  params: {
    orderId: string
  }
}

const StripeSuccessPage = ({ params }: Props) => {
  const { orderId } = params

  // get the new payment_intent id created on the fly by stripe.
  const searchParams = useSearchParams()
  const paymentIntentId = searchParams.get('payment_intent')

  // state
  const [confirmedOrder, setConfirmedOrder] = useState<OrderType | null>(null)

  const updateOrder = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/stripe/confirm`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId, paymentIntentId }),
        }
      )

      if (!response.ok) throw new Error('Failed to update the order status')

      const data = await response.json()
      const { updatedOrder, message } = data
      setConfirmedOrder(updatedOrder)

      // notify user
      handleToast({
        type: 'success',
        message: data.message,
      })
    } catch (error) {
      console.log(error)
      // notify user
      handleToast({
        type: 'error',
        message: `Error: ${error}. Something went wrong, please try again later.`,
      })
    }
  }, [orderId, paymentIntentId])

  useEffect(() => {
    updateOrder()
  }, [updateOrder])

  return (
    <div className='min-h-section p-4 lg:px-16 xl:px-32 2xl:px-48'>
      <h1 className='text-xl font-bold uppercase tracking-wide text-primary md:text-2xl'>
        Order details
      </h1>

      <div className='my-4'>
        {!confirmedOrder ? (
          <LoadingPulse />
        ) : (
          <>
            {/* order summary */}
            <div>
              <span className='text-lg text-primary'>Order Id: </span>
              {confirmedOrder.id}
            </div>
            <div>
              <span className='text-lg text-primary'>Your email: </span>
              {confirmedOrder.userEmail}
            </div>
            <div>
              <span className='text-lg text-primary'>Order Status: </span>
              {orderStatusDisplayNames[confirmedOrder.status!]}
            </div>
            <div>
              <span className='text-lg text-primary'>Order Total: </span>$
              {confirmedOrder.totalPrice}
            </div>

            {/* order items */}
            <div className='my-2'>
              <span className='text-lg text-primary'> Order Items: </span>
              <ul className='list-disc'>
                <>
                  {confirmedOrder.cartItems.map((item, index) => {
                    return (
                      <li key={index} className='ms-5'>
                        <div>
                          <span className='text-lg text-primary'>
                            Menu item:{' '}
                          </span>
                          {item.quantity} x {item.name}
                        </div>
                        <div>
                          <span className='text-lg text-primary'>Option: </span>
                          <span className='capitalize'>
                            {item.selectedOptionName}
                          </span>
                        </div>
                        <div>
                          <span className='text-lg text-primary'>
                            Item price:{' '}
                          </span>
                          ${item.totalPrice}
                        </div>
                      </li>
                    )
                  })}
                </>
              </ul>
            </div>

            {/* link to orders */}
            <div className='mt-8 flex justify-start'>
              <Link
                replace
                href='/orders'
                className={twMerge('btn', 'max-w-max px-4 py-2 text-sm')}
              >
                Check your orders
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default StripeSuccessPage
