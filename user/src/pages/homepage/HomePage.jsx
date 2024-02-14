import React from 'react'
import OfferBar from '../../components/offerbar/OfferBar'
import Navbar from '../../components/navbar/Navbar'
import BottomBar from '../../components/bottombar/BottomBar'
import HomeCarosel from '../../components/homecarosel/HomeCarosel'
import Footer from '../../components/footer/Footer'
import CategoryBar from '../../components/categorybar/CategoryBar'
import FeaturedProducts from '../../components/featuredproducts/FeaturedProducts'

const HomePage = () => {
  return (
    <div className='flex flex-col '>
      <OfferBar />
      <Navbar />
      <BottomBar />
      <div className='w-[100%] flex justify-center items-center'>
        <HomeCarosel />
      </div>
      <div className='flex justify-center mb-5'>
      <CategoryBar/>
      </div>
      <div className='flex justify-center mb-5'>
        <FeaturedProducts/>
      </div>
      <Footer />

    </div>
  )
}

export default HomePage
