import React, { useState, useEffect } from 'react'
import OfferBar from '../../components/offerbar/OfferBar'
import Navbar from '../../components/navbar/Navbar'
import BottomBar from '../../components/bottombar/BottomBar'
import Footer from '../../components/footer/Footer'
import { FaStar } from 'react-icons/fa'
import SelectButton from '../../components/buttons/selecButton/SelectButton'
import CounterButton from '../../components/buttons/counterbutton/CounterButton'
import FilledButton from '../../components/buttons/filledbutton/FilledButton'
import OutlineButton from '../../components/buttons/oulineButton/OutlineButton'
import { IoMdHeartEmpty } from 'react-icons/io'
import { MdOutlineCompareArrows } from 'react-icons/md'
import ProductDetail from '../../components/productdeatil/ProductDetail'
import { useSelector } from 'react-redux'
import ReactImageMagnify from 'react-image-magnify'
import BrudCrumbs from '../../components/brudCrumbs/BrudCrumbs'
import axios from 'axios'
import { baseUrl } from '../../../baseUrl.js'

const ProductDetailsPage = () => {
  const productDetails = useSelector(
    (state) => state.productDetails.productDetails
  )
  const productDetailsVariant = productDetails?.variants?.[0] || {}

  const [productId, setProductId] = useState(productDetailsVariant?._id || '')
  const [productQuantity, setProductQuantity] = useState(0)
  const [image, setImage] = useState(0)

  const handleImage = (index) => {
    setImage(index)
  }

  const quantity = (quantity) => {
    setProductQuantity(quantity)
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
      productId: productId,
      quantity: productQuantity,
    }

    axios
      .post(`${baseUrl}/api/v1/addToCart`, requestData)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.message)
          alert(res.data.message)
        } else {
          alert(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err)
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
              <div className='text-[10px] font-bold'>4.7 Star Rating</div>
              <div className='text-[#5F6C72] text-[10px]'>
                (21,671 User feedback)
              </div>
            </div>
            <div className='font-semibold text-[15px]'>
              {productDetails.name}
            </div>
            <div className='flex gap-1'>
              <div className='text-[11px] text-[#5F6C72]'>Availability :</div>
              <div className='text-[#2DB224] font-bold text-[10px]'>
                In Stock
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='flex gap-1'>
                <div className='text-[11px] text-[#5F6C72]'>Brand :</div>
                <div className='text-[#191C1F] font-bold text-[10px]'>
                  {productDetails.brand}
                </div>
              </div>
              <div className='flex gap-1 mr-[100px]'>
                <div className='text-[11px] text-[#5F6C72]'>Category :</div>
                <div className='text-[#191C1F] font-bold text-[10px]'>
                  {productDetails.category}
                </div>
              </div>
            </div>
            <div className='flex gap-3 items-center'>
              <div className='font-bold text-[#2DA5F3] text-[15px]'>
                ₹ {productDetailsVariant.salePrice}
              </div>
              <div className='text-[#77878F] text-[14px]'>
                <strike>₹{productDetailsVariant.regularPrice}</strike>
              </div>
              <div className='w-[50px] h-[20px] bg-[#F3DE6D] flex justify-center items-center'>
                <div className='font-bold text-[10px]'>21% OFF</div>
              </div>
            </div>
            <div className='bg-[#E4E7E9] h-[1px] w-[100%] mt-2'></div>
            <div className='flex justify-between gap-1 mt-2'>
              <div className='flex  items-center justify-center gap-1'>
                <div className='text-[12px] font-semibold'>Color :</div>
                <div className='flex justify-center items-center mt-1 gap-2 '>
                  <div className='text-[#191C1F] font-bold text-[10px]'>
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
            <div className='mt-5 flex justify-around items-center gap-2'>
              <CounterButton
                count={productDetailsVariant.stock}
                quantity={quantity}
              />
              <div onClick={handleSubmit}>
                <FilledButton value='ADD TO CART' w='300px' link='/cart' />
              </div>
              <OutlineButton />
            </div>

            {/*wishlist section*/}
            <div className='mt-2 flex gap-8'>
              <div className='flex items-center gap-2'>
                <IoMdHeartEmpty className='text-[#475156] text-[15px]' />
                <div className='text-[#475156] text-[12px]'>
                  Add to Wishlist
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <MdOutlineCompareArrows className='text-[#475156] text-[15px]' />
                <div className='text-[#475156] text-[12px]'>Add to Compare</div>
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
