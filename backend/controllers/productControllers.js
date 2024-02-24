import Product from '../model/productModel.js'
import ProductVariant from '../model/productVarientModel.js'
import cloudinary from 'cloudinary'

//cloudinary configaration
cloudinary.config({
  cloud_name: 'dztburkwy',
  api_key: '182133815614938',
  api_secret: 'qz7-w8D4LZo3IV02cHqDEQRsqBs',
})

// Post
// api/v1/admin/addProduct
// --- admin

export const addProduct = async (req, res) => {
  console.log('addproduct body', req.body)
  try {
    const { name, category, description, brand } = req.body
    const product = new Product({
      name,
      category,
      description,
      brand,
    })
    const savedProduct = await product.save()
    const id = savedProduct._id
    res.status(201).json({ message: 'Product added successfully..!', id })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error..!' })
  }
}

export const addProductVariant = async (req, res) => {
  try {
    const {
      id,
      color,
      stock,
      regularPrice,
      productVarient,
      salePrice,
      specification,
      images,
    } = req.body

    //save images into cloudinary
    const cloudinaryUploadImage = async (fileToUpload) => {
      try {
        const data = await cloudinary.uploader.upload(fileToUpload, {
          resource_type: 'auto',
        })
        return data.url // Return the URL of the uploaded image
      } catch (error) {
        console.log(error)
        throw new Error('Internal Server Error (cloudinary)')
      }
    }

    // Upload all images concurrently
    const uploadPromises = images.map((imageData) =>
      cloudinaryUploadImage(imageData)
    )
    const uploadedImageURLs = await Promise.all(uploadPromises)

    const productVariantDetails = new ProductVariant({
      productId: id,
      color,
      stock,
      regularPrice,
      varientName: productVarient,
      salePrice,
      specification,
      images: uploadedImageURLs,
    })

    const savedProductVariant = await productVariantDetails.save()
    res.status(200).json({
      message: 'Product variant saved successfully..!',
      savedProductVariant,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error..!' })
  }
}

// Get
// api/v1/getProducts
// --- users

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json({ message: 'Successfull', products })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server error...!' })
  }
}
