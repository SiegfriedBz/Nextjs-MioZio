import { Metadata } from 'next'
import Dashboard from '../components/orders/Dashboard'

export const metadata: Metadata = {
  title: 'Mio Zio | Orders',
  openGraph: {
    title: 'Mio Zio | Orders',
    description: 'Always fresh, always delicious',
  },
}

const Orders = () => {
  return (
    <div className='min-h-section p-4 lg:px-16 xl:px-32 2xl:px-48'>
      <Dashboard />
    </div>
  )
}

export default Orders
