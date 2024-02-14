import React from 'react'
import phoneimage from '../../assets/phoneimage.png'
import { FaStar } from 'react-icons/fa6'

const ShopCard = () => {
  return (
    <div className=' w-[150px] h-[220px] border px-[5px] py-[5px] mt-4 ml-2'>
      {/*Uppser side */}
      <div>
        <img src={phoneimage} alt='' />
      </div>
      {/*bottom side */}
      <div className='flex justify-start items-center gap-1 mt-2'>
        <div className='flex'>
          <FaStar className='text-[#FA8232] text-[16px]' />
          <FaStar className='text-[#FA8232] text-[16px]' />
          <FaStar className='text-[#FA8232] text-[16px]' />
          <FaStar className='text-[#FA8232] text-[16px]' />
          <FaStar className='text-[#FA8232] text-[16px]' />
        </div>
        <div className='text-[#77878F] text-[13px]'>(738)</div>
      </div>
      <div>
        <div className='text-[#191C1F] text-[12px]'>TONZO T6 True Wireless</div>
        <div className='text-[#191C1F] text-[12px]'>Earbuds Bluetooth....</div>
      </div>
      <div className='text-[#2DA5F3] font-semibold text-[14px] mt-2'>₹70</div>
    </div>
  )
}

export default ShopCard
