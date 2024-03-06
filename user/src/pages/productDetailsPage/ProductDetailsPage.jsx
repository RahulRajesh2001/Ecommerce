import React, { useState } from 'react'
import OfferBar from '../../components/offerbar/OfferBar'
import Navbar from '../../components/navbar/Navbar'
import BottomBar from '../../components/bottombar/BottomBar'
import Footer from '../../components/footer/Footer'
import { FaStar } from 'react-icons/fa6'
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

const ProductDetailsPage = () => {
  const ProductDetails = useSelector(
    (state) => state.productDetails.productDetails
  )
  const [productDetails, setProductDetails] = useState(ProductDetails)
  const [productDetailsVarient, setProductDetailsVarient] = useState(
    productDetails.variants[0]
  )
  console.log(productDetailsVarient)
  const [image, setImage] = useState(0)

  function handleImage(index) {
    setImage(index)
  }
  const breadcrumbs = [{ label: 'Home', path: '/' },{label:'Product Details'}];

  return (
    <div>
      <OfferBar />
      <Navbar />
      <BottomBar />
      <BrudCrumbs breadcrumbs={breadcrumbs}/>
      <div className=' h-[900px]'>
        {/*upperside*/}
        <div className='flex justify-center gap-8'>
          {/*leftside*/}
          <div className='flex flex-col justify-center items-center  mb-12'>
            <div className='w-[400px] h-[300px] mt-5'>
              {/*   */}
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: 'Wristwatch by Ted Baker London',
                    isFluidWidth: true,
                    src: productDetailsVarient.images[image],
                  },
                  largeImage: {
                    src: productDetailsVarient.images[image],
                    width: 700,
                    height: 1300,
                  },
                  isHintEnabled:true
                }}
              />
            </div>
            <div className='flex gap-3'>
              {productDetailsVarient.images.map((image, index) => (
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
          {/*rightside*/}
          <div className=' mt-5 flex justify-center  flex-col  w-[500px] gap-2'>
            {/*headOne*/}
            <div className='flex gap-1 '>
              <div className='flex '>
                <div>
                  {' '}
                  <FaStar className='text-[#FA8232] text-[16px]' />
                </div>
                <div>
                  {' '}
                  <FaStar className='text-[#FA8232] text-[16px]' />
                </div>
                <div>
                  {' '}
                  <FaStar className='text-[#FA8232] text-[16px]' />
                </div>
                <div>
                  {' '}
                  <FaStar className='text-[#FA8232] text-[16px]' />
                </div>
                <div>
                  {' '}
                  <FaStar className='text-[#FA8232] text-[16px]' />
                </div>
              </div>
              <div className='text-[10px] font-bold '>4.7 Star Rating</div>
              <div className='text-[#5F6C72] text-[10px]'>
                (21,671 User feedback)
              </div>
            </div>
            {/*headtwo*/}
            <div className='font-semibold text-[15px]'>
              {productDetails.name}
            </div>
            {/*headthree*/}
            <div className='flex gap-1'>
              <div className='text-[11px] text-[#5F6C72]'>Availability :</div>
              <div className='text-[#2DB224] font-bold text-[10px]'>
                In Stock
              </div>
            </div>
            {/*headfour*/}
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
            {/*pricehead*/}
            <div className='flex gap-3 items-center'>
              <div className='font-bold text-[#2DA5F3] text-[15px]'>
                ₹ {productDetailsVarient.salePrice}
              </div>
              <div className='text-[#77878F] text-[14px]'>
                <strike>₹{productDetailsVarient.regularPrice}</strike>
              </div>
              <div className='w-[50px] h-[20px] bg-[#F3DE6D] flex justify-center items-center '>
                <div className='font-bold text-[10px]'>21% OFF</div>
              </div>
            </div>

            {/*divider*/}
            <div className='bg-[#E4E7E9] h-[1px] w-[100%] mt-2'></div>
            {/*color*/}
            <div className='flex justify-between gap-1 mt-2'>
              {/*color*/}
              <div className='flex  items-center justify-center gap-1'>
                <div className='text-[12px] font-semibold'>Color :</div>
                <div className='flex justify-center items-center mt-1 gap-2 '>
                  <div className='text-[#191C1F] font-bold text-[10px]'>
                    {productDetailsVarient.color}
                  </div>
                </div>
              </div>
              {/*size*/}
            </div>
            {/*memory and storage*/}
            <div className='flex justify-between'>
              {productDetailsVarient.specification.map((element, index) => (
                <SelectButton
                  key={index}
                  head={element.specName}
                  innerHead={element.specValue}
                />
              ))}
            </div>
            {/*buttons section*/}
            <div className='mt-5 flex justify-around items-center gap-2'>
              <CounterButton />
              <FilledButton value='ADD TO CART' w='300px' />
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
          <ProductDetail id={productDetails._id}
            productDetailsDescription={productDetails.description}
          />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ProductDetailsPage
