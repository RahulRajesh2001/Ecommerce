import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import BottomBar from '../../../components/bottombar/BottomBar'
import SideBar from '../../../components/sidebarDashboard/SideBar.jsx'
import Footer from '../../../components/footer/Footer'
import { FaPlus } from 'react-icons/fa6'
import FilledButton from '../../../components/buttons/filledbutton/FilledButton.jsx'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { baseUrl } from '../../../../baseUrl.js'
import { useNavigate } from 'react-router-dom'

const OrderDetailsPage = () => {
  const navigate=useNavigate()
  const orderId=useSelector((state)=>state.order.orderId)
const [id,setId]=useState(orderId)
const [order,setOrder]=useState([])
const [status,setStatus]=useState('')

const token = localStorage.getItem('userToken')
useEffect(() => {
  axios
    .get(`${baseUrl}/api/v1/orderDetails`, {
      params:{id},
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      setOrder(res.data.order)
      setStatus(res.data.order.orderedItems[0].orderStatus)
      console.log(res.data.order.orderedItems[0].orderStatus,"stauts")
    })
    .catch((err) => {
      console.log(err)
    })
}, [])


//cancel order
function cancelOrderHandle(){
  axios
  .get(`${baseUrl}/api/v1/cancelOrder`, {
    params:{id},
    headers: {
      Authorization: token,
    },
  })
  .then((res) => {
    alert(res.data.message)
    navigate('/orderHistory')
  })
  .catch((err) => {
    console.log(err)
  })
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
              {status == "Cancelled" ? '' :<button onClick={cancelOrderHandle} className='flex gap-2 justify-center items-center cursor-pointer text-[#ffff] w-[100px] rounded-sm bg-[#FA8232]'>
                    Cancel
              </button>}
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

            {/*ordered product*/}

            <div className=' h-[400px] w-[100%] overflow-auto flex flex-col gap-4'>
              <div className='text-[20px] ml-10'>Products (02)</div>
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


          {/* {order.map((item) => (
  <div
    key={item._id}
    className='w-[100%] flex justify-evenly items-center bg-[#FFFFFF] h-[80px]'
  >
    <div>{''}</div>

    <div className='w-[40%] flex justify-evenly items-center '>
      <img src={''} className='h-[50px] w-[50px]' />
      <div className='w-[50%] text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
        {'nme'}
      </div>
    </div>
    <div className='w-[70%]  flex justify-evenly items-center'>
      <div className='text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
        {'hehe'}
      </div>
      <div className='text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
        <div className='text-[15px] font-semibold cursor-pointer mt-1'>
          {''}

        </div>
      </div>
      <div className='text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
        {'subtotal'}
      </div>
    </div>
  </div>
))} */}




            </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default OrderDetailsPage
