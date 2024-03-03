import Product from '../../model/productModel.js'
import reviewModel from '../../model/reviewModel.js'

// GET
// api/v1/products
// --- users

export const getProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $lookup: {
          from: 'productvariants',
          localField: '_id',
          foreignField: 'productId',
          as: 'variants',
        },
      },
    ])
    res.status(200).json({ message: 'Successfully fetched products', products })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Some Error occured .. Try again !' })
    throw err
  }
}

// get
// api/v1/productDetails
// --- user

export const getProductDetails = async (req, res) => {
  try {
    let id = req.query.id
    const products = await Product.aggregate([
      {
        $lookup: {
          from: 'productvariants',
          localField: '_id',
          foreignField: 'productId',
          as: 'variants',
        },
      },
    ])

    const foundProduct = products.find(product => product._id == id)

    if (foundProduct) {
      res.status(200).json({ message: 'Product founded Successfully', product: foundProduct })
    } else {
      res.status(400).json({ message: 'Product not found' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Some Error occurred. Try again!' })
    throw err
  }
}


// post
// api/v1/addReview
// --- user

export const addReview = async (req, res) => {
  try {
    const { productId, rating, review, userId } = req.body
    const newReview = new reviewModel({
      productId,
      rating,
      review,
      userId,
    })
    await newReview.save()
    res.status(201).json({ message: 'Review Added Successfully !', newReview })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Some Error occured .. Try again !' })
    throw err
  }
}

// get
// api/v1/getReview
// --- user

export const getReview = async (req, res) => {
  try {
    const id = req.query.id
    const review = await reviewModel.find({ productId: id })
    if (!review) {
      res.status(400).json({ message: 'There is no Review' })
    }
    res.status(200).json({ message: 'Review fetched successfully', review })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Some Error occured .. Try again !' })
    throw err
  }
}

// get
// api/v1/featured-products
// --- user

export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $lookup: {
          from: 'productvariants',
          localField: '_id',
          foreignField: 'productId',
          as: 'variants',
        },
      },
      {
        $sort: { createdAt: -1 } 
      },
      {
        $limit: 8 
      }
    ]);
    
    if (products.length === 0) {
      return res.status(404).json({ message: "No Products Found!" });
    }
    res.status(200).json({ message: "Successfully fetched products", products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred. Please try again.' });
    throw err;
  }
};

