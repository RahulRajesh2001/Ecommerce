import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import HomePage from './pages/homepage/HomePage';
import LoginSignupPage from './pages/loginsignupPage/LoginSignupPage';
import EmailVerificationPage from './pages/emailverification/EmailVerificationPage';
import { Outlet } from "react-router-dom";
import ShopPage from './pages/shopPage/ShopPage';
import ProductDetailsPage from './pages/productDetailsPage/ProductDetailsPage';
import ProfilePage from './pages/profilepage/ProfilePage';
import  ResetPasswordPage from './pages/resetpasswordPage/ResetPasswordPage.jsx'
import EmailSubmissionForgetPass from './pages/emailSubmissionForgetPasswordPage/EmailSubmissionForgetPass.jsx';




const Protected = () => {
  const token = localStorage.getItem('userToken');
  return (
    token ? <Outlet /> : <Navigate to="/loginSignup" />
  );
};

const NeomWebsite = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Protected />}>
        <Route exact path='/shop' element={<ShopPage/>} />
        <Route exact path='/details' element={<ProductDetailsPage/>} />
        <Route exact path='/profile' element={<ProfilePage/>} />
          <Route/>
        </Route>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/loginSignup' element={<LoginSignupPage />} />
        <Route path='/email-verification' element={<EmailVerificationPage />} />
        <Route path='/forget-password' element={<EmailSubmissionForgetPass/>}/>
        <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default NeomWebsite;
