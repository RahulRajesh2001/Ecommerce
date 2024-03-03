import React from 'react'
import { MdDashboard } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className='bg-red-100 w-[200px] h-[500px] flex flex-col justify-center items-center gap-5 '>
        <div className='flex gap-2 justify-center items-center'>
            <div><MdDashboard  className='font-semibold text-[#5F6C72] text-[15px]'/></div>
            <div className='font-semibold text-[#5F6C72] text-[16px]'>Dashboard</div>
        </div>
        <div className='flex gap-2 justify-center items-center'>
            <div><MdDashboard  className='font-semibold text-[#5F6C72] text-[15px]'/></div>
            <div className='font-semibold text-[#5F6C72] text-[16px]'>Dashboard</div>
        </div>
        <div className='flex gap-2 justify-center items-center'>
            <div><MdDashboard  className='font-semibold text-[#5F6C72] text-[15px]'/></div>
            <div className='font-semibold text-[#5F6C72] text-[16px]'>Dashboard</div>
        </div>
        <div className='flex gap-2 justify-center items-center'>
            <div><MdDashboard  className='font-semibold text-[#5F6C72] text-[15px]'/></div>
            <div className='font-semibold text-[#5F6C72] text-[16px]'>Dashboard</div>
        </div>
        <div className='flex gap-2 justify-center items-center'>
            <div><MdDashboard  className='font-semibold text-[#5F6C72] text-[15px]'/></div>
            <div className='font-semibold text-[#5F6C72] text-[16px]'>Dashboard</div>
        </div>
        <div className='flex gap-2 justify-center items-center'>
            <div><MdDashboard  className='font-semibold text-[#5F6C72] text-[15px]'/></div>
            <div className='font-semibold text-[#5F6C72] text-[16px]'>Dashboard</div>
        </div>
        <Link to="/profile">
        <div className='flex gap-2 justify-center items-center'>
            <div><IoMdSettings  className='font-semibold text-[#5F6C72] text-[15px]'/></div>
            <div className='font-semibold text-[#5F6C72] text-[16px]'>Setting</div>
        </div>
        </Link>
        <div className='flex gap-2 justify-center items-center'>
            <div><MdDashboard  className='font-semibold text-[#5F6C72] text-[15px]'/></div>
            <div className='font-semibold text-[#5F6C72] text-[16px]'>Dashboard</div>
        </div>
        <div className='flex gap-2 justify-center items-center'>
            <div><MdDashboard  className='font-semibold text-[#5F6C72] text-[15px]'/></div>
            <div className='font-semibold text-[#5F6C72] text-[16px]'>Dashboard</div>
        </div>
        <div className='flex gap-2 justify-center items-center'>
            <div><MdDashboard  className='font-semibold text-[#5F6C72] text-[15px]'/></div>
            <div className='font-semibold text-[#5F6C72] text-[16px]'>Dashboard</div>
        </div>
    </div>
  )
}

export default SideBar