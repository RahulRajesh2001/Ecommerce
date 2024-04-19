import Wallet from "../../model/walletModel.js";
import jwt from 'jsonwebtoken'

export const getWalletHistory = async (req, res) => {
  console.log("hehehe walletHistory")
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'You are unauthorized. Please login to continue.' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const wallet = await Wallet.findOne({ user: userId }).populate({ path: 'orders', options: { strictPopulate: false } });

    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found for the user' });
    }

    res.status(200).json({ message: "Successfully fetched wallet information", wallet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Some error occurred. Please try again!' });
  }
};


//POST
export const addToWallet = async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'You are unauthorized. Please login to continue.' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;


    if (!amount || !orderId || !userId) {
      return res.status(400).json({ message: 'Missing parameters!' });
    }

    let wallet = await Wallet.findOne({ user: userId });

    if (!wallet) {
      wallet = new Wallet({ user: userId, amount: amount, orders: [],balance:0 });
    }

    wallet.balance += amount;

    wallet.orders.push(orderId);

    await wallet.save();

    // Respond with success message and updated wallet information
    res.status(200).json({ message: 'Amount added to wallet successfully.', wallet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Some error occurred. Please try again!' });
  }
};
