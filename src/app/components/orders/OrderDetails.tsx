'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { twMerge } from 'tailwind-merge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp, faTrash } from '@fortawesome/free-solid-svg-icons'
import { handleToast } from '@/utils/handleToast'
import { formatDate } from '@/utils/formatDate'
import type { OrderType } from '@/types'
import { OrderStatusEnum } from '@/types'

type Props = {
  isAdmin: boolean
  order: OrderType
}

const OrderDetails = ({ isAdmin, order }: Props) => {
  const router = useRouter()

  // local state
  const [orderStatus, setOrderStatus] = useState<OrderStatusEnum>(order.status)

  // Access the client
  const queryClient = useQueryClient()

  // mutation - update order status
  const handleUpdateOrderStatus = () => {
    // protect route
    if (!isAdmin) {
      handleToast({
        type: 'info',
        message: `You must be an admin to update an order status`,
      })
      router.push('/')
      return
    }

    updateOrderStatus.mutate({
      id: order.id!,
      status: orderStatus,
    })
  }

  const updateOrderStatus = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string
      status: OrderStatusEnum
    }) => {
      // fetch
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/orders/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status }),
        }
      )

      if (!response.ok) {
        throw new Error('Server error')
      }

      const data = response.json()
      return data
    },
    onSuccess: (data) => {
      handleToast({
        type: 'success',
        message: `${data?.message}`,
      })
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
    onError(error) {
      console.log(error)
      handleToast({
        type: 'error',
        message: `${error.message}. Error while updating order status, please try again.`,
      })
    },
  })

  //
  // mutation - delete order status
  const handleDeleteOrder = () => {
    // protect route
    if (!isAdmin) {
      handleToast({
        type: 'info',
        message: `You must be an admin to delete an order`,
      })
      router.push('/')
      return
    }

    const orderId = order.id!

    deleteOrder.mutate(orderId)
  }

  const deleteOrder = useMutation({
    mutationFn: async (id: string) => {
      // fetch
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/orders/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (!response.ok) {
        throw new Error('Server error')
      }

      const data = response.json()
      return data
    },
    onSuccess: (data) => {
      handleToast({
        type: 'success',
        message: `${data?.message}`,
      })
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
    onError(error) {
      console.log(error)
      handleToast({
        type: 'error',
        message: `${error.message}. Error while deleting order, please try again.`,
      })
    },
  })

  if (order == null) return null

  return (
    <tr
      key={order.id}
      className={`xl:text-lg ${
        order.status!.toLowerCase() === 'completed'
          ? 'odd:bg-dark/10'
          : 'odd:bg-quaternary'
      }`}
    >
      <td className='px-2 py-4'>{order.id!.slice(0, 5)}...</td>
      <td className='px-2 py-4'>{formatDate(order.createdAt!.toString())}</td>
      <td className='hidden px-2 py-4 md:block'>
        <ul>
          {order?.cartItems?.map((item, index) => {
            return (
              <li key={`${index}-${item}`}>
                {item.quantity} x {item.name} - {item.selectedOptionName}
              </li>
            )
          })}
        </ul>
      </td>
      <td className='px-2 py-4'>${order?.totalPrice}</td>
      <td className='px-2 py-4'>
        {isAdmin ? (
          <form className=''>
            <select
              value={orderStatus}
              onChange={(e) =>
                setOrderStatus(e.target.value as OrderStatusEnum)
              }
            >
              <option value='PENDING'>pending</option>
              <option value='PAID'>paid</option>
              <option value='ON_THE_WAY'>on the way</option>
              <option value='DELIVERED'>delivered</option>
              <option value='CANCELLED'>cancelled</option>
            </select>
            <div className='mt-1 flex justify-between'>
              <button
                onClick={handleUpdateOrderStatus}
                type='button'
                className={twMerge(
                  'btn',
                  'flex h-8 w-8 items-center justify-center rounded-full p-1 text-sm'
                )}
              >
                <FontAwesomeIcon icon={faCloudArrowUp} className='h-5 w-5' />
              </button>
              <button
                onClick={handleDeleteOrder}
                type='button'
                className={twMerge(
                  'btn',
                  'flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 p-1 text-sm'
                )}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </form>
        ) : (
          <span>
            {
              OrderStatusEnum[
                orderStatus.toUpperCase() as keyof typeof OrderStatusEnum
              ]
            }
          </span>
        )}
      </td>
    </tr>
  )
}

export default OrderDetails
