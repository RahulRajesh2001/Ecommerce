import express from 'express'
import { addProduct, addProductVariant } from '../controllers/productControllers.js'
const router=express.Router()


router.post('/addProduct',addProduct)
router.post('/addProductVarient',addProductVariant)

export default router