import express from 'express';
import { OTPGeneration, login, otpRegeneration, otpVerification, register } from '../controllers/userControllers.js';
import { addReview, getProductDetails, getProducts, getReview } from '../controllers/productControllers.js';
import {verifyToken} from "../utils/authMiddleware.js"

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/otp-generation', OTPGeneration);
router.post('/otp-verify', otpVerification);
router.post('/otp-regeneration',otpRegeneration)
router.get('/getProducts',verifyToken,getProducts);
router.get('/getProductDetails',verifyToken, getProductDetails);
router.post('/add-review',addReview)
router.get('/get-review',getReview)

export default router;
