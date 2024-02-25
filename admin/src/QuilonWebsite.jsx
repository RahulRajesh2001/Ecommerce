import React from 'react'
import Dashboard from './pages/dashboard/Dashboard'
import ProductListingPage from './pages/productlistingpage/ProductListingPage';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import AddProductPage from './pages/addproductpage/AddProductPage';
import UserListingPage from './pages/userlisting/UserListingPage';
import LoginPage from './pages/LoginPage.jsx'


const QuilonWebsite = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/' element={<Dashboard/>}/>
    <Route path='/customers' element={<UserListingPage/>}/>
    <Route path='/products' element={<ProductListingPage/>}/>
    <Route path='/add-product' element={<AddProductPage/>}/>
    
    </Routes>
    </BrowserRouter>
  )
}

export default QuilonWebsite