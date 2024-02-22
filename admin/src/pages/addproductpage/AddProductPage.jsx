import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import SideBar from '../../components/sidebar/SideBar'
import { FaRegPlusSquare } from "react-icons/fa";


const AddProductPage = () => {
const [images,setImages]=useState([])
const [croppedImage,setCroppedImages]=useState([])

//function to handle file input change
const handleImageChange=(e)=>{
  const selectImages=Array.from(e.target.files)
  selectImages(selectImages)
}

  return (
    <div className='flex bg-[#F5F5F9] '>
      <SideBar />
      <div className='w-[100%] flex flex-col items-center'>
        <Navbar />
        <form className='w-[98%] h-full rounded-lg flex justify-evenly'>
          {/*form for submission */}
          <div className='bg-[#FFFF] w-[68%]  rounded-md '>
            <div className='ml-20 flex flex-col gap-4'>
              <div className='font-Playfair text-[18px] text-[#566A7F] mt-4 '>
                Product Information
              </div>
              {/*input box */}
              <div>
                <div className='font-Josefin text-[14px] text-[#566A7F]'>
                  NAME
                </div>
                <input
                  type='text'
                  className='outline-none w-[80%] h-[40px] rounded-md border border-[#566A7F]'
                />
              </div>
              <div className='flex'>
                {/*input box */}
                <div className='w-[44%]'>
                  <div className='font-Josefin text-[14px] text-[#566A7F]'>
                    BRAND
                  </div>
                  <input
                    type='text'
                    className='outline-none w-[80%] h-[40px] rounded-md border border-[#566A7F]'
                  />
                </div>
                {/*input box */}
                <div className='w-[44%]'>
                  <div className='font-Josefin text-[14px] text-[#566A7F]'>
                    CATEGORY
                  </div>
                  <input
                    type='text'
                    className='outline-none w-[80%] h-[40px] rounded-md border border-[#566A7F]'
                  />
                </div>
              </div>
              {/*input box */}
              <div>
                <div className='font-Josefin text-[14px] text-[#566A7F]'>
                  DESCRIPTION (OPTIONAL)
                </div>
                <input
                  type='text'
                  className='outline-none w-[80%] h-[100px] rounded-md border border-[#566A7F]'
                />
              </div>

              {/*two boxes */}
              <div className='flex'>
                {/*input box */}
                <div className='w-[44%]'>
                  <div className='font-Josefin text-[14px] text-[#566A7F]'>
                    PRODUCT VARIENT
                  </div>
                  <input
                    type='text'
                    className='outline-none w-[80%] h-[40px] rounded-md border border-[#566A7F]'
                  />
                </div>
                {/*input box */}
                <div className='w-[44%]'>
                  <div className='font-Josefin text-[14px] text-[#566A7F]'>
                    COLOR
                  </div>
                  <input
                    type='text'
                    className='outline-none w-[80%] h-[40px] rounded-md border border-[#566A7F]'
                  />
                </div>
              </div>
              {/*two boxes */}
              <div className='flex'>
                {/*input box */}
                <div className='w-[44%]'>
                  <div className='font-Josefin text-[14px] text-[#566A7F]'>
                    STOCK
                  </div>
                  <input
                    type='text'
                    className='outline-none w-[80%] h-[40px] rounded-md border border-[#566A7F]'
                  />
                </div>
                {/*input box */}
                <div className='w-[44%]'>
                  <div className='font-Josefin text-[14px] text-[#566A7F]'>
                    REGULAR PRICE
                  </div>
                  <input
                    type='text'
                    className='outline-none w-[80%] h-[40px] rounded-md border border-[#566A7F]'
                  />
                </div>
              </div>
              {/*two boxes */}
              <div className='flex'>
                {/*input box */}
                <div className='w-[44%]'>
                  <div className='font-Josefin text-[14px] text-[#566A7F]'>
                    SALE PRICE
                  </div>
                  <input
                    type='text'
                    className='outline-none w-[80%] h-[40px] rounded-md border border-[#566A7F]'
                  />
                </div>
                {/*BUTTON*/}
                <div className='w-[35%] flex justify-evenly mt-4 '>
                  <button className='bg-[#EBEEF0] w-[48%] h-[50px] rounded-lg text-[#566A7F]'>
                    Discard
                  </button>
                  <button className=' w-[48%] h-[50px] rounded-lg bg-[#696CFF] text-[#ffff]'>
                    Publish
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-[30%] justify-between'>
            {/*Image adding section */}
            <div className='bg-[#FFFFFF] w-[100%]  h-[50%] rounded-md flex flex-col items-center gap-2 '>
              <div className='font-Playfair mt-3'>Add images</div>

              <div className='h-[250px] w-[100%] overflow-auto'>
                <div className='flex flex-wrap justify-evenly  items-center gap-3 mt-3 mb-4'>

                </div>
              </div>
              
            </div>
            {/*specification section */}
            <div className='bg-[#FFFFFF] w-[100%] h-[48%] rounded-md flex flex-col gap-2 mt-3 '>
            <div className='font-Playfair mt-3 ml-5'>Add Specification</div>
            <button className='ml-5' >
              <FaRegPlusSquare  className='text-[40px]'/>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProductPage
