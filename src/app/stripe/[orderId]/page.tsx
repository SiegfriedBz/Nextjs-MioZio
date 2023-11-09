import CustomPaymentFlow from '@/app/components/stripe/CustomPaymentFlow'

type Props = {
  params: {
    orderId: string
  }
}

const Stripe = ({ params }: Props) => {
  const { orderId } = params

  return (
    <div className='min-h-section p-4 lg:px-16 xl:px-32 2xl:px-48'>
      <CustomPaymentFlow orderId={orderId} />
    </div>
  )
}

export default Stripe
