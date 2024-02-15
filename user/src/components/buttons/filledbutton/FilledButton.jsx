import React from 'react'
import { FiShoppingCart } from "react-icons/fi";

const FilledButton = () => {
  return (
    <div className='w-[230px] h-[40px] bg-[#FA8232] flex justify-center items-center gap-5 rounded-sm'>
        <div className='text-[#ffff] font-semibold text-[11px]'>ADD TO CART</div>
        <FiShoppingCart className='text-[#ffff] text-[15px]'/>
    </div>
  )
}

export default FilledButton