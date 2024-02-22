import React from 'react'

const SideBar = () => {
  return (
    <div className='h-screen w-[20%] bg-[#FFFFFF] flex flex-col gap-5 justify-start '>
      <div className='flex  items-center gap-4 mt-10  w-[60%] ml-[10%]'>
        <div className='rounded-full bg-[#B4BDC6] w-[10px] h-[10px]'></div>
        <div className='font-Playfair '>Dashboard</div>
      </div>
      <div className='flex  items-center gap-4 w-[60%] ml-[10%]'>
        <div className='rounded-full bg-[#B4BDC6] w-[10px] h-[10px]'></div>
        <div className='font-Playfair '>Customers</div>
      </div>
      <div className='flex  items-center gap-4 w-[60%] ml-[10%]'>
        <div className='rounded-full bg-[#B4BDC6] w-[10px] h-[10px]'></div>
        <div className='font-Playfair '>Products</div>
      </div>
      <div className='flex  items-center gap-4 w-[60%] ml-[10%]'>
        <div className='rounded-full bg-[#B4BDC6] w-[10px] h-[10px]'></div>
        <div className='font-Playfair '>Orders</div>
      </div>
      <div className='flex  items-center gap-4 w-[60%] ml-[10%]'>
        <div className='rounded-full bg-[#B4BDC6] w-[10px] h-[10px]'></div>
        <div className='font-Playfair '>Cupons</div>
      </div>
      <div className='flex  items-center gap-4 w-[60%] ml-[10%]'>
        <div className='rounded-full bg-[#B4BDC6] w-[10px] h-[10px]'></div>
        <div className='font-Playfair '>Offers</div>
      </div>
      <div className='flex  items-center gap-4 w-[60%] ml-[10%]'>
        <div className='rounded-full bg-[#B4BDC6] w-[10px] h-[10px]'></div>
        <div className='font-Playfair '>Logout</div>
      </div>
    </div>
  )
}

export default SideBar
