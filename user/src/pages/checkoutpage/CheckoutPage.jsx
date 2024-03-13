import React, { useEffect, useState } from 'react'
import OfferBar from '../../components/offerbar/OfferBar'
import Navbar from '../../components/navbar/Navbar'
import BottomBar from '../../components/bottombar/BottomBar'
import Footer from '../../components/footer/Footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from '../../../baseUrl'
import ChooseAddresss from '../../components/chooseAddress/ChooseAddresss'

const CheckoutPage = () => {
  const navigate = useNavigate()
  const [id, setAddressId] = useState('')
  const [update, setUpdate] = useState(false)
  //taking choosen address id
  const chooseAddress = (id) => {
    setAddressId(id)
    setUpdate(!update)
  }

  //payment status in checkout page
  const [paymentStatus, setPaymentStatus] = useState({})

  //shipping addres in checkout page
  const [shippingAddress, setShippingAddress] = useState({})

  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('userToken')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  })
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/chooseAddress`, { params: { id } })
      .then((res) => {
        console.log('reponse form', res.data.address)
        setShippingAddress(res.data.address)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [update])

  //scart items in checkout page
  const [cartItems, setCartItems] = useState([])
  const [subTotal, setSubTotal] = useState('')

  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('userToken')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  })
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/getCartItems`)
      .then((res) => {
        console.log('cartItems', res.data.cart.products)
        setCartItems(res.data.cart.products)
        setSubTotal(() =>
          res.data.cart.products.reduce(
            (acc, curr) =>
              acc + curr.productVarientId.salePrice * curr.quantity,
            0
          )
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  //order placing in checkout page
  const [paymentMethod, setPaymentMethod] = useState('')

  const orderData = {
    orderedItems: cartItems.map((item) => ({
      product: item.productVarientId._id,
      quantity: item.quantity,
      price: item.productVarientId.salePrice * item.quantity,
      orderStatus: 'Pending',
      paymentStatus: 'Pending',
      offers: [],
    })),
    deliveryDate: '',
    payment: shippingAddress._id,
    paymentMethod: paymentMethod,
    shippingAddress: {
      street: shippingAddress.street,
      phone1: shippingAddress.phone1,
      phone2: shippingAddress.phone2,
      state: shippingAddress.state,
      pincode: shippingAddress.pincode,
      address: shippingAddress.address,
      fullName: shippingAddress.name,
    },
    orderDate: new Date(),
    coupons: null,
    totalAmount: subTotal,
  }

  const handleSubmit = () => {
    try {
      axios.interceptors.request.use((config) => {
        const token = localStorage.getItem('userToken')
        if (token) {
          config.headers.Authorization = token
        }
        return config
      })
      axios
        .post(`${baseUrl}/api/v1/placeOrder`, orderData)
        .then((res) => {
          alert(res.data.message)
          navigate('/orderHistory')
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <OfferBar />
      <Navbar />
      <BottomBar />
      <div className=' h-screen flex justify-evenly items-center'>
        {/*Leftside */}
        <div className=' h-[90%] w-[60%] flex flex-col border rounded-md'>
          {/*address part*/}
          <div className=' h-[60%]'>
            <form className='w-[100%] h-full flex flex-col justify-center items-center gap-4 '>
              <div className='overflow-auto w-[100%] flex flex-col justify-center items-center'>
                <div className='font-Playfair font-bold text-[18px] mb-2'>
                  SHIPPING ADDRESS
                </div>
                <div className='w-[100%] flex justify-center items-center '>
                  <div className='flex flex-col gap-2 w-[100%] overflow-auto '>
                    <div className='font-Josefin font-bold ml-5'>Full Name</div>
                    <input
                      id='name'
                      type='text'
                      placeholder='name'
                      value={shippingAddress.name}
                      className='bg-[#FAFAFA] border h-[40px] w-[60%] rounded-lg outline-none ml-5'
                    />
                  </div>
                  <div className='flex flex-col gap-2 w-[100%] overflow-auto '>
                    <div className='font-Josefin font-bold ml-5'>Address</div>
                    <input
                      id='address'
                      type='text'
                      value={shippingAddress.address}
                      placeholder='address'
                      className='bg-[#FAFAFA] border h-[40px] w-[80%] rounded-lg outline-none ml-5'
                    />
                  </div>
                </div>
                <div className='w-[100%] flex justify-center items-center '>
                  <div className='flex flex-col gap-2 w-[100%] overflow-auto '>
                    <div className='font-Josefin font-bold ml-5'>
                      Region/State
                    </div>
                    <input
                      id='state'
                      type='text'
                      value={shippingAddress.region}
                      placeholder='region/state'
                      className='bg-[#FAFAFA] border h-[40px] w-[60%] rounded-lg outline-none ml-5'
                    />
                  </div>
                  <div className='flex flex-col gap-2 w-[100%] overflow-auto '>
                    <div className='font-Josefin font-bold ml-5'>City</div>
                    <input
                      id='city'
                      type='text'
                      value={shippingAddress.city}
                      placeholder='city'
                      className='bg-[#FAFAFA] border h-[40px] w-[40%] rounded-lg outline-none ml-5'
                    />
                  </div>
                </div>
                <div className='w-[100%] flex justify-center items-center '>
                  <div className='flex flex-col gap-2 w-[100%] overflow-auto '>
                    <div className='font-Josefin font-bold ml-5'>Pincode</div>
                    <input
                      id='pincode'
                      type='number'
                      placeholder='pincode'
                      value={shippingAddress.pincode}
                      className='bg-[#FAFAFA] border h-[40px] w-[40%] rounded-lg outline-none ml-5'
                    />
                  </div>
                  <div className='flex flex-col gap-2 w-[100%] overflow-auto '>
                    <div className='font-Josefin font-bold ml-5'>
                      Phone Number 1
                    </div>
                    <input
                      id='phone1'
                      type='number'
                      placeholder='phone1'
                      value={shippingAddress.phone1}
                      className='bg-[#FAFAFA] border h-[40px] w-[60%] rounded-lg outline-none ml-5'
                    />
                  </div>
                </div>
                <div className='w-[100%] flex justify-center items-center '>
                  <div className='flex flex-col gap-2 w-[100%] overflow-auto '>
                    <div className='font-Josefin font-bold ml-5'>
                      Phone Number 2
                    </div>
                    <input
                      id='phone2'
                      type='number'
                      placeholder='phone2'
                      value={shippingAddress.phone2}
                      className='bg-[#FAFAFA] border h-[40px] w-[50%] rounded-lg outline-none ml-5'
                    />
                  </div>
                  <div className='flex flex-col gap-2 w-[100%] overflow-auto '>
                    <div className='font-Josefin font-bold ml-5'>Steet</div>
                    <input
                      id='street'
                      type='text'
                      placeholder='street'
                      value={shippingAddress.street}
                      className='bg-[#FAFAFA] border h-[40px] w-[60%] rounded-lg outline-none ml-5'
                    />
                  </div>
                </div>
                <div className='w-[100%] flex justify-center items-center '>
                  <div className='flex flex-col gap-2 w-[100%] overflow-auto '>
                    <div className='font-Josefin font-bold ml-5'>Landmark</div>
                    <input
                      id='landmark'
                      type='text'
                      placeholder='landmark'
                      value={shippingAddress.landmark}
                      className='bg-[#FAFAFA] border h-[40px] w-[70%] rounded-lg outline-none ml-5'
                    />
                  </div>
                  <div className='w-[100%] flex justify-center items-center'>
                    <button className='w-[200px] h-[40px] flex justify-center items-center bg-[#FA8232] text-[#ffff] text-[12px] rounded-md mr-5 font-Playfair cursor-pointer mt-4'>
                      <ChooseAddresss chooseAddress={chooseAddress} />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/*payment part*/}
          <div className=' h-[30%]'>
            <div className='overflow-auto w-[100%] flex flex-col justify-center items-center'>
              <div className='font-Playfair font-bold text-[18px] mb-2'>
                PAYMENT
              </div>

              <div className=' w-[200px] h-[150px] flex justify-center items-center flex-col gap-4 border'>
                <div className='font-Josefin text-[35px] text-[#FA8232]'>₹</div>
                <div className='font-Playfair text-[18px]'>
                  Cash on Delivery
                </div>
                <input
                  onChange={() => setPaymentMethod('Cash On Delivery')}
                  className='h-5 w-5'
                  type='radio'
                />
              </div>
            </div>
          </div>
        </div>
        {/*Right side */}
        <div className=' h-[80%] w-[30%] flex flex-col justify-center items-center '>
          <div className='w-[90%] h-[90%] flex justify-center items-center flex-col gap-5 border rounded-md'>
            <div className='text-[25px] font-Playfair'>Card Total</div>
            <div className=' w-[100%] h-[50%] flex flex-col justify-center items-center gap-4 border-b '>
              <div className='w-[100%] flex flex-col  justify-evenly items-center bg-[#FFFFFF] h-[50%] overflow-auto'>
                {cartItems.map((item) => (
                  <div className='flex justify-evenly w-[100%]'>
                    <div className='w-[100%] h-[100px] flex justify-evenly items-center '>
                      <img
                        src={item.productVarientId.images[0]}
                        className='h-[50px] w-[50px] rounded-md'
                      />
                      <div className='w-[50%] text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
                        {item.productVarientId.varientName}
                      </div>
                    </div>
                    <div className='w-[70%]  flex justify-evenly items-center'>
                      <div className='text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
                        {item.quantity}
                      </div>

                      <div className='text-[14px] font-Josefin font-semibold flex justify-center items-center text-[#191C1F]'>
                        {item.productVarientId.salePrice * item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex justify-between items-center w-[80%] '>
                <div className='text-[#5F6C72] font-Playfair'>SubTotal</div>
                <div className='text-[#191C1F] font-Playfair font-semibold'>
                  ₹{subTotal}
                </div>
              </div>
              <div className='flex justify-between items-center w-[80%] '>
                <div className='text-[#5F6C72] font-Playfair'>Discount</div>
                <div className='text-[#191C1F] font-Playfair font-semibold'>
                  ₹ 0
                </div>
              </div>
            </div>
            <div className='flex justify-between items-center w-[80%] '>
              <div className='text-[#5F6C72] font-Playfair'>Total</div>
              <div className='text-[#191C1F] font-Playfair font-semibold'>
                ₹{subTotal}
              </div>
            </div>

            <Link className='w-[100%] flex justify-center' to='/checkout'>
              <div
                onClick={handleSubmit}
                className='w-[80%] h-[70px] bg-[#FA8232] font-Playfair text-[#ffff] font-semibold flex justify-center items-center cursor-pointer'
              >
                PLACE ORDER
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CheckoutPage
