import express from 'express'
import { addProduct, addProductVariant, getAllProducts } from '../controllers/productControllers.js'
import { AdminLogin, BlockUnblockUser, getAllUsers } from '../controllers/userControllers.js'
const router=express.Router()


router.post('/addProduct',addProduct)
router.post('/addProductVarient',addProductVariant)
router.post('/adminlogin',AdminLogin)
router.get('/getUsers',getAllUsers);
router.get('/getAllProducts',getAllProducts)
router.get('/blockUnblock',BlockUnblockUser);

export default router