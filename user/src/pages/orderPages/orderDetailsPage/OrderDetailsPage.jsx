import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import BottomBar from '../../../components/bottombar/BottomBar'
import SideBar from '../../../components/sidebarDashboard/SideBar.jsx'
import Footer from '../../../components/footer/Footer'
import { FaPlus } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { baseUrl } from '../../../../baseUrl.js'
import { Link, useNavigate } from 'react-router-dom'

const OrderDetailsPage = () => {
  const navigate = useNavigate()
  const orderId = useSelector((state) => state.order.orderId)
  const [id, setId] = useState(orderId)
  const [order, setOrder] = useState([])
  const [address, setAddress] = useState({})
  const [status, setStatus] = useState('')

  const token = localStorage.getItem('userToken')
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/orderDetails`, {
        params: {id},
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setAddress(res.data.order.shippingAddress)
        setOrder(res.data.order.orderedItems)
        setStatus(res.data.order.orderedItems[0].orderStatus)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])


  // Cancel order
function changeOrderStatus(orderStatus) {
  try {
    axios
      .put(`${baseUrl}/api/v1/changeOrderStatus`, 
        { Status: orderStatus },
        { params: { id },
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setStatus(res.data.order.orderedItems[0].orderStatus)
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    console.error(err);
  }
}



  const calculateTotalPrice = (orderedItems) => {
    let totalPrice = 0
    orderedItems.forEach((item) => {
      totalPrice += item.price
    })
    return totalPrice
  }

  return (
    <div>
      <Navbar />
      <BottomBar />
      <div className='h-screen flex items-center justify-evenly'>
        <SideBar />
        <div className='h-[700px] w-[70%] rounded-md flex flex-col items-center border gap-4'>
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
              {status == 'Cancelled' ? (
                ''
              ) : (
                <button
                  onClick={() => changeOrderStatus('Cancelled')}
                  className='flex gap-2 justify-center items-center cursor-pointer text-[#ffff] w-[100px] h-[40px] font-bold rounded-lg bg-[#FA8232] '
                >
                  Cancel
                </button>
              )}
              {status == 'Returned' ? (
                ''
              ) : (
                <button
                  onClick={()=>changeOrderStatus('Returned')}
                  className='flex gap-2 justify-center items-center cursor-pointer text-[#ffff] w-[100px] h-[40px] font-bold rounded-lg bg-[#FA8232]'
                >
                  Return
                </button>
              )}
              <Link to={"/invoice"}> 
              <button
                  className='flex gap-2 justify-center items-center cursor-pointer text-[#ffff] w-[100px] h-[40px] font-bold rounded-lg bg-green-500'
                >
                  Invoice
                </button>
              </Link>
            </div>
          </div>
          {/*order section one */}
          <div className='w-[95%] h-[100px] bg-[#FDFAE7] border  mt-4 rounded-md flex items-center justify-between p-10'>
            <div className='flex flex-col gap-3'>
              <div className='text-[#191C1F] text-[20px] font-semibold'>
                {address.fullName}
              </div>
              <div className='flex gap-2'>
                <div className='text-[#475156] font-semibold'>
                  {address.address}
                </div>
              </div>
            </div>
            <div className='text-[#2DA5F3] font-semibold text-[20px]'>
              {address.pincode}
            </div>
          </div>
          {/*ordered product*/}

          <div className=' h-[400px] w-[100%] overflow-auto flex flex-col gap-4'>
            <div className='text-[20px] ml-10'>Products ({order.length})</div>
            <div className='h-[50px] bg-[#F2F4F5] w-[100%] flex'>
              {/*second section left side */}
              <div className='w-[40%] flex justify-center items-center'>
                <div className='text-[#475156] text-[15px] font-Playfair'>
                  PRODUCTS
                </div>
              </div>
              {/*second section right side */}
              <div className='w-[60%] flex justify-evenly items-center'>
                <div className='text-[#475156] text-[15px] font-Playfair'>
                  PRICE
                </div>
                <div className='text-[#475156] text-[15px] font-Playfair'>
                  QUANTITY
                </div>
                <div className='text-[#475156] text-[15px] font-Playfair'>
                  SUB-TOTAL
                </div>
              </div>
            </div>

            {order.map((item) => (
              <div
                key={''}
                className='w-[100%] flex justify-evenly items-center bg-[#FFFFFF] h-[80px]'
              >
                <div>{''}</div>

                <div className='w-[40%] flex justify-evenly items-center '>
                  <img src={''} className='h-[50px] w-[50px]' />
                  <div className='w-[50%] text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
                    {item.product}
                  </div>
                </div>
                <div className='w-[70%]  flex justify-evenly items-center'>
                  <div className='text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
                    {item.price}
                  </div>
                  <div className='text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
                    <div className='text-[15px] font-semibold cursor-pointer mt-1'>
                      {item.quantity}
                    </div>
                  </div>
                  <div className='text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
                    {item.quantity * item.price}
                  </div>
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

export default OrderDetailsPage
