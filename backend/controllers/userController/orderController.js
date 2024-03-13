import jwt from 'jsonwebtoken'
import OrderModel from '../../model/orderSchema.js'
import ProductVariant from '../../model/productVarientModel.js';


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

    console.log("this is order Item",orderedItems)

    const savedOrder = await newOrder.save();

    for (const orderedItem of orderedItems) {
      const { product, quantity } = orderedItem;
  
      const foundProduct = await ProductVariant.findById(product);
  
      if (foundProduct) {
        const newStockLevel = foundProduct.stock - quantity;
        const productVariant = await ProductVariant.findByIdAndUpdate(product, { stock: newStockLevel }, { new: true });
      }
    }

    res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Some Error occurred. Please try again!' });
    throw err;
  }
};


// GET
// api/v1/getAllOrders
// --- users

export const getAllOrders = async (req, res) => {
  try {
    const token = req.headers.authorization

    console.log("this is token",token)
    
    if (!token) {
      return res
        .status(401)
        .json({ message: 'You are unauthorized. Please login to continue.' })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.id

    const orders=await OrderModel.find({userId})
    if(!orders){
      return res.status(400).json({message:"No orders"})
    }
    res.status(200).json({message:"Successfull",orders})
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Some Error occurred. Please try again!' });
    throw err;
  }
};

// GET
// api/v1/orderDetails
// --- users

export const getOrderDetails = async (req, res) => {
 
  try {
   const {id}=req.query;
   const order=await OrderModel.findOne({_id:id}) 
   if(!order){
    return res.status(400).json({message:"No order details !"})
   }
   res.status(200).json({message:"Successfull",order})

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Some Error occurred. Please try again!' });
    throw err;
  }
};  


// GET
// api/v1/cancelOrder
// --- users
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.query;

    const order = await OrderModel.findByIdAndUpdate(
      { _id: id },
      { $set: { "orderedItems.$[].orderStatus": "Cancelled" } },
      { new: true }
    );

  
    if (!order) {
      return res.status(400).json({ message: "No order details!" });
    }

    console.log(order.orderedItems[0].orderStatus);

    return res.status(200).json({ message: "Order cancelled successfully!", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Some error occurred. Please try again!" });
    throw err;
  }
};
