import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { IoMdArrowForward } from 'react-icons/io'

const FilledButton = ({ value, w }) => {
  return (
    <div
      className={`w-[${w}] h-[40px] bg-[#FA8232] flex justify-center items-center gap-5 rounded-sm`}
    >
      <div className='text-[#ffff] font-semibold text-[11px]'>{value}</div>
      {value === 'SIGN IN' && (
        <IoMdArrowForward className='text-[#ffff] text-[15px]' />
      )}
      {value === 'ADD TO CART' && (
        <FiShoppingCart className='text-[#ffff] text-[15px]' />
      )}
      {value === 'SIGN UP' && (
        <IoMdArrowForward className='text-[#ffff] text-[15px]' />
      )}
    </div>
  )
}

export default FilledButton
