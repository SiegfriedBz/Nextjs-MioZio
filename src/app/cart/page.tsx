'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { twMerge } from 'tailwind-merge'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useCartStore } from '@/utils/zustand/store'
import { handleToast } from '@/utils/handleToast'
import { OrderType } from '@/types'

const Cart = () => {
  const router = useRouter()
  // zustand
  const { cartItems, removeFromCart, clearCart } = useCartStore()
  // session
  const { data: session } = useSession()
  const userEmail = session?.user?.email

  // Access the client
  const queryClient = useQueryClient()

  // rehydrate zustand cart store
  useEffect(() => {
    useCartStore.persist.rehydrate()
  }, [])

  // handlers
  const handleCheckout = () => {
    // notify user to login if not logged in
    if (!userEmail) {
      handleToast({
        type: 'info',
        message: 'Please login to checkout',
      })
      // redirect to login page
      return router.push('/login')
    }

    // populate order
    const newOrder = {
      totalPrice: totalPrice,
      userEmail: userEmail,
      cartItems: cartItems.map((cartItem) => {
        return {
          name: cartItem.name,
          totalPrice: cartItem.totalPrice,
          quantity: cartItem.quantity,
          selectedOptionName: cartItem.selectedOptionName,
        }
      }),
    }

    checkOut.mutate(newOrder)
  }

  const checkOut = useMutation({
    mutationFn: async (newOrder: OrderType) => {
      const queryString = `?userEmail=${userEmail}`

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/orders${queryString}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newOrder),
        }
      )

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    onSuccess: () => {
      handleToast({
        type: 'success',
        message: 'Order placed successfully!',
      })
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['orders'] })

      // clear cart store
      clearCart()
      // redirect to orders page
      router.push('/orders')
    },
    onError(error, variables, context) {
      console.log(error)
      handleToast({
        type: 'error',
        message: `${error.message}, Error placing order, please try again`,
      })
    },
  })

  // delete cart item from cart store
  const onDeleteCartItem = (cartItemId: string) => {
    removeFromCart(cartItemId)
  }

  // helpers
  const totalItemsCount = cartItems.reduce((acc, item) => {
    return acc + item.quantity
  }, 0)

  const totalItemsPrice = cartItems.reduce((acc, item) => {
    return acc + item.totalPrice
  }, 0)

  const deliveryPrice = totalItemsPrice >= 50 ? 0 : totalItemsPrice * 0.1
  const totalPrice = totalItemsPrice + deliveryPrice

  return (
    <div className='min-h-section flex flex-col justify-between md:flex-row md:gap-x-4 lg:gap-x-8'>
      {/* LIST */}
      <div className='md:h-section flex h-1/2 flex-1 items-center overflow-scroll p-4 text-primary md:me-8 lg:ps-16 xl:ps-32 2xl:ps-48'>
        {cartItems.length === 0 ? (
          <div className='flex flex-col items-center justify-center'>
            <h3>Your Cart is Empty</h3>
            <span className='text-center text-lg'>
              Add something from the{' '}
              <Link
                href='/menu'
                className='font-bold underline underline-offset-4'
              >
                menu
              </Link>{' '}
              <span className='whitespace-nowrap'>to get started</span>
            </span>
            <span className='text-center text-lg'>
              or{' '}
              <Link
                href='/orders'
                className='font-bold underline underline-offset-4'
              >
                check your orders
              </Link>
            </span>
          </div>
        ) : (
          <ul className='flex h-full w-full flex-col gap-y-16'>
            {cartItems?.map((cartItem) => {
              return (
                <li
                  key={cartItem.cartemId}
                  className='flex h-full w-full items-center justify-center gap-x-2 md:gap-x-16'
                >
                  {/* ITEM IMG */}
                  <div className='relative h-32 w-32'>
                    {cartItem?.img && (
                      <Image
                        src={cartItem.img}
                        fill={true}
                        alt='cart'
                        sizes='(max-width: 768px) 16w, 16vw'
                        className='object-contain'
                      />
                    )}
                  </div>

                  {/* ITEM DETAILS */}
                  <div className='flex w-full justify-between'>
                    {/* title & option */}
                    <div className='flex max-w-[50%] flex-col gap-y-1'>
                      <h3 className='text-lg font-bold uppercase tracking-wide 2xl:text-xl'>
                        {cartItem.name}
                      </h3>
                      <h4 className='text-lg 2xl:text-xl'>
                        {cartItem.selectedOptionName}
                      </h4>
                    </div>

                    <div className='flex items-center gap-x-8 md:gap-x-16 lg:gap-x-24'>
                      {/* quantity & price */}
                      <div className='flex flex-col-reverse items-center gap-x-2 lg:flex-row lg:gap-x-4'>
                        <span className='text-lg'>x {cartItem.quantity}</span>
                        <span className='text-lg'>
                          ${cartItem.totalPrice.toFixed(2)}
                        </span>
                      </div>

                      {/* delete btn */}
                      <span
                        className='cursor-pointer text-xl font-semibold'
                        onClick={() => onDeleteCartItem(cartItem.cartemId!)}
                      >
                        X
                      </span>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {/* TOTAL */}
      <div
        className='md:min-h-section 
           flex h-1/2
           w-full flex-col items-center
           justify-center
           gap-y-8
            bg-quaternary px-4
            py-8 md:w-1/3 md:gap-y-24
            md:py-0
            lg:px-16
            xl:px-32 2xl:w-1/2 2xl:px-48
            '
      >
        <div className='flex w-full flex-col gap-y-4 md:gap-y-8'>
          <div className='flex w-full justify-between text-lg text-primary md:gap-x-4 2xl:text-xl'>
            <span>Subtotal ({totalItemsCount} items): </span>
            <span className='text-right'>${totalItemsPrice.toFixed(2)}</span>
          </div>

          <div className='flex w-full justify-between text-lg text-primary md:gap-x-4 2xl:text-xl'>
            <span>Service cost: </span>
            <span className='text-right font-bold uppercase tracking-wide text-secondary'>
              FREE!
            </span>
          </div>

          <div className='flex w-full justify-between text-lg text-primary md:gap-x-4 2xl:text-xl'>
            <span className='text-primary'>Delivery cost: </span>
            <span
              className={`text-right ${
                deliveryPrice === 0
                  ? 'font-bold text-secondary'
                  : 'text-primary'
              }`}
            >
              {deliveryPrice === 0 ? 'FREE!' : deliveryPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <div className='flex w-full justify-between text-lg text-primary md:gap-x-4 2xl:text-xl'>
          <span>Total: </span>
          <span className='text-right font-bold uppercase tracking-wide'>
            ${totalPrice.toFixed(2)}
          </span>
        </div>

        <button
          onClick={handleCheckout}
          className={twMerge(
            'btn',
            'w-1/2 self-end px-4 py-2 text-base transition duration-300 ease-in-out hover:scale-110 2xl:px-8 2xl:py-4 2xl:text-lg'
          )}
        >
          Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart
