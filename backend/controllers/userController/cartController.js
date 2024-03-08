import CartModel from '../../model/cartModel.js'
import ProductVariant from '../../model/productVarientModel.js'
import jwt from 'jsonwebtoken'

// POST
// api/v1/addToCart
// --- users

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required.' })
    }

    const productVariant = await ProductVariant.findById(productId)

    if (!productVariant) {
      return res.status(404).json({ message: 'Product variant not found.' })
    }

    if (quantity > productVariant.stock) {
      return res.json({ message: 'InSufficient Stock !' })
    }

    const token = req.headers.authorization
    if (!token) {
      return res
        .status(401)
        .json({ message: 'You are unauthorized. Please login to continue.' })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.id

    //setting maxqty
    const maxQty = 5
    let cart = await CartModel.findOne({ userId })

    if (!cart) {
      cart = new CartModel({
        userId,
        products: [{ productVarientId: productId, quantity }],
      })
    } else {
      const existingProductIndex = cart.products.findIndex(
        (item) => item.productVarientId.toString() === productId
      )

      if (existingProductIndex !== -1) {
        const totalQty = (cart.products[existingProductIndex].quantity +=
          quantity)
        if (totalQty > maxQty) {
          return res
            .status(404)
            .json({ message: `Maximum ${maxQty} quantity allowed per person` })
        }
      } else {
        cart.products.push({ productVarientId: productId, quantity })
      }
    }

    const savedCart = await cart.save()
    res.status(200).json({message:"Product added to Cart Successfully !",savedCart})
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Some Error occurred. Try again!' })
  }
}

// POST
// api/v1/getCartItems
// --- users

export const getCartItems = async (req, res) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      return res
        .status(401)
        .json({ message: 'You are unauthorized. Please login to continue.' })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userId = decoded.id

    const cartt=await CartModel.findOne({userId})
    console.log(cartt)
    
    const cart=await CartModel.findOne({userId}).populate({
      path:'products.productVarientId',
      model:"ProductVariant",
      select:'varientName images salePrice regularPrice productId'
    })

    console.log("hhehehehe",cart.products[0].productVarientId)

    res.status(200).json({message:"Succesfull",cart})

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Some Error occurred. Try again!' })
  }
}
