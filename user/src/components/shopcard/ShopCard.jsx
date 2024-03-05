import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa6'
import { baseUrl } from '../../../baseUrl.js'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setProductDetails,setFeaturedProduct} from '../../../redux/reducers/productSlice.js'

const ShopCard = ({products}) => {
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const token = localStorage.getItem('userToken')
  //handeDetails
  const handleDetails = async (id) => {
    try {
      await axios.get(`${baseUrl}/api/v1/getProductDetails`, {
        params: { id },
        headers: {
          Authorization: `${token}`,
        },
      }).then((res)=>{
        if(res.status==200){
          dispatch(setProductDetails(res.data.product))
          navigate('/details')
        }else{
          navigate('/shop')
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
  return(
    <div className='w-[100%] flex flex-wrap items-center'>
    {products
      .filter(product => !product.isDeleted)
      .map((product, index) => (
        <div
          onClick={() => handleDetails(product._id)}
          key={product._id}
          className='w-[160px] h-[250px] border px-5 py-5 mt-4 ml-2'
        >
          {product.variants && product.variants.length > 0 && (
            <>
              <div>
                <img src={product.variants[0].images[0]} alt='' className='mt-2' />
              </div>
              <div className='flex justify-start items-center gap-1 mt-2'>
                <div className='flex'></div>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <div className='text-[#77878F] text-[13px]'>(738)</div>
              </div>
              <div>
                <div className='text-[#191C1F] text-[12px]'>{product.name}</div>
              </div>
              <div className='text-[#2DA5F3] font-semibold text-[14px] mt-2'>
                ₹{product.variants[0].salePrice}
              </div>
            </>
          )}
        </div>
      ))}
  </div>
  )
  }  

export default ShopCard
