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
    <div className='bg-green-400 w-[80%] '>
      <div className='  h-[410px]  flex justify-center items-center  gap-1 mt-5 mb-5 bg-red-500'>
        

<div id="default-carousel" className="relative w-full" data-carousel="slide">
    <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img src={banner1} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
        </div>

        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img src={banner2} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
        </div>

        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img src={banner1} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
        </div>

        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img src={banner1} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
        </div>

        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img src={banner1} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
        </div>



    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
    </div>

    <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns={banner1} fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span className="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns={banner1} fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Next</span>
        </span>
    </button>
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
