import React from 'react';
import Navbar from '../../../components/navbar/Navbar';
import BottomBar from '../../../components/bottombar/BottomBar';
import SideBar from '../../../components/sidebarDashboard/SideBar.jsx';
import Footer from '../../../components/footer/Footer';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const OrderHistoryPage = () => {
  return (
    <div>
      <Navbar />
      <BottomBar />
      <div className='h-screen flex items-center justify-evenly'>
        <SideBar />
        <div className='h-[700px] w-[70%] rounded-md flex flex-col items-center border'>
          {/*order head */}
          <div className='w-[100%] h-[60px] flex items-center'>
            <div className='ml-[100px] text-[16px] font-Playfair font-semibold'>ORDER HISTORY</div>
          </div>
          {/*order section head */}
          <div className='flex h-[60px] w-[100%] justify-evenly items-center bg-[#F2F4F5]'>
            <div className='text-[15px] font-Playfair font-semibold text-[#475156]'>ORDER ID</div>
            <div className='text-[15px] font-Playfair font-semibold text-[#475156]'>STATUS</div>
            <div className='text-[15px] font-Playfair font-semibold text-[#475156]'>DATE</div>
            <div className='text-[15px] font-Playfair font-semibold text-[#475156]'>TOTAL</div>
            <div className='text-[15px] font-Playfair font-semibold text-[#475156]'>ACTION</div>
          </div>
          <div className='overflow-auto w-[100%]'>
            {/*order one item  */}
            <div className='flex h-[60px] w-[100%] justify-evenly items-center '>
              <div className='text-[14px] font-Josefin font-semibold'>#96459761</div>
              <div className='text-[14px] font-Josefin font-semibold text-[#2DB224]'>COMPLETED</div>
              <div className='text-[14px] font-Josefin font-semibold'>Dec 7, 2019 23:26</div>
              <div className='text-[14px] font-Josefin font-semibold'>$70 (4 Products)</div>
              <div className='flex '>
                <Link to="/orderDetails" className='flex gap-3   justify-center items-center'>
                  <div className='text-[14px] font-Josefin font-semibold text-[#2DA5F3]'>View Details</div>
                  <FaArrowRight className='text-[#2DA5F3]' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderHistoryPage;
