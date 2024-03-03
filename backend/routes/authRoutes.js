import express from 'express';
import googleAuth from '../controllers/userController/googleAuthController.js';

const router = express.Router();

router.get("/google",googleAuth) 


export default router;

