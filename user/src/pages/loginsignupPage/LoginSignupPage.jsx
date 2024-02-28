import React, { useState } from 'react'
import OfferBar from '../../components/offerbar/OfferBar'
import Navbar from '../../components/navbar/Navbar'
import BottomBar from '../../components/bottombar/BottomBar'
import Footer from '../../components/footer/Footer'
import SignIn from '../../components/signin/SignIn'
import SignUp from '../../components/signup/SignUp'

const LoginSignupPage = () => {
  const [selectedTab, setSelectedTab] = useState('signin')
  return (
    <div>
      <OfferBar />
      <Navbar />
      <BottomBar />
      <div
        className={`flex justify-center items-center ${
          selectedTab === 'signin' ? 'h-[500px]' : 'h-[700px]'
        }`}
      >
        <div
          className={`w-[330px] rounded-sm border border-[#E4E7E9] ${
            selectedTab === 'signin' ? 'h-[400px]' : 'h-[650px]'
          }`}
        >
          {/*header */}
          <div className='h-[50px]  flex justify-evenly items-center border-b'>
            <div
              className={`w-[50%] h-[50px] flex justify-center items-center  border-[#FA8232] cursor-pointer ${
                selectedTab === 'signin' && 'border-b-4'
              }`}
              onClick={() => setSelectedTab('signin')}
            >
              <div className='font-semibold text-[17px]'>Sign In</div>
            </div>
            <div
              className={`w-[50%] h-[50px] flex justify-center items-center  border-[#FA8232] cursor-pointer ${
                selectedTab === 'signup' && 'border-b-4'
              }`}
              onClick={() => setSelectedTab('signup')}
            >
              <div className='font-semibold text-[17px]'>Sign Up</div>
            </div>
          </div>
          {/*body*/}
          {selectedTab === 'signin' && (
            <>
              <SignIn />
            </>
          )}
          {selectedTab === 'signup' && (
            <>
              <SignUp />
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default LoginSignupPage
