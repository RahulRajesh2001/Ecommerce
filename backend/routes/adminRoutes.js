import express from 'express'
import { AdminLogin } from '../controllers/adminController/authController.js'
import {verifyAdminToken} from '../utils/authMiddleware.js'
import {
  BlockUnblockUser,
  getAllUsers,
} from '../controllers/adminController/userController.js'
import {
  DeleteCategory,
  EditCategory,
  addBaseProduct,
  addCategory,
  addProductVariant,
  deleteBaseProducts,
  deleteVariant,
  editBaseProduct,
  editProductVariant,
  getAllCategories,
  getBaseProducts,
  getProductVarients,
} from '../controllers/adminController/productController.js'

const router = express.Router() 

router.post('/adminlogin', AdminLogin)
router.get('/getUsers',verifyAdminToken, getAllUsers)
router.get('/blockUnblock',verifyAdminToken, BlockUnblockUser)
router.post('/addBaseProduct',verifyAdminToken, addBaseProduct)
router.get('/getBaseProducts',verifyAdminToken,getBaseProducts)
router.post('/addProductVarient',verifyAdminToken, addProductVariant)
router.get("/productVarients",verifyAdminToken,getProductVarients)
router.post('/add-category',verifyAdminToken, addCategory)
router.get('/categories', verifyAdminToken,getAllCategories)
router.get('/deleteCategory',verifyAdminToken, DeleteCategory)
router.put('/editCategory/:id',verifyAdminToken, EditCategory)
router.get('/deleteBaseProduct',verifyAdminToken,deleteBaseProducts)
router.post('/editBaseProduct',verifyAdminToken, editBaseProduct)
router.get('/deleteVarient',verifyAdminToken, deleteVariant)
router.post('/editProductVarient',verifyAdminToken,editProductVariant)

export default router
