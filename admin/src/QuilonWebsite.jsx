import React from 'react'
import Dashboard from './pages/dashboard/Dashboard'
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import AddProductPage from './pages/addproductpage/AddProductPage';
import UserListingPage from './pages/userlisting/UserListingPage';
import LoginPage from './pages/LoginPage.jsx'
import CategoryList from './pages/categorylisting/CategoryList.jsx';
import AddCategoryPopUP from './pages/addCategoryPopup/AddCategoryPopUP.jsx';
import BaseProducts from './pages/baseproducts/BaseProducts.jsx';
import VarientListingPage from './pages/varientListingpage/VarientListingPage.jsx';


const QuilonWebsite = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/' element={<Dashboard/>}/>
    <Route path='/customers' element={<UserListingPage/>}/>
    <Route path='/add-product' element={<AddProductPage/>}/>
    <Route path='/categories' element={<CategoryList/>}/>
    <Route path='/add-category' element={<AddCategoryPopUP/>}/>
    <Route path='/base-products' element={<BaseProducts/>} />
    <Route path='/varients' element={<VarientListingPage/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default QuilonWebsite