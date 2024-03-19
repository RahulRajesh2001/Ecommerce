import React from 'react'
import profile1 from '../../assets/profile1.jpg'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-[#FFFFFF] h-[50px] rounded-md flex justify-between items-center w-[98%] ml-2 mr-2 mt-2 mb-2'>
      <Link to={"/sales-report"}>
      <div className='font-Playfair font-semibold ml-10 w-[100px] h-[40px] bg-green-500 rounded-lg flex justify-center items-center text-[#ffff] cursor-pointer hover:scale-110 duration-300'>Sales Report</div>
      </Link>
      <div className='mr-[50px] flex  justify-center items-center gap-5'>
        <div className='font-Playfair text-[15px]'>Admin</div>
        <img src={profile1} alt='' className='rounded-full w-[40px] h-[40px]' />
      </div>
    </div>
  )
}

export default Navbar
