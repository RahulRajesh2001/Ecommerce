import OrderModel from '../../model/orderSchema.js'
import jwt from 'jsonwebtoken'

// GET
// api/v1/admin/allOrders
// --- admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
    ])

    if (!orders) {
      return res.status(400).json({ message: 'No orders !' })
    }
    res.status(200).json({ message: 'Order Successfull', orders })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Some Error occured .. Try again !' })
    throw err
  }
}


// patch
// api/v1/admin/editPaymentStatus
// --- admin
export const editPaymentStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { paymentStatus} = req.body;

        const updatedOrder = await OrderModel.findByIdAndUpdate(
            orderId,
            { $set: { "orderedItems.0.paymentStatus": paymentStatus } },
            { new: true } 
        );
        if(!updatedOrder){
          return res.status(400).json({message:"Updation failed !"})
        }

        const orders = await OrderModel.aggregate([
          {
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: '_id',
              as: 'user',
            },
          },
          {
            $unwind: '$user',
          },
        ])

        res.status(200).json({ message: 'Payment status updated successfully',orders});
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Some error occurred. Try again!' });
      }
  }


