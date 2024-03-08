import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import BottomBar from '../../../components/bottombar/BottomBar'
import Footer from '../../../components/footer/Footer'
import { IoMdRemoveCircleOutline } from 'react-icons/io'
import headphone1 from '../../../assets/headphone1.png'
import axios from 'axios'
import { baseUrl } from '../../../../baseUrl'
import { useDispatch, useSelector } from 'react-redux'
import { setCartProducts } from '../../../../redux/reducers/cartSlice'

const CartPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('userToken')
      if (token) {
        config.headers.Authorization = token
      }
      return config
    })

    axios
      .get(`${baseUrl}/api/v1/getCartItems`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.cart.products)
          dispatch(setCartProducts(res.data.cart.products))
        } else {
          alert(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const cartItems = useSelector((state) => state.cart.cart)

  
  const [newQty,setNewQty]=useState('')

  return (
    <div>
      <Navbar />
      <BottomBar />
      <div className=' h-screen flex justify-evenly items-center '>
        {/*Left side */}
        <div className='h-[700px] w-[60%] rounded-sm overflow-auto'>
          {/*First head*/}
          <div className='h-[50px] flex items-center ml-20'>
            <div className='font-Playfair text-[18px] font-semibold'>
              Shopping Cart
            </div>
          </div>
          {/*second section*/}
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
          {/*Third item or single item*/}
          {cartItems.map((item) => (
            <div
              key={item._id}
              className='w-[100%] flex justify-evenly items-center bg-[#FFFFFF] h-[80px]'
            >
              <div className='w-[40%] flex justify-evenly items-center '>
                <IoMdRemoveCircleOutline className='text-[25px] cursor-pointer' />
                <img src={headphone1} className='h-[50px] w-[50px]' />
                <div className='w-[50%] text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
                  {item.productVarientId.varientName}
                </div>
              </div>
              <div className='w-[70%]  flex justify-evenly items-center'>
                <div className='text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
                  {item.productVarientId.salePrice}
                </div>
                <div className='text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
                  <div className='w-[100px] h-[50px] border flex justify-evenly items-center'>
                    <div onClick={()=>setNewQty(item.quantity-1)} className='text-[40px] font-semibold cursor-pointer'>
                      -
                    </div>
                    <div className='text-[15px] font-semibold cursor-pointer mt-1'>
                      
                    </div>
                    <div className='text-[25px] font-semibold cursor-pointer'>
                      +
                    </div>
                  </div>
                </div>
                <div className='text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
                  ₹60000
                </div>
              </div>
            </div>
          ))}
        </div>
        {/*right side */}
        <div className='bg-blue-200 h-[500px] w-[30%] rounded-sm'></div>
      </div>
      <Footer />
    </div>
  )
}

export default CartPage
