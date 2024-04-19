import React, { useEffect, useState } from 'react'
import ShopCard from '../../components/shopcard/ShopCard'
import axios from 'axios';
import { baseUrl } from '../../../baseUrl.js';


const FeaturedProducts = () => {
  const token = localStorage.getItem('userToken')

  //fetching featered products
  const [featuredProducts,setFeaturedProducts]=useState([])
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/featuredProducts`, {
        headers: {
          Authorization:token,
        },
      })
      .then((res) => {
        setFeaturedProducts(res?.data?.products)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
   
      <div className='flex gap-3'>
        {/*body*/}
        <div className='flex flex-col gap-2'>
          <div className='font-bold'>New Arrivals</div>
          <div className='flex flex-row  w-[800px]'>
            <ShopCard featuredProducts={featuredProducts}/>
          </div>
        </div>
      </div>
  )
}

export default FeaturedProducts
