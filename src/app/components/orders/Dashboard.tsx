'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import OrderDetails from './OrderDetails'
import LoadingPulse from '../LoadingPulse'
import { handleToast } from '@/utils/handleToast'
import type { OrderType } from '@/types'

const Dashboard = () => {
  const router = useRouter()

  /**  get user session from SessionProvider */
  const { data: session, status } = useSession()
  const isAdmin = session?.user?.isAdmin || false
  const userEmail = session?.user?.email
  const sessionIsLoading = status === 'loading'
  const isAuthenticated = status === 'authenticated'

  /** fetch user's orders if athenticated
   * - all orders if admin
   * - user's orders if not admin
   */
  const fetchOrders = async () => {
    // protect route
    if (!userEmail) {
      handleToast({
        type: 'info',
        message: `Please log in to access your orders`,
      })
      router.push('/login')
      return
    }

    const queryString = isAdmin
      ? `?userIsAdmin=true&userEmail=${userEmail}`
      : `?userEmail=${session?.user?.email}`

    const queryResponse = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/orders${queryString}`
    )
    const queryResults = await queryResponse.json()
    return queryResults
  }

  const {
    isLoading: queryIsLoading,
    error: queryError,
    data,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    /** fetch after authentication */
    enabled: isAuthenticated,
  })

  if (queryError) {
    console.log(queryError.message)
    /** notify user and redirect */
    handleToast({
      type: 'info',
      message: `Server Error. Please make sure you are logged in to view your orders.`,
    })
    router.push('/login')
  }

  const ordersData = data?.orders

  return (
    <>
      {sessionIsLoading || queryIsLoading ? (
        <LoadingPulse />
      ) : isAdmin ? (
        <div className='text-center font-bold uppercase tracking-wide text-primary'>
          Admin Dashboard
        </div>
      ) : null}

      {!sessionIsLoading && !isAuthenticated && (
        <div className='text-center text-primary'>
          <Link href='/login'>
            <span>Please </span>
            <span className='font-bold underline underline-offset-4'>
              log in
            </span>
            <span> to check your orders.</span>
          </Link>
        </div>
      )}

      <table className='w-full border-separate'>
        <thead>
          <tr className='text-left'>
            <th className='px-1 py-4 md:px-2'>ID</th>
            <th className='px-1 py-4 md:px-2'>Date</th>
            <th className='hidden px-2 py-4 md:block'>Details</th>
            <th className='px-1 py-4 md:px-2'>Total</th>
            <th className='px-1 py-4 md:px-2'>Status</th>
          </tr>
        </thead>
        <tbody>
          {ordersData &&
            ordersData?.map((order: OrderType) => {
              return (
                <OrderDetails key={order.id} isAdmin={isAdmin} order={order} />
              )
            })}
        </tbody>
      </table>
    </>
  )
}

export default Dashboard
