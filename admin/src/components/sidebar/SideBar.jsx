import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='h-screen w-[20%] bg-[#FFFFFF] flex flex-col gap-5 justify-start '>
      <div className='flex  items-center gap-4 mt-10  w-[60%] ml-[10%]'>
        <div className='rounded-full bg-[#B4BDC6] w-[10px] h-[10px]'></div>
        <Link to="/">
        <div className='font-Playfair '>Dashboard</div>
        </Link>
      </div>
      <div className='flex  items-center gap-4 w-[60%] ml-[10%]'>
        <div className='rounded-full bg-[#B4BDC6] w-[10px] h-[10px]'></div>
        <Link to="/customers">
        <div className='font-Playfair '>Customers</div>
        </Link>
      </div>
      <div className='flex  items-center gap-4 w-[60%] ml-[10%]'>
        <div className='rounded-full bg-[#B4BDC6] w-[10px] h-[10px]'></div>
        <Link to="/base-products">
        <div className='font-Playfair '>Products</div>
        </Link>
      </div>
      <div className='flex  items-center gap-4 w-[60%] ml-[10%]'>
        <div className='rounded-full bg-[#B4BDC6] w-[10px] h-[10px]'></div>
        <Link to="/categories">
        <div className='font-Playfair '>Categories</div>
        </Link>
      </div>
      <div className='flex  items-center gap-4 w-[60%] ml-[10%]'>
        <div className='rounded-full bg-[#B4BDC6] w-[10px] h-[10px]'></div>
        <Link to="/orders">
        <div className='font-Playfair '>Orders</div>
        </Link>
      </div>
      <div className='flex  items-center gap-4 w-[60%] ml-[10%]'>
        <div className='rounded-full bg-[#B4BDC6] w-[10px] h-[10px]'></div>
        <Link to="/offers">
        <div className='font-Playfair '>Offers</div>
        </Link>
      </div>
      <div className='flex  items-center gap-4 w-[60%] ml-[10%]'>
        <div className='rounded-full bg-[#B4BDC6] w-[10px] h-[10px]'></div>
        <div className='font-Playfair '>Logout</div>
      </div>
    </div>
  )
}

export default SideBar
