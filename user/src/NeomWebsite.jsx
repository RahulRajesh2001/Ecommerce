import React from 'react'
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import HomePage from './pages/homepage/HomePage'
import LoginSignupPage from './pages/loginsignupPage/LoginSignupPage'
const NeomWebsite = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/loginSignup' element={<LoginSignupPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default NeomWebsite
