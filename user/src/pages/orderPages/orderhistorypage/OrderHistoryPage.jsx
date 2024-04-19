import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import BottomBar from '../../../components/bottombar/BottomBar'
import SideBar from '../../../components/sidebarDashboard/SideBar.jsx'
import Footer from '../../../components/footer/Footer'
import { FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from '../../../../baseUrl.js'

const OrderHistoryPage = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])

  //fetching orders from backend
  const token = localStorage.getItem('userToken')
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/orders`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setOrders(res?.data?.orders)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  //for date
  function formatDate(dateString) {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Function to calculate total sale price for each item in the order
  const calculateTotalSalePriceForOrder = (order) => {
    let totalSalePrice = 0

    order.orderedItems.forEach((item) => {
      totalSalePrice += item.quantity * item.price
    })

    return totalSalePrice
  }

  //handle orderid
  const handleOrderId = (id) => {
    navigate(`/orderDetails/${id}`)
  }

  return (
    <div>
      <Navbar />
      <BottomBar />
      <div className='h-screen flex items-center justify-evenly'>
        <div className='h-[700px] w-[80%] rounded-md flex flex-col items-center border'>
          {/*order head */}
          <div className='w-[100%] h-[60px] flex items-center'>
            <div className='ml-[100px] text-[16px] font-Playfair font-semibold'>
              ORDER HISTORY
            </div>
          </div>
          {/*order section head */}
          <div className='flex h-[60px] w-[100%] justify-evenly items-center bg-[#F2F4F5]'>
            <div className='text-[15px] font-Playfair font-semibold text-[#475156]'>
              ORDER ID
            </div>
            <div className='text-[15px] font-Playfair font-semibold text-[#475156]'>
              DATE
            </div>
            <div className='text-[15px] font-Playfair font-semibold text-[#475156]'>
              TOTAL
            </div>
            <div className='text-[15px] font-Playfair font-semibold text-[#475156]'>
              ACTION
            </div>
          </div>
          <div className='overflow-auto w-[100%]'>
            {/*order one item  */}
            {orders.map((order) => (
              <div
                className='flex h-[60px] w-[100%] justify-evenly items-center'
                key={order._id}
              >
                <div className='text-[14px] font-Josefin font-semibold'>
                  {order._id}
                </div>
                <div className='text-[14px] font-Josefin font-semibold'>
                  {formatDate(order.orderDate)}
                </div>
                <div className='text-[14px] font-Josefin font-semibold'>
                  ₹ {calculateTotalSalePriceForOrder(order)} (
                  {order.orderedItems.length} Products)
                </div>
                <div className='flex '>
                  <div
                    onClick={() => handleOrderId(order._id)}
                    className='text-[14px] font-Josefin font-semibold text-[#2DA5F3] cursor-pointer'
                  >
                    View Details
                  </div>
                  <FaArrowRight className='text-[#2DA5F3]' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default OrderHistoryPage
