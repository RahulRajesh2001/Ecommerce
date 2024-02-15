import React from 'react'
import OfferBar from '../../components/offerbar/OfferBar'
import Navbar from '../../components/navbar/Navbar'
import BottomBar from '../../components/bottombar/BottomBar'
import Footer from '../../components/footer/Footer'
import FilledButton from '../../components/buttons/filledbutton/FilledButton'

const EmailVerificationPage = () => {
  return (
   <div>
     <OfferBar />
      <Navbar />
      <BottomBar />
      <div className='h-[450px] flex justify-center items-center '>
          <div className='flex flex-col justify-center items-center gap-4 w-[300px] h-[250px]  rounded-sm border border-[#E4E7E9]'>
            <div className='font-semibold text-[14px]'>Verify Your Email Address</div>
            <div className='w-[90%] text-[#5F6C72] text-[12px] flex justify-center'>Lorem ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur </div>

        <div className='flex  flex-col gap-2 bg-red- w-[90%]'>
          <div className='flex justify-between'>
            <div className='text-[12px] font-semibold '>Password</div>
            <div className='text-[12px] font-semibold text-[#2DA5F3]'>
              Forget Password
            </div>
          </div>
          <input type='password' className='border outline-none  h-[35px]' />
        </div>

        <FilledButton value="VERIFY ME" w="90%"/>


          </div>
      </div>
      <Footer />
   </div>
  )
}

export default EmailVerificationPage