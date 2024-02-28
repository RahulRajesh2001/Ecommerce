import React from 'react'
import { PiMedalDuotone } from 'react-icons/pi'

const Description = ({productDetailsDescription}) => {
  return (
    <div>
        <div className='flex h-[340px] justify-center items-center'>
          {/*description*/}
          <div className='w-[50%] flex flex-col gap-3 '>
            <div className='text-[15px] font-semibold'>Description</div>
            <div className='text-[14px] text-[#5F6C72]'>{productDetailsDescription}
            </div>
          </div>

          <div className='bg-[#E4E7E9] h-[70%] w-[1px]'></div>
          {/*Features*/}
          <div className='w-[20%] flex flex-col gap-3  ml-5'>
            <div className='text-[15px] font-semibold '>Features</div>
            <div className='flex items-center gap-2'>
              <PiMedalDuotone className='text-[#FA8232]' />
              <div className='text-[13px]'>Free 1 Year Warranty</div>
            </div>
            <div className='flex items-center gap-2'>
              <PiMedalDuotone className='text-[#FA8232]' />
              <div className='text-[13px]'>Free 1 Year Warranty</div>
            </div>
            <div className='flex items-center gap-2'>
              <PiMedalDuotone className='text-[#FA8232]' />
              <div className='text-[13px]'>Free 1 Year Warranty</div>
            </div>
            <div className='flex items-center gap-2'>
              <PiMedalDuotone className='text-[#FA8232]' />
              <div className='text-[13px]'>Free 1 Year Warranty</div>
            </div>
          </div>
          <div className='bg-[#E4E7E9] h-[70%] w-[1px]'></div>
          {/*Shipping information*/}

          <div className='w-[20%] flex flex-col gap-3 ml-5 '>
            <div className='text-[15px] font-semibold '>
              Shipping Information
            </div>
            <div className='flex gap-2'>
              <div className='text-[12px] font-semibold'>Courier:</div>
              <div className='text-[#5F6C72] text-[11px]'>
                2-4 days, free shipping
              </div>
            </div>
            <div className='flex gap-2'>
              <div className='text-[12px] font-semibold'>Courier:</div>
              <div className='text-[#5F6C72] text-[11px]'>
                2-4 days, free shipping
              </div>
            </div>
            <div className='flex gap-2'>
              <div className='text-[12px] font-semibold'>Courier:</div>
              <div className='text-[#5F6C72] text-[11px]'>
                2-4 days, free shipping
              </div>
            </div>
            <div className='flex gap-2'>
              <div className='text-[12px] font-semibold'>Courier:</div>
              <div className='text-[#5F6C72] text-[11px]'>
                2-4 days, free shipping
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Description