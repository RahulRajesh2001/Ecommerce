import React,{useEffect,useState} from 'react'
import { FaStar } from 'react-icons/fa6'
import {baseUrl} from '../../../baseUrl.js';
import axios from 'axios'

const ShopCard = () => {
  const [products,setProducts]=useState([])

  useEffect(() => {
    axios.get(`${baseUrl}/api/v1/getProducts`).then((res)=>{
      console.log("products form card",products)
      setProducts(res.data)

      console.log("hdlsfj",res.data)
      
    }).catch((err)=>{
      console.log(err)
    })
  
  }, [])

  //handeDetails
const handleDetails=(id)=>{
    try{
      const details= axios.get(`${baseUrl}/api/v1/getProductDetails`,{params:{id}})
      console.log("reponse from detail",details)
    }catch(err){
      console.log(err)
    }
}

  return (
    <div className='flex flex-wrap'>
     {products.map((product, index) => (
  <div onClick={()=>handleDetails(product._id)} key={index}>
    {product.variants.map((variant, variantIndex) => (
      <div key={variantIndex} className='w-[150px] h-[220px] border px-[5px] py-[5px] mt-4 ml-2'>
        <div>
          <img src={variant.images[0]} alt='' className='mt-2' /> 
        </div>
        <div className='flex justify-start items-center gap-1 mt-2'>
          <div className='flex'>
          </div>
          <FaStar/>
          <FaStar/>
          <FaStar/>
          <FaStar/>
          <div className='text-[#77878F] text-[13px]'>(738)</div>
        </div>
        <div>
          <div className='text-[#191C1F] text-[12px]'>{product.name}</div>
        </div>
        <div className='text-[#2DA5F3] font-semibold text-[14px] mt-2'>₹{variant.salePrice}</div>
      </div>
    ))}
  </div>
))}

    </div>
   
  )
}

export default ShopCard
