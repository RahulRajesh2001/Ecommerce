import React from 'react'
import OfferBar from '../../components/offerbar/OfferBar'
import Navbar from '../../components/navbar/Navbar'
import BottomBar from '../../components/bottombar/BottomBar'
import HomeCarosel from '../../components/homecarosel/HomeCarosel'
import Footer from '../../components/footer/Footer'
import CategoryBar from '../../components/categorybar/CategoryBar'
import FeaturedProducts from '../../components/featuredproducts/FeaturedProducts'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const notify = (message) => toast(message)

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  if (isAuthenticated == true) {
    notify('Login Successfull')
  }
  return (
    <div className='flex flex-col '>
      <ToastContainer/>
      <div className='vvsm:hidden md:block'>
        <OfferBar />
      </div>
      <Navbar />
      <BottomBar />
      <div className='w-[100%] flex justify-center items-center'>
        <HomeCarosel />
      </div>
      <div className='flex justify-center mb-5'>
        <CategoryBar />
      </div>
      <div className='flex justify-center mb-5'>
        <FeaturedProducts />
      </div>
      <Footer />
    </div>
  )
}

export default HomePage
