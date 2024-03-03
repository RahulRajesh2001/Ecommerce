import express from 'express'
import {verifyToken} from '../utils/authMiddleware.js'
import {
  OTPGeneration,
  login,
  otpRegeneration,
  otpVerification,
  register,
} from '../controllers/userController/authController.js'
import {
  addReview,
  getFeaturedProducts,
  getProductDetails,
  getProducts,
  getReview,
} from '../controllers/userController/productController.js'
import { editUser, getUser } from '../controllers/userController/userController.js'

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

export default router
