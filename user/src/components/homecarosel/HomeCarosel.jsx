import React from 'react'
import banner1 from '../../assets/banner1.png'
import banner2 from '../../assets/banner2.png'
import banner3 from '../../assets/banner3.png'
import { LuBox } from 'react-icons/lu'
import { CiTrophy } from 'react-icons/ci'
import { MdOutlinePayment } from 'react-icons/md'
import { FaHeadphones } from 'react-icons/fa6'

const HomeCarosel = () => {
  return (
    <div>
      <div className='  h-[410px]  flex justify-center items-center  gap-1 mt-5 mb-5'>
        {/*left part */}
        <div className=''>
          <img src={banner1} alt='' className='h-[405px]' />
        </div>
        {/*left part */}
        <div className='flex flex-col gap-1'>
          <div>
            <img src={banner2} alt='' className=' h-[200px]' />
          </div>
          <div>
            <img src={banner3} alt='' className=' h-[200px]' />
          </div>
        </div>
      </div>

      {/*Bottom Bar*/}
      <div className='  h-[70px] mb-5 rounded-sm flex items-center justify-evenly shadow-lg'>
        {/*first box*/}
        <div className=' w-[150px] h-[50px] flex justify-center items-center gap-3'>
          <div>
            <LuBox className='text-[25px]' />
          </div>
          <div className='flex flex-col justify-center items-center'>
            <div className='text-[#191C1F] text-[12px] font-semibold'>
              FASTED DELIVERY
            </div>
            <div className='text-[#5F6C72] text-[10px]'>Delivery in 24/H</div>
          </div>
        </div>
        <div className='w-[1px] h-[30px] bg-[#E4E7E9]'></div>
        {/*second box*/}
        <div className=' w-[150px] h-[50px] flex justify-center items-center gap-3'>
          <div>
            <CiTrophy className='text-[25px]' />
          </div>
          <div className='flex flex-col justify-center items-center'>
            <div className='text-[#191C1F] text-[12px] font-semibold'>
              24 HOURS RETURN
            </div>
            <div className='text-[#5F6C72] text-[10px]'>100% money back</div>
          </div>
        </div>
        <div className='w-[1px] h-[30px] bg-[#E4E7E9]'></div>
        {/*third box*/}
        <div className=' w-[150px] h-[50px] flex justify-center items-center gap-3'>
          <div>
            <MdOutlinePayment className='text-[25px]' />
          </div>
          <div className='flex flex-col justify-center items-center'>
            <div className='text-[#191C1F] text-[12px] font-semibold'>
              SECURE PAYMENT
            </div>
            <div className='text-[#5F6C72] text-[10px]'>Your money is safe</div>
          </div>
        </div>
        <div className='w-[1px] h-[30px] bg-[#E4E7E9]'></div>
        {/*fourth box*/}
        <div className=' w-[150px] h-[50px] flex justify-center items-center gap-3'>
          <div>
            <FaHeadphones className='text-[25px]' />
          </div>
          <div className='flex flex-col justify-center items-center'>
            <div className='text-[#191C1F] text-[12px] font-semibold'>
              SUPPORT 24/7
            </div>
            <div className='text-[#5F6C72] text-[10px]'>
              Live contact/message
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeCarosel
