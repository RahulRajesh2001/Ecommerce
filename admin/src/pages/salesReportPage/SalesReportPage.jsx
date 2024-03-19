import React, { useEffect, useState } from 'react'
import SideBar from '../../components/sidebar/SideBar'
import axios from 'axios'
import { baseUrl } from '../../../baseURL'


const SalesReportPage = () => {
    const token = localStorage.getItem('adminLogin');
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/v1/admin/orders`, {
                    headers: {
                        Authorization: token,
                    },
                });
                setOrders(response.data.orders);
                console.log(response.data.orders);
            } catch (error) {
                console.log(error);
            }
        };

        fetchOrders();
    }, [token]);

    //single day sales
    const handleSingleDay=()=>{
        const currentDate = new Date().toLocaleDateString(); 
        console.log(currentDate);
    }

  return (
    <div className='bg-[#F5F5F9] flex w-[100%]'>
       <SideBar/>
        <div className='w-[100%] h-screen'>
            <div className='h-[60px] w-full rounded-lg mt-1 flex justify-end  '>
                <div className='w-[30%] flex justify-between items-center mr-10'>
                <button onClick={()=>handleSingleDay()} className='font-Playfair font-semibold  w-[100px] h-[40px] bg-green-500 rounded-lg flex justify-center items-center text-[#ffff] cursor-pointer hover:scale-110 duration-300'>Day</button>
                <button className='font-Playfair font-semibold  w-[100px] h-[40px] bg-green-500 rounded-lg flex justify-center items-center text-[#ffff] cursor-pointer hover:scale-110 duration-300'>Week</button>
                <button className='font-Playfair font-semibold  w-[100px] h-[40px] bg-green-500 rounded-lg flex justify-center items-center text-[#ffff] cursor-pointer hover:scale-110 duration-300'>Month</button>
                <button className='font-Playfair font-semibold  w-[100px] h-[40px] bg-green-500 rounded-lg flex justify-center items-center text-[#ffff] cursor-pointer hover:scale-110 duration-300'>Year</button>
                </div>
            </div>
            <div className='h-[700px] w-[100%] mt-2 rounded-lg flex flex-col justify-center items-center border bg-[#fff] gap-4'>
                <div className='font-Playfair text-[20px] font-semibold'>Sales Report</div>
                <div className='w-[90%] h-[50px] bg-[#F5F5F9] rounded-lg border flex justify-around items-center'>
                    <div className='font-Playfair font-semibold'>Duration</div>
                    <div className='font-Playfair font-semibold'>Number Of Items</div>
                    <div className='font-Playfair font-semibold'>Total Price</div>
                </div>
                <div className='w-[90%] h-[60px] bg-[#F5F5F9] rounded-lg border flex justify-around items-center'>
                    <div className='font-Playfair font-semibold'>Duration</div>
                    <div className='font-Playfair font-semibold'>Number Of Items</div>
                    <div className='font-Playfair font-semibold'>Total Price</div>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default SalesReportPage