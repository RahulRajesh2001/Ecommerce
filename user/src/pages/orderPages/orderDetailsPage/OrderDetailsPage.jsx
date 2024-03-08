import React from 'react'
import Navbar from '../../../components/navbar/Navbar'
import BottomBar from '../../../components/bottombar/BottomBar'
import SideBar from '../../../components/sidebarDashboard/SideBar.jsx'
import Footer from '../../../components/footer/Footer'
import { FaPlus } from 'react-icons/fa6'
import FilledButton from '../../../components/buttons/filledbutton/FilledButton.jsx'
import { MdBorderLeft } from "react-icons/md";

const OrderDetailsPage = () => {
  return (
    <div>
      <Navbar />
      <BottomBar />
      <div className='h-screen flex items-center justify-evenly'>
        <SideBar />
        <div className='h-[700px] w-[70%] rounded-md flex flex-col items-center border'>
          <div className='w-[100%] h-[60px] flex items-center justify-around border-b '>
            <div className='text-[16px] font-Playfair font-semibold '>
              ORDER DETAILS
            </div>
            <div className='flex gap-10'>
              <div className='flex gap-2 justify-center items-center cursor-pointer'>
                <div className='text-[12px] font-Playfair text-[#FA8232] font-semibold'>
                  Leave a Rating
                </div>
                <FaPlus className='text-[10px] text-[#FA8232] mt-1 font-bold' />
              </div>
              <div className='flex gap-2 justify-center items-center cursor-pointer'>
                <FilledButton
                  className='text-[12px] font-Playfair text-[#FA8232]'
                  value={'CANCEL ORDER'}
                  w={'100px'}
                />
              </div>
              <div className='flex gap-2 justify-center items-center cursor-pointer'>
                <FilledButton
                  className='text-[12px] font-Playfair text-[#FA8232]'
                  value={'RETURN ORDER'}
                  w={'100px'}
                />
              </div>
            </div>
          </div>
          {/*order section one */}
            <div className='w-[95%] h-[100px] bg-[#FDFAE7] border  mt-4 rounded-md flex items-center justify-between p-10'>
                <div className='flex flex-col'>
                    <div className='text-[#191C1F] text-[20px] font-semibold'>#96459761</div>
                    <div className='flex gap-2'>
                    <div className='text-[#475156] font-semibold'>4 Products</div>
                    <div className='text-[#475156] font-semibold'>.</div>
                    <div className='text-[#475156] font-semibold'>Order Placed in 17 Jan, 2021 at 7:32 PM</div>
                    </div>
                </div>

                <div className='text-[#2DA5F3] font-semibold text-[25px]'>₹1199.00</div>
            </div>
            {/*order section two */}
              <div className='w-[100%] ml-20 mt-4 flex gap-2'>
              <div className='text-[#475156] font-semibold text-[14px]'>Order expected arrival </div>
              <div className='text-[#191C1F] font-semibold text-[15px]'>23 Jan, 2021</div>
              </div>

            {/*order section three */}
            <div className='bg-red-300 h-[50px] w-[80%] mt-5'>
                        <div className='flex justify-center items-center'>
                            <div className='w-[24%] h-[10px] bg-yellow-300'></div>
                            <div className=''>
                                <div>Order Placed</div>
                                <MdBorderLeft />
                            </div>
                        </div>
            </div>
       

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default OrderDetailsPage
