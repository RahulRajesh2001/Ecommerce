import OfferModel from '../../model/offerModel.js'
import Product from '../../model/productModel.js'
import ProductVariant from '../../model/productVarientModel.js'

// POST
// api/v1/admin/createOffer
// --- admin

export const createOffer = async (req, res) => {
  try {
    console.log(req.body)
    const {
      offerName,
      description,
      discountValue,
      validFrom,
      validUntil,
      offerType,
      discountType,
    } = req.body
    const existingOffer = await OfferModel.find({ offerName })
    if (!existingOffer.length == 0) {
      return res.status(500).json({ message: 'Offer existing !' })
    }

    const offer = new OfferModel({
      offerName,
      description,
      discountValue,
      validFrom,
      validUntil,
      offerType,
      discountType,
    })

    await offer.save()
    res.status(200).json({ message: 'Offer Created Successfully', offer })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Some Error occured .. Try again !' })
    throw err
  }
}

// get
// api/v1/admin/getAllOffers
// --- admin

export const getAllOffers = async (req, res) => {
  try {
    const offers = await OfferModel.find()
    if (offers.length == 0) {
      return res.status(500).json({ message: 'NO offers existing !' })
    }
    res.status(200).json({ message: 'Offer Fetched Successfully', offers })
  } catch (err) {
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
    const { id } = req.query
    if (!id) {
      return res.status(400).json({ message: 'There is no Id!' })
    }
    const response = await OfferModel.deleteOne({ _id: id })
    if (!response.acknowledged) {
      return res.status(500).json({ message: 'Offer is not deleted!' })
    }
    const offers = await OfferModel.find()
    res.status(200).json({ message: 'Offer Deleted Successfully!', offers })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Some Error occurred. Try again!' })
  }
}

// post
// api/v1/admin/addOffer
// --- admin

export const addOffer = async (req, res) => {
  try {
    const { id, varientId } = req.body;

    // Check if the offer already exists in any ProductVariant
    const existingOffer = await ProductVariant.findOne({ offers: id });

    if (existingOffer) {
      return res.status(200).json({ message: 'Offer already added' });
    }

    if (!id) {
      return res.status(400).json({ message: 'No offer selected!' });
    }
    const productVariant = await ProductVariant.findByIdAndUpdate(
      varientId,
      { $push: { offers: id } },
      { new: true }
    );

    const updatedProductVariant = await ProductVariant.findById(varientId);

    const offers = await OfferModel.find({ _id: { $in: updatedProductVariant.offers } });

    // Apply the largest offer among multiple offers
    let largestDiscount = 0;
    for (const offer of offers) {
      if (offer.discountType === 'FixedAmount') {
        if (offer.discountValue > largestDiscount) {
          largestDiscount = offer.discountValue;
        }
      } else {
        const discountAmount = (updatedProductVariant.salePrice * offer.discountValue) / 100;
        if (discountAmount > largestDiscount) {
          largestDiscount = discountAmount;
        }
      }
    }

    console.log(largestDiscount)

    // Apply the largest discount to the sale price of the ProductVariant
    updatedProductVariant.salePrice -= largestDiscount;
  
    await updatedProductVariant.save();

    return res.status(200).json({ message: 'Offer added successfully!', productVariant: updatedProductVariant, offers });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Some error occurred. Try again!' });
  }
};

// get
// api/v1/admin/getAllAddedOffer
// --- admin

export const getAddedOffers = async (req, res) => {
  try {
    const { varientId } = req.query
    if (!varientId) {
      return res.status(400).json({ message: 'Missing _id parameter' })
    }

    // Find the ProductVariant document by its _id
    const productVariant = await ProductVariant.findById({ _id: varientId })

    if (!productVariant) {
      return res.status(404).json({ message: 'ProductVariant not found' })
    }


    const offerIds = productVariant.offers
    const offers = await OfferModel.find({ _id: { $in: offerIds } })


    res.status(200).json({ offers })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Some error occurred. Try again!' })
  }
}


// delete
// api/v1/admin/deleteAddedOffer
// --- admin
export const deleteAddedOffer = async (req, res) => {
  try {
    const { id, varientId } = req.query;
    if (!id) {
      return res.status(400).json({ message: 'Missing _id parameter' });
    }

    const productVariant = await ProductVariant.findById(varientId);

    if (!productVariant) {
      return res.status(404).json({ message: 'ProductVariant not found' });
    }

    productVariant.offers.pull(id);
    await productVariant.save();

    res.status(200).json({ message: 'Offer deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Some error occurred. Try again!' });
  }
};