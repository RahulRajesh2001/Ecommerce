import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import HomePage from './pages/homepage/HomePage';
import LoginSignupPage from './pages/loginsignupPage/LoginSignupPage';
import EmailVerificationPage from './pages/emailverification/EmailVerificationPage';
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import ShopPage from './pages/shopPage/ShopPage';



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
          <Route/>
        </Route>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/loginSignup' element={<LoginSignupPage />} />
        <Route path='/email-verification' element={<EmailVerificationPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default NeomWebsite;
