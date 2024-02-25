import express from 'express'
import { DeleteCategory, addCategory, addProduct, addProductVariant, getAllCategories, getAllProducts } from '../controllers/productControllers.js'
import { AdminLogin, BlockUnblockUser, getAllUsers } from '../controllers/userControllers.js'
const router=express.Router()


router.post('/addProduct',addProduct)
router.post('/addProductVarient',addProductVariant)
router.post('/adminlogin',AdminLogin)
router.get('/getUsers',getAllUsers);
router.get('/getAllProducts',getAllProducts)
router.get('/blockUnblock',BlockUnblockUser);
router.post('/add-category',addCategory)
router.get('/categories',getAllCategories);
router.get('/deleteCategory',DeleteCategory)

export default router