import express from 'express';
import { OTPGeneration, login, otpVerification, register } from '../controllers/userControllers.js';
import { getProductDetails, getProducts } from '../controllers/productControllers.js';
import {verifyToken} from "../utils/authMiddleware.js"

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/otp-generation', OTPGeneration);
router.post('/otp-verify', otpVerification);
router.get('/getProducts',getProducts);
router.get('/getProductDetails', getProductDetails);

export default router;
