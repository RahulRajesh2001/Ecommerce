import React from 'react'
import Dashboard from './pages/dashboard/Dashboard'
import ProductListingPage from './pages/productlistingpage/ProductListingPage';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import AddProductPage from './pages/addproductpage/AddProductPage';


const QuilonWebsite = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<AddProductPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default QuilonWebsite