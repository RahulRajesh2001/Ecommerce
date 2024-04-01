import React, { useState, useEffect } from 'react'
import OfferBar from '../../components/offerbar/OfferBar'
import Navbar from '../../components/navbar/Navbar'
import BottomBar from '../../components/bottombar/BottomBar'
import Footer from '../../components/footer/Footer'
import { FaStar } from 'react-icons/fa'
import SelectButton from '../../components/buttons/selecButton/SelectButton'
import { IoMdHeartEmpty } from 'react-icons/io'
import ProductDetail from '../../components/productdeatil/ProductDetail'
import ReactImageMagnify from 'react-image-magnify'
import BrudCrumbs from '../../components/brudCrumbs/BrudCrumbs'
import axios from 'axios'
import { baseUrl } from '../../../baseUrl.js'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetailsPage = () => {
  const navigate = useNavigate()
  //mounting axios interceptor
  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('userToken')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  })
  //taking id from params
  const { id } = useParams()
  //state for fetched product
  const [product, setProduct] = useState([])
  const [productVarient, setProductVarient] = useState([])
  const [currentProductVarient, setCurrentProductVarient] = useState()
  useEffect(() => {
    try {
      axios
        .get(`${baseUrl}/api/v1/getProductDetails/${id}`, { params: { id } })
        .then((res) => {
          setProduct(res.data?.product)
          setProductVarient(res.data.product.variants)
          setCurrentProductVarient(res.data.product.variants[0])
        })
    } catch (err) {}
  }, [id])

  //handleVarient

  const handleVarient = (id) => {
    productVarient.map((item) => {
      if (item._id === id) {
        setCurrentProductVarient(item)
      }
    })
  }

  //for handling image
  const [image, setImage] = useState(0)
  const handleImage = (index) => {
    setImage(index)
  }

  const handleSubmit = () => {
    const requestData = {
      productVarientId: currentProductVarient?._id,
      quantity: 1,
    }
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
      <div className='h-[1000px]'>
        <div className='w-[100%] h-[50px] flex justify-end items-center'>
          <div className='flex gap-2 mr-10'>
            {productVarient.map((item, index) => (
              <div
                onClick={() => handleVarient(item._id)}
                key={item._id}
                className={`w-[100px] h-[50px] flex justify-center items-center font-Playfair text-[15px] ${
                  currentProductVarient._id == item._id
                    ? 'border-b-2 border-[#FA8232]'
                    : 'border-none'
                } cursor-pointer`}
              >
                Varient {index + 1}
              </div>
            ))}
          </div>
        </div>
        <div className='flex justify-center gap-32 '>
          <div className='flex flex-col justify-center items-center mb-12'>
            <div className='w-[400px] h-[300px] mt-5 '>
              <ReactImageMagnify
                smallImage={{
                  alt: 'Wristwatch by Ted Baker London',
                  isFluidWidth: true,
                  src: currentProductVarient?.images?.[image] || '',
                }}
                largeImage={{
                  src: currentProductVarient?.images?.[image] || '',
                  width: 700,
                  height: 1300,
                }}
                isHintEnabled={true}
              />
            </div>
            <div className='flex gap-3'>
              {currentProductVarient?.images?.map((image, index) => (
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
            <div className='font-semibold text-[16px]'>{''}</div>
            <div className='flex gap-1'>
              <div className='text-[12px] text-[#5F6C72]'>Availability :</div>
              <div
                className={`font-bold text-[12px] ${
                  currentProductVarient?.stock <= 0
                    ? 'text-red-600'
                    : 'text-[#2DB224]'
                }`}
              >
                {currentProductVarient?.stock <= 0
                  ? 'Out of stock'
                  : 'In stock'}
              </div>
            </div>

            <div className='flex gap-1'>
              <div className='text-[12px] text-[#5F6C72]'>Stock :</div>
              <div className={'font-bold text-[12px]'}>
                {currentProductVarient?.stock}
              </div>
            </div>

            <div className='flex gap-1'>
              <div className='text-[12px] text-[#5F6C72]'>Brand :</div>
              <div className='text-[#191C1F] font-bold text-[12px]'>
                {product.brand}
              </div>
            </div>
            <div className='flex gap-1 mr-[150px]'>
              <div className='text-[12px] text-[#5F6C72]'>Category :</div>
              <div className='text-[#191C1F] font-bold text-[12px]'>
                {product.category}
              </div>
            </div>

            <div className='flex gap-3 items-center'>
              <div className='font-bold text-[#2DA5F3] text-[15px]'>
                ₹ {Math.round(currentProductVarient?.salePrice)}
              </div>
              <div className='text-[#77878F] text-[14px]'>
                <strike>₹{currentProductVarient?.regularPrice}</strike>
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
                    {currentProductVarient?.color}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-between'>
              {currentProductVarient?.specification?.map((element, index) => (
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
            id={currentProductVarient?._id}
            productDetailsDescription={product?.description}
            productSpecification={currentProductVarient?.specification}
          />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ProductDetailsPage
