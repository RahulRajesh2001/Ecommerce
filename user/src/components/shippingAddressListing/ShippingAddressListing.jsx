import React from 'react'
import FilledButton from '../buttons/filledbutton/FilledButton'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const ShippingAddressListing = () => {
  return (
    <div className=' w-[100%] h-[300px] flex flex-col justify-center items-center gap-2 overflow-auto mt-[50px] '>
        <div className='flex justify-around w-[100%] items-center '>
        <div className='flex font-semibold text-[18px] '>Account Setting</div>
        <div><FilledButton value={"Add Address"} w={"100px"}/></div>
        </div>
        {/*Address part*/}
        <div className='w-[70%] h-[100px]  flex flex-col gap-2 justify-center border p-2'>
            <div className='flex justify-around'>
            <div className='font-semibold font-Josefin'>Rahul Rajesh</div>
            <div className='flex gap-5'>
            <MdDelete className='text-[20px] cursor-pointer'/>
            <FaEdit className='text-[20px] cursor-pointer'/>
            </div>
            </div>
            <div className=''>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque sequi nemo </div>
            <div className='font-semibold font-Josefin'>670631</div>
        </div>
        <div className='w-[70%] h-[100px]  flex flex-col gap-2 justify-center border p-2 '>
            <div className='flex justify-around'>
            <div className='font-semibold font-Josefin'>Rahul Rajesh</div>
            <div className='flex gap-5'>
            <MdDelete className='text-[20px] cursor-pointer'/>
            <FaEdit className='text-[20px] cursor-pointer'/>
            </div>
            </div>
            <div className=''>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque sequi nemo </div>
            <div className='font-semibold font-Josefin'>670631</div>
        </div>
        
        
    </div>
  )
}

export default ShippingAddressListing