import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

export const verifyToken = async (req, res, next) => {
  const token = req.headers('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user.isBlocked==false) {
      return res.status(401).json({ error: 'User not found' });
    }
    if(user){
      next();
    }else{
      res.status(500).json({message:"Unautherized"})
    }

    
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const verifyAdminToken = async (req, res, next) => {
  console.log("executed")
  const token = req.header('Authorization');
  console.log("executedtoken",token)
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    const decoded = jwt.verify(token,'superSecretKey');
   if(decoded.email=='rahulrjev@gmail.com'){
    next();
   }else{
    res.status(500).json({message:"Unautherized"})
   }
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid token' });
  }
};


