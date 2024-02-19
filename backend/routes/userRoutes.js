import express from 'express'
const router=express.Router()
import {login} from '../controllers/userControllers.js'

router.get('/login',login)

export default router