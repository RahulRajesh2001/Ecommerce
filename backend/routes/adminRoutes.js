import express from 'express'
import { AdminLogin } from '../controllers/adminController/authController.js'
import { verifyAdminToken } from '../utils/authMiddleware.js'
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
import {
  editPaymentStatus,
  getAllOrders,
} from '../controllers/adminController/orderController.js'
import {
  addOffer,
  createOffer,
  deleteAddedOffer,
  deleteOffer,
  getAddedOffers,
  getAllOffers,
} from '../controllers/adminController/offerController.js'

const router = express.Router()

router.post('/adminlogin', AdminLogin)
router.get('/getUsers', verifyAdminToken, getAllUsers)
router.get('/blockUnblock', verifyAdminToken, BlockUnblockUser)
router.post('/addBaseProduct', verifyAdminToken, addBaseProduct)
router.get('/getBaseProducts', verifyAdminToken, getBaseProducts)
router.post('/addProductVarient', verifyAdminToken, addProductVariant)
router.get('/productVarients', verifyAdminToken, getProductVarients)
router.post('/add-category', verifyAdminToken, addCategory)
router.get('/categories', verifyAdminToken, getAllCategories)
router.get('/deleteCategory', verifyAdminToken, DeleteCategory)
router.put('/editCategory/:id', verifyAdminToken, EditCategory)
router.get('/deleteBaseProduct', verifyAdminToken, deleteBaseProducts)
router.post('/editBaseProduct', verifyAdminToken, editBaseProduct)
router.get('/deleteVarient', verifyAdminToken, deleteVariant)
router.post('/editProductVarient', verifyAdminToken, editProductVariant)
router.get('/orders', verifyAdminToken, getAllOrders)
router.put('/editPaymentStatus/:orderId', verifyAdminToken, editPaymentStatus)
router.post('/createOffer', verifyAdminToken, createOffer)
router.get('/getAllOffers', verifyAdminToken, getAllOffers)
router.delete('/deleteOffer', verifyAdminToken, deleteOffer)
router.post('/addOffer', verifyAdminToken, addOffer)
router.get('/getAllAddedOffers', verifyAdminToken, getAddedOffers)
router.delete('/deleteAddedOffer',verifyAdminToken,deleteAddedOffer)

export default router
