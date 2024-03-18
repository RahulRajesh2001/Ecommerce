import React from 'react'
import OfferBar from '../../components/offerbar/OfferBar'
import Navbar from '../../components/navbar/Navbar'
import BottomBar from '../../components/bottombar/BottomBar'
import Footer from '../../components/footer/Footer'
import ShopCard from '../../components/shopcard/ShopCard'


const WishListPage = () => {
  return (
    <div>
      <OfferBar/>
      <Navbar/>
      <BottomBar/>
      <div className='h-screen'>
        <div className='font-Playfair font-bold text-[25px] ml-10  pt-10'>Wishlist</div>
        
      </div>

      <Footer/>
    </div>
  )
}

export default WishListPage