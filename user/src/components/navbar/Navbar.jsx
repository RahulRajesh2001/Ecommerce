import React, { useState } from 'react'
import { RiFacebookCircleFill } from 'react-icons/ri'
import { FaYoutube } from 'react-icons/fa'
import { AiFillInstagram } from 'react-icons/ai'
import { FaLinkedin } from 'react-icons/fa'
import { MdKeyboardArrowDown } from 'react-icons/md'
import NeomIcon from '../neomIcon/NeomIcon'
import { IoIosSearch } from 'react-icons/io'
import { FiShoppingCart } from 'react-icons/fi'
import { CiHeart } from 'react-icons/ci'
import { IoPersonOutline } from 'react-icons/io5'
import SignInModal from '../modals/signInModal/SignInModal'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const [isHovered,setIsHovered]=useState(false)
  


  const handleMouseEnter=()=>{
    setIsHovered(true);
  }

  const handleMouseLeave=()=>{
    setIsHovered(false)
  }

  return (
    <>
      <div>
        {/*top*/}
        <div className=''>
          
          <div className='bg-[#1B6392] w-[100%] h-[30px] border-b-[1px] border-[#77878F] flex vvsm:justify-end md:justify-evenly items-center '>
            {/*left*/}
            <div className='text-[#ffff] text-[12px] vvsm:hidden md:block '>
              welcome to NEOM online eCommerce store
            </div>
            {/*right*/}
            <div className='flex gap-5'>
              {/*icons part*/}
              <div className='flex gap-3 justify-center items-center'>
                <div className='text-[#ffff] text-[12px]'>Follow us : </div>
                <RiFacebookCircleFill className='text-[#ffff]' />
                <FaYoutube className='text-[#ffff]' />
                <AiFillInstagram className='text-[#ffff]' />
                <FaLinkedin className='text-[#ffff]' />
              </div>
              <div className='bg-[#77878F] h-[20px] w-[1px]'></div>
              {/*language part*/}
              <div className='flex justify-center items-center gap-1 text-[#ffff]'>
                <div className='text-[12px]'>Eng </div>
                <MdKeyboardArrowDown className='text-[#ffff]' />
                
              </div>
            </div>
          </div>
        </div>

        {/*bottom*/}
        <div className='bg-[#1B6392] w-[100%] h-[60px] flex justify-around items-center'>
          {/*bottom_left*/}
          <div className='flex items-center gap-2 '>
            <div>
              <NeomIcon />
            </div>
            
          </div>
          {/*bottom_center*/}
          <div className='relative '>
            <input
              type='text'
              placeholder='search for anything....'
              className='outline-none rounded-sm vvsm:w-[150px] sm:w-[300px] md:w-[450px] placeholder:text-[#77878F] placeholder:text-[12px]  px-5   h-[30px]'
            />
            <IoIosSearch className='vvsm:hidden sm:block absolute top-[7px] right-[10px] hover:cursor-pointer' />
          </div>
          {/*bottom_right*/}
          <div className='flex vvsm:gap-2 sm:gap-5 justify-items-center items-center'>
            <FiShoppingCart className='text-[#ffff] text-[15px] hover:cursor-pointer' />
            <CiHeart className='text-[#ffff] text-[20px] hover:cursor-pointer' />
            <Link to='/loginSignup'>
            <IoPersonOutline className='text-[#ffff] text-[16px] hover:cursor-pointer' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
            </Link>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
