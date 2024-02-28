import express from 'express';
import passport from 'passport';
import { OTPGeneration, login, otpVerification, register } from '../controllers/userControllers.js';
import { getProductDetails, getProducts } from '../controllers/productControllers.js';
import {verifyToken} from "../utils/authMiddleware.js"

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/otp-generation', OTPGeneration);
router.post('/otp-verify', otpVerification);
router.get('/getProducts',verifyToken, getProducts);
router.get('/getProductDetails',verifyToken,getProductDetails);

router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: "successfully Login in",
            user: req.user
        });
    } else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
});

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        error: true,
        message: "Login Failure"
    });
});

router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: 'http://localhost:5173/',
    failureRedirect: '/login/failed'
}));

router.get('/auth/google', passport.authenticate('google', ["profile", "email"]));

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("http://localhost:5173/");
});

export default router;
