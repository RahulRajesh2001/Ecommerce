import React, { useState, useEffect } from 'react'
import OfferBar from '../../components/offerbar/OfferBar'
import Navbar from '../../components/navbar/Navbar'
import BottomBar from '../../components/bottombar/BottomBar'
import Footer from '../../components/footer/Footer'
import { FaStar } from 'react-icons/fa'
import SelectButton from '../../components/buttons/selecButton/SelectButton'
import { IoMdHeartEmpty } from 'react-icons/io'
import ProductDetail from '../../components/productdeatil/ProductDetail'
import { useSelector } from 'react-redux'
import ReactImageMagnify from 'react-image-magnify'
import BrudCrumbs from '../../components/brudCrumbs/BrudCrumbs'
import axios from 'axios'
import { baseUrl } from '../../../baseUrl.js'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const ProductDetailsPage = () => {
  const navigate = useNavigate()
  const productDetails = useSelector(
    (state) => state.productDetails.productDetails
  )
  const productDetailsVariant = productDetails?.variants?.[0] || {}

  const [productId, setProductId] = useState(productDetailsVariant?._id || '')

  const [image, setImage] = useState(0)

  const handleImage = (index) => {
    setImage(index)
  }

  const handleSubmit = () => {
    axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('userToken')
      if (token) {
        config.headers.Authorization = token
      }
      return config
    })

    const requestData = {
      productVarientId: productId,
      quantity: 1,
    }
    console.log('handle submit', requestData)

    axios
      .post(`${baseUrl}/api/v1/addToCart`, requestData)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            text: res.data.message,
            icon: 'success',
          })
          navigate('/cart')
        } else {
          Swal.fire({
            text: res.data.message,
            icon: 'error',
          })
        }
      })
      .catch((err) => {
        Swal.fire({
          text: err.response.data.message,
          icon: 'error',
        })
      })
  }

  return (
    <div>
      <OfferBar />
      <Navbar />
      <BottomBar />
      <BrudCrumbs
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Product Details' },
        ]}
      />
      <div className='h-[900px]'>
        <div className='flex justify-center gap-8'>
          <div className='flex flex-col justify-center items-center mb-12'>
            <div className='w-[400px] h-[300px] mt-5'>
              <ReactImageMagnify
                smallImage={{
                  alt: 'Wristwatch by Ted Baker London',
                  isFluidWidth: true,
                  src: productDetailsVariant.images?.[image] || '',
                }}
                largeImage={{
                  src: productDetailsVariant.images?.[image] || '',
                  width: 700,
                  height: 1300,
                }}
                isHintEnabled={true}
              />
            </div>
            <div className='flex gap-3'>
              {productDetailsVariant.images?.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt=''
                    className='w-[50px] h-[50px] mt-[50px]'
                    onClick={() => handleImage(index)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='mt-5 flex justify-center flex-col w-[500px] gap-2'>
            <div className='flex gap-1 '>
              <div className='flex '>
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className='text-[#FA8232] text-[16px]' />
                ))}
              </div>
              <div className='text-[12px] font-bold'>4.7 Star Rating</div>
            </div>
            <div className='font-semibold text-[16px]'>
              {productDetails.name}
            </div>
            <div className='flex gap-1'>
              <div className='text-[12px] text-[#5F6C72]'>Availability :</div>
              <div
                className={`font-bold text-[12px] ${
                  productDetailsVariant.stock <= 0
                    ? 'text-red-600'
                    : 'text-[#2DB224]'
                }`}
              >
                {productDetailsVariant.stock <= 0 ? 'Out of stock' : 'In stock'}
              </div>
            </div>

            <div className='flex gap-1'>
              <div className='text-[12px] text-[#5F6C72]'>Stock :</div>
              <div className={'font-bold text-[12px]'}>
                {productDetailsVariant.stock}
              </div>
            </div>

            <div className='flex gap-1'>
              <div className='text-[12px] text-[#5F6C72]'>Brand :</div>
              <div className='text-[#191C1F] font-bold text-[12px]'>
                {productDetails.brand}
              </div>
            </div>
            <div className='flex gap-1 mr-[150px]'>
              <div className='text-[12px] text-[#5F6C72]'>Category :</div>
              <div className='text-[#191C1F] font-bold text-[12px]'>
                {productDetails.category}
              </div>
            </div>

            <div className='flex gap-3 items-center'>
              <div className='font-bold text-[#2DA5F3] text-[15px]'>
                ₹ {Math.round(productDetailsVariant.salePrice)}
              </div>
              <div className='text-[#77878F] text-[14px]'>
                <strike>₹{productDetailsVariant.regularPrice}</strike>
              </div>
              <div className='w-[60px] h-[20px] bg-[#F3DE6D] flex justify-center items-center'>
                <div className='font-bold text-[11px]'>21% OFF</div>
              </div>
            </div>
            <div className='bg-[#E4E7E9] h-[1px] w-[100%] mt-2'></div>
            <div className='flex justify-between gap-1 mt-2'>
              <div className='flex  items-center justify-center gap-1'>
                <div className='text-[12px] font-semibold'>Color :</div>
                <div className='flex justify-center items-center mt-1 gap-2 '>
                  <div className='text-[#191C1F] font-bold text-[12px]'>
                    {productDetailsVariant.color}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-between'>
              {productDetailsVariant.specification?.map((element, index) => (
                <SelectButton
                  key={index}
                  head={element.specName}
                  innerHead={element.specValue}
                />
              ))}
            </div>
            <div className='flex gap-5 justify-center items-center'>
              <button
                onClick={handleSubmit}
                className='bg-[#FA8232] w-[200px] h-[40px] rounded-lg text-[#ffff] font-Playfair text-[15px]'
              >
                ADD TO CART
              </button>
              <button className='border-2 border-[#FA8232] rounded-lg h-[40px] w-[100px] font-Playfair text-[15px]'>
                BUY NOW
              </button>
            </div>

            {/*wishlist section*/}
            <div className='mt-2 flex gap-8'>
              <div className='flex items-center gap-2'>
                <IoMdHeartEmpty className='text-[#475156] text-[15px]' />
                <div className='text-[#475156] text-[12px]'>
                  Add to Wishlist
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*bottomside*/}
        <div className='flex justify-center'>
          <ProductDetail
            id={productDetails._id}
            productDetailsDescription={productDetails.description}
          />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ProductDetailsPage
