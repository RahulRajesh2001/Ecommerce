import express from 'express'
const router=express.Router()
import {login, register, sendOTP} from '../controllers/userControllers.js'

router.post('/login',login)
router.post('/register',register);
router.post('/send-otp',sendOTP)

export default router