import jwt from 'jsonwebtoken'
import OrderModel from '../../model/orderSchema.js'


export const placeOrder = async (req, res) => {
  try {
    // Verify user authentication
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'You are unauthorized. Please login to continue.' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Extract order data from request body
    const { orderedItems, deliveryDate, payment, paymentMethod, shippingAddress, orderDate, coupons, totalAmount } = req.body;

    // Create new order document
    const newOrder = new OrderModel({
      userId,
      orderedItems,
      deliveryDate,
      payment,
      paymentMethod,
      shippingAddress,
      orderDate,
      coupons,
      totalAmount,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Some Error occurred. Please try again!' });
    throw err;
  }
};

