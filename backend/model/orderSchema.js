import mongoose from 'mongoose';

const { Schema } = mongoose;

const OrderSchema = new Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    orderedItems: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'ProductVariant',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                orderStatus: {
                    type: String,
                    default: 'Pending',
                    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned']
                },
                paymentStatus: {
                    type: String,
                    enum: ['Pending', 'Processing', 'Completed', 'Failed', 'Refunded'],
                    default: 'Pending'
                },
                offers: [{
                    type: mongoose.Types.ObjectId
                }]
            }
        ],
        required: true
    },
    deliveryDate: { type: Date, default: null },
    payment: { type: mongoose.Types.ObjectId },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['Credit Card', 'RazorPay', 'PayPal', 'Cash On Delivery'],
    },
    shippingAddress: {
        street: { type: String, required: true },
        phone1: { type: Number, required: true },
        phone2: { type: Number },
        state: { type: String, default: 'Unknown', required: true }, // Added default value
        pincode: { type: String, required: true },
        address: { type: String, required: true },
        fullName: { type: String, required: true },
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    coupons: { type: mongoose.Schema.Types.ObjectId },
    totalAmount: { type: Number, required: true },
});

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;
