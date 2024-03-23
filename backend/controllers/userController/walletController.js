import Wallet from "../../model/walletModel.js";
import jwt from 'jsonwebtoken'


export const getWalletHistory=async(req,res)=>{
  try {
    const token = req.headers.authorization

    if (!token) {
      return res
        .status(401)
        .json({ message: 'You are unauthorized. Please login to continue.' })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const wallet = await Wallet.findOne({ user: userId }).populate({
      path: 'transactions',
      options: { sort: { createdAt: -1 } }, 
    });

    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found for the user' });
    }

    const history = wallet.transactions.map((transaction) => ({
      type: transaction.type,
      date: transaction.createdAt,
      amount: transaction.amount,
    }));

    res.status(200).json({ history, balance: wallet.balance });
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Some error occurred. Please try again!' })
  }
}