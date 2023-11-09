'use client'

import { useState } from 'react'
import {
  PaymentElement,
  useStripe,
  useElements,
  AddressElement,
} from '@stripe/react-stripe-js'
import { twMerge } from 'tailwind-merge'

type PaymentIntentType = {
  status: 'succeeded' | 'processing' | 'requires_payment_method'
}

type Props = {
  orderId: string
}

export default function CheckoutForm({ orderId }: Props) {
  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // useEffect(() => {
  //   if (!stripe) {
  //     return
  //   }

  //   const clientSecret = new URLSearchParams(window.location.search).get(
  //     'payment_intent_client_secret'
  //   )

  //   console.log(clientSecret)
  //   console.log(clientSecret)

  //   if (!clientSecret) {
  //     return
  //   }

  //   stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
  //     console.log(paymentIntent)
  //     console.log(paymentIntent?.status)
  //     switch (paymentIntent?.status) {
  //       case 'succeeded':
  //         setMessage('Payment succeeded!')
  //         break
  //       case 'processing':
  //         setMessage('Your payment is processing...')
  //         break
  //       case 'requires_payment_method':
  //         setMessage('Your payment was not successful, please try again.')
  //         break
  //       default:
  //         setMessage('Something went wrong.')
  //         break
  //     }
  //   })
  // }, [stripe])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // NOTE: STRIPE WILL ADD THE PAYMENT_INTENT_ID TO THE QUERY STRING.
        // NOTE: this PAYMENT_INTENT_ID is DIFFERENT from the one we get at previous step at /api/stripe/create-intent.
        // here we just need to pass the orderId to the land on success page and retrieve:
        // -the orderId from {params}
        // -the stripe generated paymentIntentId from the query string.
        return_url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/stripe/success/${orderId}`,
      },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message || 'An unexpected error occurred.')
    } else {
      setMessage('An unexpected error occurred.')
    }

    setIsLoading(false)
  }

  return (
    <div>
      <div className='my-8'>
        <h1 className='text-3xl font-extrabold uppercase tracking-wide text-secondary md:text-2xl'>
          Congratulations!
        </h1>
        <div className='my-4'>
          <h4 className='text-lg text-secondary'>
            We&apos;ve just passed 10&apos;000 orders and{' '}
            <span className='text-xl font-bold uppercase'>
              you win a free meal!
            </span>
          </h4>
          <h4 className='mt-2 text-base'>Use the following card details:</h4>
          <ul>
            <li>
              <span className='text-lg font-bold text-secondary'>
                Card number:{' '}
              </span>
              4242 4242 4242 4242
            </li>
            <li>
              <span className='text-lg font-bold text-secondary'>Expiry: </span>
              04/24
            </li>
            <li>
              <span className='text-lg font-bold text-secondary'>CVC: </span>
              424
            </li>
          </ul>
        </div>
      </div>

      {/* payment form */}
      <form id='payment-form' onSubmit={handleSubmit}>
        <PaymentElement id='payment-element' options={{ layout: 'tabs' }} />
        <button disabled={isLoading || !stripe || !elements} id='submit'>
          <span id='button-text'>
            {isLoading ? (
              <div className='spinner' id='spinner'></div>
            ) : (
              <span
                className={twMerge(
                  'btn',
                  'my-2 bg-secondary px-4 py-2 text-lg transition duration-300 ease-in-out hover:bg-secondary-dark'
                )}
              >
                Pay now
              </span>
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id='payment-message'>{message}</div>}
      </form>

      {/* address form */}
      <div className='my-8'>
        <h1 className='text-lg font-bold uppercase tracking-wide text-primary md:text-xl'>
          Shipping address
        </h1>
        <AddressElement
          options={{ mode: 'shipping' }}
          onChange={(event) => {
            if (event.complete) {
              // extract potential complete address
              const address = event.value.address
            }
          }}
        />
      </div>
    </div>
  )
}
