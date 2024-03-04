import React, { useState } from 'react';
import OfferBar from '../../components/offerbar/OfferBar';
import Navbar from '../../components/navbar/Navbar';
import BottomBar from '../../components/bottombar/BottomBar';
import Footer from '../../components/footer/Footer';
import FilledButton from '../../components/buttons/filledbutton/FilledButton';
import axios from 'axios';
import { baseUrl } from '../../../baseUrl.js';
import { useNavigate } from 'react-router-dom';

const EmailSubmissionForgetPass = () => {
    const navigate=useNavigate()
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/v1/forgetPassword`, { email });
      if(response.status == 200){
        alert(response.data.message)
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div>
      <OfferBar />
      <Navbar />
      <BottomBar />
      <div className='h-[450px] flex justify-center items-center '>
        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-4 w-[300px] h-[300px]  rounded-sm border border-[#E4E7E9]'>
          <div className='font-semibold text-[14px]'>Reset Password</div>
          <div className='w-[90%] text-[#5F6C72] text-[12px] flex justify-center'>
            Lorem ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur{' '}
          </div>

          <div className='flex  flex-col gap-2 bg-red- w-[90%]'>
            <div className='flex justify-between'>
              <div className='text-[12px] font-semibold '>Enter Email</div>
            </div>
            <input onChange={(e) => setEmail(e.target.value)} type='email' className='border outline-none  h-[35px]' />
          </div>

          <button type='submit' className='w-[100%] flex justify-center' >
            <FilledButton value='RESET PASSWORD' w='90%' />
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EmailSubmissionForgetPass;
