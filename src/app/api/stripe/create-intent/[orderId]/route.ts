import { prisma } from '@/utils/prismaClient'

// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

//  get order amount from db
const getOrderAmount = async (orderId: string) => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  })
  if (!order?.totalPrice) {
    return Response.json(
      {
        message: 'Order not found, please try again',
      },
      { status: 404 }
    )
  }

  const orderAmount = order.totalPrice.toNumber()
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return orderAmount * 100
}

export async function POST(
  request: Request,
  { params: { orderId } }: { params: { orderId: string } },
  response: Response
) {
  try {
    const orderAmount = await getOrderAmount(orderId)

    // Create a PaymentIntent with the order amount and currency
    /**
     * /!\ paymentIntent.id is NOT the same as the one that will be created at next step,
     * when stripe.confirmPayment is called at checkout.
     * => do NOT use the current paymentIntent.id to update the order intent_id at this stage.
     *
     * This call here is just to get the paymentIntent.client_secret.
     * => display stripe checkout form.
     */
    const paymentIntent = await stripe.paymentIntents.create({
      amount: orderAmount,
      currency: 'usd',
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    })

    if (!paymentIntent?.client_secret)
      throw new Error('Payment intent not found, please try again')

    // Send PaymentIntent client_secret to client
    // => display stripe checkout form.
    return Response.json(
      {
        clientSecret: paymentIntent.client_secret,
      },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return Response.json({ message: `Error: ${error}` }, { status: 500 })
  }
}
