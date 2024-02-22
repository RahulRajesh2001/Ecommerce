import React from 'react'

const LoginPage = () => {
  return (
    <div className='bg-[#F5F5F9] h-screen flex justify-center items-center'>
      {/*Container */}
      <div className='bg-[#FFFFFF] h-[50%] w-[35%] flex flex-col justify-center items-center gap-8 rounded-md'>
        <div className='text-[25px] font-Playfair'>Admin Login</div>
        <div className='w-[100%] flex flex-col justify-center items-center'>
          <div className='font-Josefin font-bold text-[15px]'>Email</div>
          <input
            type='text'
            className=' w-[70%] outline-none rounded-md h-[40px] bg-[#FAFAFA]'
          />
        </div>
        <div className='w-[100%] flex flex-col justify-center items-center'>
          <div className='font-Josefin font-bold text-[15px]'>Password</div>
          <input
            type='password'
            className=' w-[70%] outline-none rounded-md h-[40px] bg-[#FAFAFA]'
          />
        </div>
        {/*Button*/}
        <button className='bg-[#E7AB3C] w-[70%] h-[40px] rounded-md font-Playfair  text-[#ffff]'>
          Sign In
        </button>
      </div>
    </div>
  )
}

export default LoginPage
