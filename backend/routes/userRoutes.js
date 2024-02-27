import express from 'express'
const router=express.Router()
import { OTPGeneration, login, otpVerification, register} from '../controllers/userControllers.js'
import { getProductDetails, getProducts } from '../controllers/productControllers.js';


router.post('/login',login)
router.post('/register',register);
router.post('/otp-generation', OTPGeneration); 
router.post('/otp-verify',otpVerification)
router.get('/getProducts',getProducts)
router.get('/getProductDetails',getProductDetails)



export default router