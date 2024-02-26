import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../baseUrl';
import OfferBar from '../../components/offerbar/OfferBar';
import Navbar from '../../components/navbar/Navbar';
import BottomBar from '../../components/bottombar/BottomBar';
import Footer from '../../components/footer/Footer';
import FilledButton from '../../components/buttons/filledbutton/FilledButton';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EmailVerificationPage = () => {
  const navigate=useNavigate()
  const [otp, setOtp] = useState('');
  const [genOtp,setGenOtp]=useState('')
  const [userEmail, setUserEmail] = useState('');

  // Get email from Redux store
  const email = useSelector(state => state.email.email);

  // Update userEmail when email changes
  useEffect(() => {
    if (email) {
      setUserEmail(email.email);
    }
  }, [email]);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${baseUrl}/api/v1/otp-verify`, { otp, userEmail });
    const verifiedOtp = response.data.response[0].otp;
    if (verifiedOtp === otp) {
      navigate('/');
    } else {
      navigate('/email-verification');
    }
    setOtp('');
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div>
      <OfferBar />
      <Navbar />
      <BottomBar />
      <div className='h-[450px] flex justify-center items-center '>
        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-4 w-[300px] h-[250px]  rounded-sm border border-[#E4E7E9]'>
          <div className='font-semibold text-[14px]'>Verify Your Email Address</div>
          <div className='w-[90%] text-[#5F6C72] text-[12px] flex justify-center'>Lorem ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur </div>
          <div className='flex  flex-col gap-2 bg-red- w-[90%]'>
            <div className='flex justify-between'>
              <div className='text-[12px] font-semibold '>OTP</div>
              <div className='text-[12px] font-semibold text-[#2DA5F3]'>
                Resent OTP
              </div>
            </div>
            <input value={otp} type='text' className='border outline-none  h-[35px]' onChange={(e) => setOtp(e.target.value)} />
          </div>
          <button className='w-[100%] flex justify-center cursor-pointer' type='submit'>
            <FilledButton value="VERIFY ME" w="90%" />
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EmailVerificationPage;
