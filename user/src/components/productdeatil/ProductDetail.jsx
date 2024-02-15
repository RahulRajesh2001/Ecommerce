import React, { useState } from 'react'
import { PiMedalDuotone } from 'react-icons/pi'

const ProductDetail = () => {
  const [selectedTab, setSelectedTab] = useState('description')
  return (
    <div className=' w-[70%] h-[400px] mt-5 border border-[#E4E7E9]'>
      {/*Head part */}
      <div className='h-[60px]  border-b border-[#E4E7E9] flex justify-center gap-5'>
        <div
          className={`h-[60px] w-[150px]  border-[#FA8232] text-[14px] font-semibold flex justify-center items-center ${
            selectedTab === 'description' && 'border-b-4'
          }`}
          onClick={() => setSelectedTab('description')}
        >
          DESCRIPTION
        </div>
        <div
          className={`h-[60px] w-[200px]  border-[#FA8232] text-[14px] font-semibold flex justify-center items-center ${
            selectedTab === 'additional' && 'border-b-4'
          }`}
          onClick={() => setSelectedTab('additional')}
        >
          ADDITIONAL INFORMATION
        </div>
        <div
          className={`h-[60px] w-[150px]  border-[#FA8232] text-[14px] font-semibold flex justify-center items-center ${
            selectedTab === 'specification' && 'border-b-4'
          }`}
          onClick={() => setSelectedTab('specification')}
        >
          SPECIFICATION
        </div>
        <div
          className={`h-[60px] w-[150px]  border-[#FA8232] text-[14px] font-semibold flex justify-center items-center ${
            selectedTab === 'review' && 'border-b-4'
          }`}
          onClick={() => setSelectedTab('review')}
        >
          REVIEW
        </div>
      </div>
      {/*bottom part */}
      {selectedTab === 'description' && (
        <div className='flex h-[340px] justify-center items-center'>
          {/*description*/}
          <div className='w-[50%] flex flex-col gap-3 '>
            <div className='text-[15px] font-semibold'>Description</div>
            <div className='text-[14px] text-[#5F6C72]'>
              The most powerful MacBook Pro ever is here. With the blazing-fast
              M1 Pro or M1 Max chip — the first Apple silicon designed for pros
              — you get groundbreaking performance and amazing battery life. Add
              to that a stunning Liquid Retina XDR display, the best camera and
              audio ever in a Mac notebook, and all the ports you need. The
              first notebook of its kind, this MacBook Pro is a beast. M1 Pro
              takes the exceptional performance of the M1 architecture to a
              whole new level for pro users.
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
      )}
    </div>
  )
}

export default ProductDetail
