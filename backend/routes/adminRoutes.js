import express from 'express'
import { DeleteCategory, EditCategory, addBaseProduct, addCategory, addProductVariant, getAllCategories, getAllProducts, getFullProducts } from '../controllers/productControllers.js'
import { AdminLogin, BlockUnblockUser, getAllUsers } from '../controllers/userControllers.js'
const router=express.Router()


router.post('/addBaseProduct',addBaseProduct)
router.post('/addProductVarient',addProductVariant)
router.post('/adminlogin',AdminLogin)
router.get('/getUsers',getAllUsers);
router.get('/getAllProducts',getAllProducts)
router.get('/blockUnblock',BlockUnblockUser);
router.post('/add-category',addCategory)
router.get('/categories',getAllCategories);
router.get('/deleteCategory',DeleteCategory)
router.put('/editCategory/:id',EditCategory)
router.get('/fullProducts',getFullProducts)

export default router