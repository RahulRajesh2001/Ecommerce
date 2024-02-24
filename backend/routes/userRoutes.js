import express from 'express'
const router=express.Router()
import {getAllUsers, login, register, sendOTP} from '../controllers/userControllers.js'
import { getAllProducts } from '../controllers/productControllers.js';

router.post('/login',login)
router.post('/register',register);
router.post('/send-otp',sendOTP);
router.get('/getUsers',getAllUsers);
router.get('/getAllProducts',getAllProducts)

export default router