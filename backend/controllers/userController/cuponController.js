import CuponModel from '../../model/cuponModel.js'
import ProductVariant from '../../model/productVarientModel.js';

export const ApplyCupons=async(req,res)=>{
    try {
        const {cupon}=req.body;
        const cuponExisting=await CuponModel.findOne({code:cupon})
        if(cuponExisting.length==0){
            return res.status(400).json({message:"No cupon existing !"})
        }

       
    
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Some Error occurred. Try again!' });
      throw err;
    }
}