import CATEGORY from '../../model/categoryModel.js'
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
    const { id, varientId } = req.body

    // Check if the offer already exists in any ProductVariant
    const existingOffer = await ProductVariant.findOne({ offers: id })

    if (existingOffer) {
      return res.status(200).json({ message: 'Offer already added' })
    }

    if (!id) {
      return res.status(400).json({ message: 'No offer selected!' })
    }
    const productVariant = await ProductVariant.findByIdAndUpdate(
      varientId,
      { $push: { offers: id } },
      { new: true }
    )

    await productVariant.save()
    const updatedProductVariant = await ProductVariant.findById(varientId)
    const offers = await OfferModel.find({
      _id: { $in: updatedProductVariant.offers },
    })
    return res
      .status(200)
      .json({ message: 'Offer added successfully!', offers })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Some error occurred. Try again!' })
  }
}

// get
// api/v1/admin/applyOffer
// --- admin
export const applyOffer = async (req, res) => {
  try {
    const { varientId } = req.query
    const updatedProductVariant = await ProductVariant.findById(varientId)
    const offers = await OfferModel.find({
      _id: { $in: updatedProductVariant.offers },
    })

    if (!updatedProductVariant) {
      return res.status(404).json({ message: 'Product variant not found!' })
    }
    if (!offers.length) {
      return res.status(404).json({ message: 'No offers found!' })
    }
    let largestDiscount = 0
    let offerId = null
    for (const offer of offers) {
      let currentDiscount = 0
      if (offer.discountType === 'FixedAmount') {
        currentDiscount = offer.discountValue
      } else {
        const discountAmount =
          (updatedProductVariant.salePrice * offer.discountValue) / 100
        currentDiscount = discountAmount
      }

      if (currentDiscount > largestDiscount) {
        largestDiscount = currentDiscount
        offerId = offer._id
      }
    }

    if (!offerId) {
      return res.status(404).json({ message: 'No applicable offer found!' })
    }

    const appliedOffer = offers.find(
      (offer) => offer._id.toString() === offerId.toString()
    )

    if (!appliedOffer) {
      return res.status(404).json({ message: 'Applied offer not found!' })
    }

    const appliedVariants = appliedOffer.productId

    for (const variant of appliedVariants) {
      if (variant._id.toString() === varientId) {
        return res.status(200).json({ message: 'Offer is already applied!' })
      }
    }

    await OfferModel.findByIdAndUpdate(
      offerId,
      { $push: { productId: varientId } },
      { new: true }
    )

    updatedProductVariant.salePrice -= largestDiscount
    await updatedProductVariant.save()

    return res
      .status(200)
      .json({ message: 'Offer applied successfully!', offers })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Some error occurred. Try again!' })
  }
}

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
    const { id, varientId } = req.query
    if (!id) {
      return res.status(400).json({ message: 'Missing _id parameter' })
    }

    const productVariant = await ProductVariant.findById(varientId)

    if (!productVariant) {
      return res.status(404).json({ message: 'ProductVariant not found' })
    }

    const offers = await OfferModel.find({ _id: id })

    if (!offers) {
      return res.status(404).json({ message: 'Offer not found' })
    }

    let currentDiscount = 0
    for (const offer of offers) {
      if (offer._id.toString() === id) {
        if (offer.discountType == 'FixedAmount') {
          currentDiscount = offer.discountValue
        } else {
          const discountAmount =
            (productVariant.salePrice * offer.discountValue) / 100
          currentDiscount = discountAmount
        }

        productVariant.salePrice += currentDiscount
        await productVariant.save()

        console.log(offer.productId)

        offer.productId.pull(varientId)
        await offer.save()
      }
    }
    productVariant.offers.pull(id)
    await productVariant.save()

    res.status(200).json({ message: 'Offer deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Some error occurred. Try again!' })
  }
}

// POST
// api/v1/admin/applyCategoryOffer
// --- admin
export const applyCategoryOffer = async (req, res) => {
  try {
    const { id, categoryId } = req.body
    if (!id) {
      return res.status(400).json({ message: 'Missing _id parameter' })
    }
    if (!categoryId) {
      return res.status(400).json({ message: 'Missing _Category id parameter' })
    }
    const existingCategory = await CATEGORY.findOne({ _id: categoryId })
    if (!existingCategory) {
      return res.status(500).json({ message: 'There is no category existing!' })
    }
    const products = await Product.find({ category: existingCategory.title })
    const ids = products.map((product) => product._id)
    const productVariants = await ProductVariant.find({
      productId: { $in: ids },
    })

    const promises = productVariants.map(async (productVariant) => {
      if (productVariant.offers.length === 0) {
        if (!existingCategory.appliedOffers.includes(id)) {
          // Adding offer to applied offer
          await CATEGORY.findByIdAndUpdate(
            categoryId,
            { $push: { appliedOffers: id } },
            { new: true }
          )
        }

        const applyOffer = await OfferModel.findOne({ _id: id })
        let Discount = 0
        if (applyOffer.discountType === 'FixedAmount') {
          Discount = applyOffer.discountValue
        } else {
          const discountAmount =
            (productVariant.salePrice * applyOffer.discountValue) / 100
          Discount = discountAmount
        }

        productVariant.salePrice -= Discount
        productVariant.offers.push(id)
        await productVariant.save()
      } else {
        let offerid = productVariant.offers[0]
        if (offerid.toString() === id) {
          return res.status(500).json({ message: 'Offer is already applied!' })
        }

        const offer = await OfferModel.findOne({ _id: offerid })
        let currentDiscount = 0
        if (offer.discountType === 'FixedAmount') {
          currentDiscount = offer.discountValue
        } else {
          const discountAmount =
            (productVariant.salePrice * offer.discountValue) / 100
          currentDiscount = discountAmount * 2
        }

        const ApplyDiscount = await OfferModel.findOne({ _id: id })
        let applyDiscount = 0
        if (ApplyDiscount.discountType === 'FixedAmount') {
          applyDiscount = applyOffer.discountValue
        } else {
          const discountAmount =
            (productVariant.salePrice * ApplyDiscount.discountValue) / 100
          applyDiscount = discountAmount
        }

        if (currentDiscount < applyDiscount) {
          productVariant.salePrice += currentDiscount
          productVariant.salePrice -= applyDiscount
          productVariant.offers[0] = id
          await CATEGORY.findByIdAndUpdate(
            categoryId,
            { $pull: { appliedOffers: offerid } },
            { new: true }
          )
          if (!existingCategory.appliedOffers.includes(id)) {
            // Adding offer to applied offer
            await CATEGORY.findByIdAndUpdate(
              categoryId,
              { $push: { appliedOffers: id } },
              { new: true }
            )
          }
          res.status(200).json({ message: 'Offer applied Successfully' })
          await productVariant.save()
        }
      }
    })

    await Promise.all(promises)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Some error occurred. Try again!' })
  }
}

// get
// api/v1/admin/getCatoryAppliedOffer
// --- admin

export const getCatoryAppliedOffer = async (req, res) => {
  try {
    const { categoryId } = req.query
    if (!categoryId) {
      return res.status(400).json({ message: 'Missing _Category id parameter' })
    }
    const existingCategory = await CATEGORY.findOne({ _id: categoryId })
    if (!existingCategory) {
      return res.status(500).json({ message: 'There is no category existing!' })
    }

    const categoryOfferId = existingCategory.appliedOffers[0]
    if (categoryOfferId) {
      const categoryOffer = await OfferModel.find({ _id: categoryOfferId })
      if (categoryOffer) {
        return res.status(200).json({ message: 'Successfull', categoryOffer })
      } else {
        return res.status(400).json({ message: 'No categories applied' })
      }
    } else {
      return res.status(400).json({ message: 'No categories applied' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Some error occurred. Try again!' })
  }
}

// Delete
// api/v1/admin/getCatoryAppliedOffer
// --- admin

export const deleteAppliedCategoryOffer = async (req, res) => {
  try {
    const {id}=req.query;
    
   
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Some error occurred. Try again!' })
  }
}
