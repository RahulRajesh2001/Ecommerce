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
  getAllCategories,
  getBaseProducts,
  getProductVarients,
} from '../controllers/adminController/productController.js'

const router = express.Router()

router.post('/adminlogin', AdminLogin)
router.get('/getUsers',verifyAdminToken, getAllUsers)
router.get('/blockUnblock', BlockUnblockUser)
router.post('/addBaseProduct', addBaseProduct)
router.get('/getBaseProducts',getBaseProducts)
router.post('/addProductVarient', addProductVariant)
router.get("/productVarients",getProductVarients)
router.post('/add-category', addCategory)
router.get('/categories', getAllCategories)
router.get('/deleteCategory', DeleteCategory)
router.put('/editCategory/:id', EditCategory)
router.get('/deleteBaseProduct', deleteBaseProducts)
router.post('/editBaseProduct', editBaseProduct)
router.get('/deleteVarient', deleteVariant)

export default router
