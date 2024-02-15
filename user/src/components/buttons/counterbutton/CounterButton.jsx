import React from 'react'

const CounterButton = () => {
  return (
    <div className='flex justify-evenly items-center w-[140px] h-[40px]  border border-[#E4E7E9]'>
        <div className='text-[#191C1F] text-[25px] cursor-pointer'>-</div>
        <div className='text-[#191C1F] text-[15px]'>01</div>
        <div className='text-[#191C1F] text-[20px] cursor-pointer'>+</div>
    </div>
  )
}

export default CounterButton