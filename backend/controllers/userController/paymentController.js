import { instance } from '../../index.js'
import crypto from 'crypto'
import PaymentModel from '../../model/paymentModel.js'

export const checkout = async (req, res) => {
  console.log('checkout body', req.body)

  const { amount } = req.body

  const options = {
    amount: Number(amount * 100),
    currency: 'INR',
  }
  const order = await instance.orders.create(options)
  res.status(200).json({ success: true, order })
}

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body

  const body = razorpay_order_id + '|' + razorpay_payment_id

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest('hex')

  const isAuthentic = expectedSignature === razorpay_signature

  if (isAuthentic) {
    // Database comes here

    await PaymentModel.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    })

    res.redirect(
      `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
    )
  } else {
    res.status(400).json({
      success: false,
    })
  }
}
