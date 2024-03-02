import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa6'
import { baseUrl } from '../../../baseUrl.js'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setProductDetails } from '../../../redux/reducers/productSlice.js'

const ShopCard = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [products, setProducts] = useState([])


  const token = localStorage.getItem('userToken')
  useEffect(() => {
    console.log('this is token', token)
    axios
      .get(`${baseUrl}/api/v1/getProducts`, {
        headers: {
          Authorization:token,
        },
      })
      .then((res) => {
        setProducts(res.data.products)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

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
  return (
    <div className=' w-[100%] flex flex-wrap   items-center'>
      {products.map((product, index) => (
        product.variants.map((variant, variantIndex) => (
          <div
            onClick={() => handleDetails(product._id)}
            key={product._id + "-" + variantIndex}
            className='w-[160px] h-[250px] border px-5 py-5 mt-4 ml-2 '
          >
            <div>
              <img src={variant.images[0]} alt='' className='mt-2' />
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
              ₹{variant.salePrice}
            </div>
          </div>
        ))
      ))}
    </div>
  );
        }  

export default ShopCard
