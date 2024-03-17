import OfferModel from "../../model/offerModel.js"


// POST
// api/v1/admin/createOffer
// --- admin

export const createOffer=async(req,res)=>{
    try{
    console.log(req.body)
    const {offerName,description,discountValue,validFrom,validUntil,offerType,discountType}=req.body
    const existingOffer=await OfferModel.find({offerName})
    if(!existingOffer.length==0){
        return res.status(500).json({message:"Offer existing !"})
    }

    const offer=new OfferModel({
        offerName,
        description,
        discountValue,
        validFrom,
        validUntil,
        offerType,
        discountType
    })

    await offer.save()
    res.status(200).json({message:"Offer Created Successfully",offer})

    }catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Some Error occured .. Try again !' })
        throw err
      }
}


// get
// api/v1/admin/getAllOffers
// --- admin

export const getAllOffers=async(req,res)=>{
    try{
    const offers=await OfferModel.find()
    if(offers.length==0){
        return res.status(500).json({message:"NO offers existing !"})
    }
    res.status(200).json({message:"Offer Fetched Successfully",offers})

    }catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Some Error occured .. Try again !' })
        throw err
      }
}

// delete
// api/v1/admin/deleteOffer
// --- admin
export const deleteOffer = async (req, res) => {
    try {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ message: "There is no Id!" });
      }
      const response = await OfferModel.deleteOne({ _id: id });
      if (!response.acknowledged) {
        return res.status(500).json({ message: "Offer is not deleted!" });
      }
      const offers = await OfferModel.find();
      res.status(200).json({ message: "Offer Deleted Successfully!", offers });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Some Error occurred. Try again!" });
    }
  };
  