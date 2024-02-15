import React from 'react'
import OfferBar from '../../components/offerbar/OfferBar'
import Navbar from '../../components/navbar/Navbar'
import BottomBar from '../../components/bottombar/BottomBar'
import Footer from '../../components/footer/Footer'
import FilledButton from '../../components/buttons/filledbutton/FilledButton'

const ResetPasswordPage = () => {
  return (
    <div>
      <OfferBar />
      <Navbar />
      <BottomBar />
      <div className='h-[450px] flex justify-center items-center '>
        <div className='flex flex-col justify-center items-center gap-4 w-[300px] h-[350px]  rounded-sm border border-[#E4E7E9]'>
          <div className='font-semibold text-[14px]'>Reset Password</div>
          <div className='w-[90%] text-[#5F6C72] text-[12px] flex justify-center'>
            Lorem ipsum dolor sit amet consectetur ipsum dolor sit amet
            consectetur{' '}
          </div>

          <div className='flex  flex-col gap-2 bg-red- w-[90%]'>
            <div className='flex justify-between'>
              <div className='text-[12px] font-semibold '>Password</div>
            </div>
            <input type='password' className='border outline-none  h-[35px]' />
          </div>
          <div className='flex  flex-col gap-2 bg-red- w-[90%]'>
            <div className='flex justify-between'>
              <div className='text-[12px] font-semibold '>Confirm Password</div>
            </div>
            <input type='password' className='border outline-none  h-[35px]' />
          </div>

          <FilledButton value='RESET PASSWORD' w='90%' />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ResetPasswordPage
