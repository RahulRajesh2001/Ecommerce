import React, { useEffect, useState } from 'react'
import OfferBar from '../../components/offerbar/OfferBar'
import Navbar from '../../components/navbar/Navbar'
import BottomBar from '../../components/bottombar/BottomBar'
import Footer from '../../components/footer/Footer'
import { IoIosSearch } from 'react-icons/io'
import ShopCard from '../../components/shopcard/ShopCard'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { baseUrl } from '../../../baseUrl.js'
import BrudCrumbs from '../../components/brudCrumbs/BrudCrumbs'

const ShopPage = () => {
  const [products,setProducts]=useState([])
  const token = localStorage.getItem('userToken')
  useEffect(() => {
    console.log('this is token', token)
    axios
      .get(`${baseUrl}/api/v1/getProducts`, {
        headers: {
          Authorization:token,
        },
      })
      .then((res) => {
        setProducts(res.data.products)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const breadcrumbs = [{ label: 'Home', path: '/' },{label:'Shop',path:'/shop'}];
  return (
    <div>
      <OfferBar />
      <Navbar />
      <BottomBar />
      <BrudCrumbs breadcrumbs={breadcrumbs}/>

      <div className='flex justify-center flex-wrap mt-5 mb-5 gap-5 '>
        <section className='flex flex-col gap-2'>
          {/*leftside */}
          <section className='w-[200px] flex flex-col gap-1'>
            <div className='text-[15px] font-semibold'>CATEGORY</div>
            {/*one Radio button*/}
            <div className='flex items-center  gap-2'>
              <input
                id='default-radio-1'
                type='radio'
                value=''
                name='default-radio'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              <div className='text-[#475156] text-[12px]'>Default radio</div>
            </div>
          </section>
          {/*Price range*/}
          <section className='w-[200px] flex flex-col gap-1'>
            <div className='text-[15px] font-semibold'>PRICE RANGE</div>
            {/*one Radio button*/}
            <div className='flex items-center  gap-2'>
              <input
                id='default-radio-1'
                type='radio'
                value=''
                name='default-radio'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              <div className='text-[#475156] text-[12px]'>Default radio</div>
            </div>
          </section>

          {/*Poppular brands*/}
          <section className=' flex flex-col gap-1'>
            <div className='text-[15px] font-semibold'>POPULAR BRANDS</div>
            {/*one Radio button*/}
            <div className='flex items-center  gap-2'>
              <input
                id='default-checkbox'
                type='checkbox'
                value=''
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              <div className='text-[#475156] text-[12px]'>Apple</div>
              <div className='flex items-center  gap-2'>
                <input
                  id='default-checkbox'
                  type='checkbox'
                  value=''
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                />
                <div className='text-[#475156] text-[12px]'>Apple</div>
              </div>
            </div>
            {/*one Radio button*/}
            <div className='flex items-center  gap-2'>
              <input
                id='default-checkbox'
                type='checkbox'
                value=''
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              <div className='text-[#475156] text-[12px]'>Apple</div>
              <div className='flex items-center  gap-2'>
                <input
                  id='default-checkbox'
                  type='checkbox'
                  value=''
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                />
                <div className='text-[#475156] text-[12px]'>Apple</div>
              </div>
            </div>
          </section>
        </section>
        {/*rightside */}
        <div className=' w-[60%] h-screen'>
          <div className='flex justify-between'>
            <div className='relative '>
              <input
                type='text'
                placeholder='search for anything....'
                className='outline-none border rounded-sm w-[350px] placeholder:text-[#77878F] placeholder:text-[12px]  px-5   h-[30px]'
              />
              <IoIosSearch className='absolute top-[7px] right-[10px] hover:cursor-pointer' />
            </div>
            <div className='flex gap-3 items-center'>
              <div className='font-semibold text-[12px]'>Sort by:</div>
              <div className='border w-[120px] h-[30px] flex justify-center items-center text-[#77878F] text-[12px]'>
                Most Popular
              </div>
            </div>
          </div>

          {/*filter bar*/}
          <div className='bg-[#F2F4F5] h-[40px] mt-4 flex justify-between'>
            <div></div>
            <div className='flex gap-2 items-center'>
              <div className='font-semibold text-[12px]'>65,867</div>
              <div className='text-[#5F6C72] mr-5 text-[12px]'>
                Results found
              </div>
            </div>
          </div>
          {/*cards*/}
          <div className='flex flex-wrap mt-5'>
            <ShopCard products={products}/>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ShopPage
