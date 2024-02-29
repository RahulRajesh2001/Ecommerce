import express from 'express'
import { DeleteCategory, EditCategory, addBaseProduct, addCategory, addProductVariant, deleteBaseProducts,deleteVariant, editBaseProduct, getAllCategories, getAllProducts, getFullProducts } from '../controllers/productControllers.js'
import { AdminLogin, BlockUnblockUser, getAllUsers } from '../controllers/userControllers.js'
import { verifyAdminToken } from '../utils/authMiddleware.js'
const router=express.Router()


router.post('/addBaseProduct',addBaseProduct)
router.post('/addProductVarient',addProductVariant)
router.post('/adminlogin',AdminLogin)
router.get('/getUsers',getAllUsers);
router.get('/getAllProducts',getAllProducts)
router.get('/blockUnblock',verifyAdminToken,BlockUnblockUser)
router.post('/add-category',addCategory)
router.get('/categories',getAllCategories)
router.get('/deleteCategory',DeleteCategory)
router.put('/editCategory/:id',EditCategory)
router.get('/fullProducts',verifyAdminToken,getFullProducts)
router.get('/deleteBaseProduct',verifyAdminToken,deleteBaseProducts)
router.put('/editBaseProduct',editBaseProduct)
router.get('/deleteVarient',verifyAdminToken,deleteVariant)

export default router