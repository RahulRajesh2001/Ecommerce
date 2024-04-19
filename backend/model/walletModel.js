import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    default: 0, 
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderModel' }],
});

const Wallet = mongoose.model('Wallet', walletSchema);
export default Wallet;