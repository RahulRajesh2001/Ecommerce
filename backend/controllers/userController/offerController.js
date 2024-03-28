import OfferModel from "../../model/offerModel.js";

// GET
// api/v1/getOfferDetails
// --- users


export const getOfferDetails = async (req, res) => {
  console.log(req.query)
    try {
      const {id}=req.query;
      console.log("this is id",id)
      if(!id){
        return res.status(500).json({message:"Missing ID Parameter !"})
      }
      const offer=await OfferModel.findOne({_id:id})
      res.status(200).json({message:"Successfull",offer})
  
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Some Error occurred. Try again!' })
    }
  }