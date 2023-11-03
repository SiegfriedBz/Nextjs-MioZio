import React from 'react'

// transient
const data = [
  {
    id: 1,
    date: '2021-09-09',
    details: '1x Pizza, 2x Burgers',
    total: '10.00',
    status: 'On the way',
  },
  {
    id: 2,
    date: '2021-09-09',
    details: '1x Pizza',
    total: '10.00',
    status: 'Completed',
  },
  {
    id: 3,
    date: '2021-09-09',
    details: '1x Pizza',
    total: '10.00',
    status: 'Completed',
  },
  {
    id: 4,
    date: '2021-09-09',
    details: '1x Pizza',
    total: '10.00',
    status: 'Completed',
  },
  {
    id: 5,
    date: '2021-09-09',
    details: '1x Pizza',
    total: '10.00',
    status: 'Completed',
  },
  {
    id: 6,
    date: '2021-09-09',
    details: '1x Pizza',
    total: '10.00',
    status: 'Completed',
  },
  {
    id: 7,
    date: '2021-09-09',
    details: '1x Pizza',
    total: '10.00',
    status: 'Completed',
  },
  {
    id: 8,
    date: '2021-09-09',
    details: '1x Pizza',
    total: '10.00',
    status: 'Completed',
  },
]

const Orders = () => {
  return (
    <div className='min-h-section p-4 lg:px-16 xl:px-32 2xl:px-48'>
      <table className='w-full border-separate'>
        <thead>
          <tr className='text-left'>
            <th className='px-2 py-4'>ID</th>
            <th className='px-2 py-4'>Date</th>
            <th className='hidden px-2 py-4 md:block'>Details</th>
            <th className='px-2 py-4'>Total</th>
            <th className='px-2 py-4'>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((order) => {
            return (
              <tr
                key={order.id}
                className={`xl:text-lg ${
                  order?.status.toLowerCase() === 'completed'
                    ? 'odd:bg-dark/10'
                    : 'odd:bg-quaternary'
                }`}
              >
                <td className='px-2 py-4'>{order?.id}</td>
                <td className='px-2 py-4'>{order?.date}</td>
                <td className='hidden px-2 py-4 md:block'>{order?.details}</td>
                <td className='px-2 py-4'>${order?.total}</td>
                <td className='px-2 py-4'>{order?.status}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Orders
