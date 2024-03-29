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
import SideBar from '../../components/sidebarDashboard/SideBar'


const WishListPage = () => {
  const dispatch=useDispatch()

  const [isAdded,setIsAdded]=useState(true)

  const isAddedToWishlist=(state)=>{
    setIsAdded(state)

    console.log(!state)
  }
  
  useEffect(()=>{
    try{
      axios.get(`${baseUrl}/api/v1/getWishlistFullProducts`).then((res)=>{
        console.log(res.data.products)
        dispatch(setWishlist(res.data.products))
      })
    }catch(err){
      console.log(err)
    }
  },[isAdded])

  return (
    <div>
      <OfferBar/>
      <Navbar/>
      <BottomBar/>
      <div className='h-screen w-[100%] flex justify-evenly items-center '>
        <SideBar/>
        <div className='h-[70%] w-[60%]  overflow-auto border rounded-lg'>
        <div className='font-Playfair font-bold text-[25px] bg-slate-300 border pl-10 '>Wishlist</div>
        <ShopCard isAddedToWishlist={isAddedToWishlist} shopPage={"wishlist"}/>
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default WishListPage