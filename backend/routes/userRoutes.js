import express from 'express'
import {verifyToken} from '../utils/authMiddleware.js'
import {
  OTPGeneration,
  forgetPassword,
  login,
  otpRegeneration,
  otpVerification,
  register,
  resetPassword,
} from '../controllers/userController/authController.js'
import {
  addReview,
  alphaSort,
  categorySort,
  getCategories,
  getFeaturedProducts,
  getProductDetails,
  getProducts,
  getReview,
  priceSort,
  searchProducts,
  tagSort,
} from '../controllers/userController/productController.js'
import { addShippingAddress, chooseShippingAddress, deleteShippingAddress, editShippingAddress, editUser, getShippingAddress, getUser } from '../controllers/userController/userController.js'
import { addToCart, deleteFromCart, getCartItems } from '../controllers/userController/cartController.js'
import { placeOrder } from '../controllers/userController/orderController.js'

const router = express.Router()
router.get('/getProducts',verifyToken, getProducts)
router.get('/getProductDetails',verifyToken, getProductDetails)
router.post('/login',login)
router.post('/register',register)
router.post('/otp-generation',OTPGeneration)
router.post('/otp-verify', otpVerification)
router.post('/otp-regeneration', otpRegeneration)
router.post('/add-review',verifyToken, addReview)
router.get('/get-review',verifyToken, getReview)
router.get('/getCurrentUser',getUser)
router.post('/editUser',editUser)
router.get('/featuredProducts',verifyToken,getFeaturedProducts)
router.post("/forgetPassword", forgetPassword);
router.post("/reset-password/:token", resetPassword);
router.get('/getCategories',getCategories)
router.post('/add-address',verifyToken,addShippingAddress)
router.get('/getShippingAddress',verifyToken,getShippingAddress)
router.delete('/deleteShippingAddress',verifyToken,deleteShippingAddress)
router.put('/editShippingAddress',verifyToken,editShippingAddress)
router.post('/addToCart',verifyToken,addToCart)
router.get('/getCartItems',verifyToken,getCartItems)
router.delete('/removeItem',verifyToken,deleteFromCart)
router.get('/category-sort',categorySort)
router.get('/price-range',priceSort)
router.get('/sort-tag',tagSort)
router.get('/alpha-sort',alphaSort)
router.get('/search',searchProducts)
router.get('/chooseAddress',chooseShippingAddress)
router.post('/placeOrder',verifyToken,placeOrder)

export default router
