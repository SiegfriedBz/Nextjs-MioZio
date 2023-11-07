'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppContext } from '@/app/context/appContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDate } from '@/utils/formatDate'
import { twMerge } from 'tailwind-merge'
import type { OrderType } from '@/types'
import { OrderStatusEnum } from '@/types'

const orderStatusDisplayNames: { [key in OrderStatusEnum]: string } = {
  [OrderStatusEnum.PENDING]: 'pending',
  [OrderStatusEnum.PAID]: 'paid',
  [OrderStatusEnum.ON_THE_WAY]: 'on the way',
  [OrderStatusEnum.DELIVERED]: 'delivered',
  [OrderStatusEnum.CANCELLED]: 'cancelled',
}

function isOrderStatusValid(key: string): key is keyof typeof OrderStatusEnum {
  return key in OrderStatusEnum
}

type Props = {
  isAdmin: boolean
  order: OrderType
}

const OrderDetails = ({ isAdmin, order }: Props) => {
  const router = useRouter()
  const { handleToast } = useAppContext()

  console.log(isAdmin)

  // local state
  const [orderStatus, setOrderStatus] = useState<OrderStatusEnum>(
    isOrderStatusValid(order.status!)
      ? OrderStatusEnum[order.status]
      : OrderStatusEnum.PENDING
  )

  // Access the client
  const queryClient = useQueryClient()

  // mutation - update order status
  const handleUpdateOrderStatus = () => {
    if (!isAdmin) {
      router.push('/')
      return
    }

    updateOrderStatus.mutate({
      id: order.id!,
      status: orderStatus,
    })
  }

  const updateOrderStatus = useMutation({
    mutationFn: async (updatedOrder: { id: string; status: string }) => {
      // protect route
      const queryString = `?isAdmin=${isAdmin}`
      // fetch
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/orders${queryString}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedOrder),
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
        message: 'Order status updated successfully!',
      })
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
    onError(error, variables, context) {
      console.log(error)
      handleToast({
        type: 'error',
        message: 'Error updating order status, please try again',
      })
    },
  })

  //
  // mutation - delete order status
  const handleDeleteOrder = () => {
    if (!isAdmin) {
      router.push('/')
      return
    }

    const orderId = order.id!

    deleteOrder.mutate(orderId)
  }

  const deleteOrder = useMutation({
    mutationFn: async (id: string) => {
      // protect route & pass id
      const queryString = `?isAdmin=${isAdmin}&orderId=${id}`
      // fetch
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/orders${queryString}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
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
        message: 'Order deleted successfully.',
      })
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
    onError(error, variables, context) {
      console.log(error)
      handleToast({
        type: 'error',
        message: 'Error deleting order, please try again',
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
              {Object.entries(orderStatusDisplayNames).map(
                ([key, displayName]) => (
                  <option key={key} value={key}>
                    {displayName}
                  </option>
                )
              )}
            </select>
            <div className='mt-1 flex flex-col space-y-1'>
              <button
                onClick={handleUpdateOrderStatus}
                type='button'
                className={twMerge('btn', 'px-2 py-1 text-sm')}
              >
                Update
              </button>
              <button
                onClick={handleDeleteOrder}
                type='button'
                className={twMerge('btn', 'bg-amber-500 px-2 py-1 text-sm')}
              >
                Delete
              </button>
            </div>
          </form>
        ) : (
          orderStatusDisplayNames[orderStatus]
        )}
      </td>
    </tr>
  )
}

export default OrderDetails
