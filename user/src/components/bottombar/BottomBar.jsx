import React from 'react'
import { Link } from 'react-router-dom'

const BottomBar = () => {
  const Logout=()=>{
    localStorage.removeItem('userToken')
  }
  return (
    <div className='h-[50px] flex items-center justify-end border-b shadow-md'>
      <div className='flex gap-5 justify-end items-center mr-10 '>
        <Link to={"/dashboard"}>
          <div className='font-Playfair text-[#5F6C72] hover:text-[#1c1c1c]'>Dashboard</div>
        </Link>
        <Link to={"/profile"}>
          <div className='font-Playfair text-[#5F6C72] hover:text-[#1c1c1c]'>Profile</div>
        </Link>
        <Link to={'/orderHistory'}>
          <div className='font-Playfair text-[#5F6C72] hover:text-[#1c1c1c]'>Orders</div>
        </Link>
        <Link to={"/wishlist"}>
          <div className='font-Playfair text-[#5F6C72] hover:text-[#1c1c1c]'>Wishlist</div>
        </Link>
        <Link to={"/cart"}>
          <div className='font-Playfair text-[#5F6C72] hover:text-[#1c1c1c]'>Cart</div>
        </Link>
        <Link to={'/wallet'}>
          <div className='font-Playfair text-[#5F6C72] hover:text-[#1c1c1c]'>Wallet</div>
        </Link>
        <Link onClick={()=>Logout()}>
          <div className='font-Playfair text-[#5F6C72] hover:text-[#1c1c1c]'>Logout</div>
        </Link>
      </div>
    </div>
  )
}

export default BottomBar
