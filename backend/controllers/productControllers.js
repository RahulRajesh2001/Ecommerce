import Product from '../model/productModel.js'
import ProductVariant from '../model/productVarientModel.js'

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
  console.log(req.body)
  try {
    const {
      id,
      color,
      stock,
      regularPrice,
      productVarient,
      salePrice,
      specification,
      image,
    } = req.body

    console.log(image)
    const productVariantDetails = new ProductVariant({
      productId: id,
      color,
      stock,
      regularPrice,
      varientName: productVarient,
      salePrice,
      specification
    })

    const savedProductVariant = await productVariantDetails.save()
    res
      .status(200)
      .json({
        message: 'Product variant saved successfully..!',
        savedProductVariant,
      })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error..!' })
  }
}
