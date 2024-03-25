import CuponModel from '../../model/cuponModel.js'
import ProductVariant from '../../model/productVarientModel.js';

export const ApplyCupons = async (req, res) => {
    try {
      const { cupon, varientId } = req.body;
  
      const couponExisting = await CuponModel.findOne({ code: cupon });
      if (!couponExisting) {
        return res.status(400).json({ message: "No coupon exists!" });
      }

      const productVariant = await ProductVariant.findById(varientId);
      if (!productVariant) {
        return res.status(400).json({ message: "Product variant not found!" });
      }
  
console.log(couponExisting.discountValue)

      if (!productVariant.cupon.includes(couponExisting._id)) {

        productVariant.cupon.push(couponExisting._id);
        await productVariant.save(); 
      }

      let amount=couponExisting.discountValue
  
      res.status(200).json({ message: "Coupon applied successfully!" ,amount});
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Some Error occurred. Try again!' });
      throw err;
    }
  }
  