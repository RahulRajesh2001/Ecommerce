import React from 'react'
import Dashboard from './pages/dashboard/Dashboard'
import ProductListingPage from './pages/productlistingpage/ProductListingPage';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";


const QuilonWebsite = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<ProductListingPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default QuilonWebsite