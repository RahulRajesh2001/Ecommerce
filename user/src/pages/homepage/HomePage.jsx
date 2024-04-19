import React, { useEffect } from 'react'
import OfferBar from '../../components/offerbar/OfferBar'
import Navbar from '../../components/navbar/Navbar'
import BottomBar from '../../components/bottombar/BottomBar'
import HomeCarosel from '../../components/homecarosel/HomeCarosel'
import Footer from '../../components/footer/Footer'
import CategoryBar from '../../components/categorybar/CategoryBar'
import FeaturedProducts from '../../components/featuredproducts/FeaturedProducts'
import BrudCrumbs from '../../components/brudCrumbs/BrudCrumbs.jsx'


const HomePage = () => {
  const breadcrumbs = [{ label: 'Home', path: '/' }];



  return (
    <div className='flex flex-col '>
      
      <div className='vvsm:hidden md:block'>
        <OfferBar />
      </div>
      <Navbar />
      <BottomBar />
      <BrudCrumbs breadcrumbs={breadcrumbs} />
      <div className='w-[100%] flex justify-center items-center'>
        <HomeCarosel />
      </div>
      <div className='flex justify-center mb-5'>
        <FeaturedProducts />
      </div>
      <div className='flex justify-center mb-5'>
        <CategoryBar />
      </div>
      
      <Footer />
    </div>
  )
}

export default HomePage
