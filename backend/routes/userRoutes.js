import express from 'express'
const router=express.Router()
import { OTPGeneration, login, otpVerification, register} from '../controllers/userControllers.js'


router.post('/login',login)
router.post('/register',register);
router.post('/otp-generation', OTPGeneration); 
router.post('/otp-verify',otpVerification)



export default router