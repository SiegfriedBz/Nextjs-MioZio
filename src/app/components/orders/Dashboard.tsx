'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { useAppContext } from '@/app/context/appContext'
import OrderDetails from './OrderDetails'
import LoadingPulse from '../LoadingPulse'
import type { OrderType } from '@/types'
import Link from 'next/link'

const Dashboard = () => {
  const { handleToast } = useAppContext()
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
    const queryString = isAdmin
      ? `?userIsAdmin=true&userEmail=${userEmail}`
      : userEmail !== undefined
      ? `?userEmail=${session?.user?.email}`
      : ''

    const queryResponse = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/orders${queryString}`
    )
    const queryResults = await queryResponse.json()
    return queryResults
  }

  const {
    isLoading: queryIsLoading,
    isError,
    data,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    /** fetch after authentication */
    enabled: isAuthenticated,
  })

  if (isError) {
    /** notify user and redirect */
    handleToast({
      type: 'info',
      message: 'Please make sure you are logged in to view your orders',
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