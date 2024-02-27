import React,{useEffect,useState} from 'react'
import { FaStar } from 'react-icons/fa6'
import {baseUrl} from '../../../baseUrl.js';
import axios from 'axios'

const ShopCard = () => {
  const [products,setProducts]=useState([])

  useEffect(() => {
    axios.get(`${baseUrl}/api/v1/getProducts`).then((res)=>{
      // console.log("products form card",res.data.products)
      // setProducts(res.data.products)
      console.log(res)
      
    }).catch((err)=>{
      console.log(err)
    })
  
  }, [])
  return (
    // <div className='flex flex-wrap'>
    //   {products.map((element)=>(
    //     <div>
    //     <div className=' w-[150px] h-[220px] border px-[5px] py-[5px] mt-4 ml-2'>
    //     {/*Uppser side */}
    //     <div>
    //       <img src='' alt='' className='mt-2' />
    //     </div>
    //     {/*bottom side */}
    //     <div className='flex justify-start items-center gap-1 mt-2'>
    //       <div className='flex'>
    //         <FaStar className='text-[#FA8232] text-[16px]' />
    //         <FaStar className='text-[#FA8232] text-[16px]' />
    //         <FaStar className='text-[#FA8232] text-[16px]' />
    //         <FaStar className='text-[#FA8232] text-[16px]' />
    //         <FaStar className='text-[#FA8232] text-[16px]' />
    //       </div>
    //       <div className='text-[#77878F] text-[13px]'>(738)</div>
    //     </div>
    //     <div>
    //       <div className='text-[#191C1F] text-[12px]'>{element.name}</div>
    //       <div className='text-[#191C1F] text-[12px]'>{element.brand}</div>
    //     </div>
    //     <div className='text-[#2DA5F3] font-semibold text-[14px] mt-2'>{element.category}</div>
    //   </div>
    //     </div>
    //   ))}
    // </div>
    <div></div>
  )
}

export default ShopCard
