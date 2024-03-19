import React, { useEffect, useState } from 'react'
import OfferBar from '../../components/offerbar/OfferBar'
import Navbar from '../../components/navbar/Navbar'
import BottomBar from '../../components/bottombar/BottomBar'
import Footer from '../../components/footer/Footer'
import ShopCard from '../../components/shopcard/ShopCard'
import axios from 'axios'
import { baseUrl } from '../../../baseUrl'
import { useDispatch } from 'react-redux'
import { setWishlist } from '../../../redux/reducers/wishListSlice'


const WishListPage = () => {
  const dispatch=useDispatch()
  
  useEffect(()=>{
    try{
      axios.get(`${baseUrl}/api/v1/getWishlistFullProducts`).then((res)=>{
        console.log(res.data.products)
        dispatch(setWishlist(res.data.products))
      })
    }catch(err){
      console.log(err)
    }
  },[])

  return (
    <div>
      <OfferBar/>
      <Navbar/>
      <BottomBar/>
      <div className='h-screen'>
        <div className='font-Playfair font-bold text-[25px] ml-10  pt-10'>Wishlist</div>
        <ShopCard shopPage={"wishlist"}/>
      </div>

      <Footer/>
    </div>
  )
}

export default WishListPage