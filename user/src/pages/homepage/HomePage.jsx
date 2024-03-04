import React, { useEffect } from 'react'
import OfferBar from '../../components/offerbar/OfferBar'
import Navbar from '../../components/navbar/Navbar'
import BottomBar from '../../components/bottombar/BottomBar'
import HomeCarosel from '../../components/homecarosel/HomeCarosel'
import Footer from '../../components/footer/Footer'
import CategoryBar from '../../components/categorybar/CategoryBar'
import FeaturedProducts from '../../components/featuredproducts/FeaturedProducts'
import { ToastContainer, toast } from 'react-toastify'
import { setFeaturedProduct } from '../../../redux/reducers/productSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { baseUrl } from '../../../baseUrl.js'


const HomePage = () => {
  const dispatch=useDispatch()

  const token = localStorage.getItem('userToken')
  useEffect(() => {
    console.log('this is token', token)
    axios
      .get(`${baseUrl}/api/v1/featuredProducts`, {
        headers: {
          Authorization:token,
        },
      })
      .then((res) => {
        console.log('featred',res)
        dispatch(setFeaturedProduct(res.data.products))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className='flex flex-col '>
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
