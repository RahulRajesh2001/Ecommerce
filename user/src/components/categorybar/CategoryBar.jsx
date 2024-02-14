import React from 'react'
import phoneimage from '../../assets/phoneimage.png'

const CategoryBar = () => {
  return (
    <div className=' h-[250px]  flex flex-col '>
      <div className='flex justify-center mt-5 '>
        <div className='font-bold'>Shop with Categorys</div>
      </div>

      <div className='flex '>
        {/*Card */}
        <div className='flex flex-col justify-center items-center w-[150px] h-[170px] border px-[5px] py-[5px] mt-4 ml-2'>
          {/*Uppser side */}
          <div>
            <img src={phoneimage} alt='' />
          </div>
          {/*bottom side */}
          <div className='flex justify-start items-center gap-1 mt-2'></div>
          <div className='text-[#191C1F] text-[12px]'>SmartPhone</div>
        </div>
        {/*Card */}
        <div className='flex flex-col justify-center items-center w-[150px] h-[170px] border px-[5px] py-[5px] mt-4 ml-2'>
          {/*Uppser side */}
          <div>
            <img src={phoneimage} alt='' />
          </div>
          {/*bottom side */}
          <div className='flex justify-start items-center gap-1 mt-2'></div>
          <div className='text-[#191C1F] text-[12px]'>SmartPhone</div>
        </div>
        {/*Card */}
        <div className='flex flex-col justify-center items-center w-[150px] h-[170px] border px-[5px] py-[5px] mt-4 ml-2'>
          {/*Uppser side */}
          <div>
            <img src={phoneimage} alt='' />
          </div>
          {/*bottom side */}
          <div className='flex justify-start items-center gap-1 mt-2'></div>
          <div className='text-[#191C1F] text-[12px]'>SmartPhone</div>
        </div>
        {/*Card */}
        <div className='flex flex-col justify-center items-center w-[150px] h-[170px] border px-[5px] py-[5px] mt-4 ml-2'>
          {/*Uppser side */}
          <div>
            <img src={phoneimage} alt='' />
          </div>
          {/*bottom side */}
          <div className='flex justify-start items-center gap-1 mt-2'></div>
          <div className='text-[#191C1F] text-[12px]'>SmartPhone</div>
        </div>
        {/*Card */}
        <div className='flex flex-col justify-center items-center w-[150px] h-[170px] border px-[5px] py-[5px] mt-4 ml-2'>
          {/*Uppser side */}
          <div>
            <img src={phoneimage} alt='' />
          </div>
          {/*bottom side */}
          <div className='flex justify-start items-center gap-1 mt-2'></div>
          <div className='text-[#191C1F] text-[12px]'>SmartPhone</div>
        </div>
        {/*Card */}
        <div className='flex flex-col justify-center items-center w-[150px] h-[170px] border px-[5px] py-[5px] mt-4 ml-2'>
          {/*Uppser side */}
          <div>
            <img src={phoneimage} alt='' />
          </div>
          {/*bottom side */}
          <div className='flex justify-start items-center gap-1 mt-2'></div>
          <div className='text-[#191C1F] text-[12px]'>SmartPhone</div>
        </div>
      </div>
    </div>
  )
}

export default CategoryBar
