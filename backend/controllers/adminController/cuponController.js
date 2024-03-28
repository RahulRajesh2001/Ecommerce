import CuponModel from "../../model/cuponModel.js";


// post
// api/v1/admin/create-cupon
// --- admin
export const createCupon = async (req, res) => {
    try {
      const {cuponCode,cuponName,description,discountValue,validFrom,validUntil,discountType,usagelimit}=req.body;
      console.log("this si usage limit",usagelimit)
      const cupon= new CuponModel({
        code:cuponCode,
        cuponName,
        description,
        discountValue,
        validFrom,
        validUntil,
        discountType,
        usageLimit:usagelimit
      })
      
      await cupon.save()

      res.status(200).json({message:"Cupon Created Successfully"})

    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Some Error occured .. Try again !' })
      throw err
    }
  }
  
// get
// api/v1/admin/cupons
// --- admin
export const getCupons = async (req, res) => {
    try {
      const cupons=await CuponModel.find()
      if(cupons.length==0){
        return res.status(400).json({message:"No cupons existing !"})
      }

      res.status(200).json({message:"Cupon fetched successfully",cupons})

    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Some Error occured .. Try again !' })
      throw err
    }
  }
  

  // delete
// api/v1/admin/deleteCupon
// --- admin
export const deleteCupon = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ message: "Missing parameter 'id'!" });
        }
        const deleteCupon = await CuponModel.findByIdAndDelete(id);
        if (!deleteCupon) {
            return res.status(404).json({ message: "Coupon not found!" });
        }
        const cupons=await CuponModel.find()
        res.status(200).json({ message: "Coupon deleted successfully!" ,cupons});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Some Error occurred. Try again!' });
        throw err;
    }
}

  // updateCupon
// api/v1/admin/updateCupon
// --- admin
export const updateCupon = async (req, res) => {
    try {
        const { date } = req.body;
        console.log(date);
        const { id } = req.query;
        console.log(id);
        
        if (!date) {
            return res.status(400).json({ message: "Enter date properly" });
        }
        if (!id) {
            return res.status(400).json({ message: "Missing parameter id!" });
        }
        
        const updatedCoupon = await CuponModel.findByIdAndUpdate(id, { validUntil: date }, { new: true });

        if (!updatedCoupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }
        const cupons=await CuponModel.find()
        res.status(200).json({ message: 'Coupon updated successfully', cupons});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Some error occurred. Try again!' });
    }
};
