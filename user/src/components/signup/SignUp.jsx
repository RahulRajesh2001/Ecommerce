import React, { useState } from 'react'
import FilledButton from '../../components/buttons/filledbutton/FilledButton'
import Google from '../../assets/Google.png'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {baseUrl} from '../../../baseUrl.js'
import { useDispatch } from 'react-redux'
import { setEmailvalue } from '../../../redux/reducers/otpSlice.js'




const SignUp = () => {
  const dispatch=useDispatch()
const navigate=useNavigate()
const [name,setName]=useState("rahul")
const [email,setEmail]=useState("rahulrjev@gmail.com")
const [password,setPassword]=useState("12345")
const [confirmPassword,setConfirmPassword]=useState("12345")


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const user = {
      name,
      email,
      password,
      confirmPassword
    };

    const registerResponse = await axios.post(`${baseUrl}/api/v1/register`, user);
    console.log(registerResponse.data.user.email);
    
    if (registerResponse.data) {
      const otpGenerationResponse = await axios.post(`${baseUrl}/api/v1/otp-generation`, { email:registerResponse.data.user.email });
      dispatch(setEmailvalue({ email: registerResponse.data.user.email }));
      if(otpGenerationResponse.status==200){  
        console.log(otpGenerationResponse)
        navigate('/email-verification')
      }else{
        navigate('/register')
      }
    }
  } catch (err) {
    console.error("Error occurred when user registering..!", err);
    alert("Some error occurred..!");
  }
};



  return (
    <div>
      {/*signinbody*/}
      <div className='flex flex-col justify-center ml-[20px] mt-[10px] w-[90%] gap-2'>
        {/*input box*/}

        <div className='flex  flex-col gap-2 '>
          <div className='text-[12px] font-semibold '>Full Name</div>
          <input value={name} type='text' className='border outline-none  h-[35px]' onChange={(e)=>setName(e.target.value)} />
        </div>
        {/*input box*/}
        <div className='flex  flex-col gap-2 '>
          <div className='text-[12px] font-semibold '>Email Address</div>
          <input value={email} type='email' className='border outline-none  h-[35px]' onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        {/*input box*/}
        <div className='flex  flex-col gap-2 '>
          <div className='text-[12px] font-semibold '>Password</div>
          <input value={password} type='text' className='border outline-none  h-[35px]' onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        {/*input box*/}
        <div className='flex  flex-col gap-2 '>
          <div className='flex justify-between'>
            <div className='text-[12px] font-semibold '>Confirm Password</div>
            <div className='text-[12px] font-semibold text-[#2DA5F3]'>
              Forget Password
            </div>
          </div>
          <input value={confirmPassword} type='password' className='border outline-none  h-[35px]'  onChange={(e)=>setConfirmPassword(e.target.value)}/>
        </div>
        <div className='mt-2' onClick={handleSubmit} >
          <FilledButton   value='SIGN UP' w='100%' type="submit"/>
        </div>

        <div className='h-[1px] bg-[#E4E7E9] mt-2'></div>
        {/*O Auth*/}
        <div className='h-[35px] border border-[#E4E7E9] flex  items-center mt-5'>
          <img src={Google} alt='' className='ml-[10px]' />
          <div className='text-[11px] text-[#475156]  ml-16'>
            Login with Google
          </div>
        </div>
        {/*O Auth*/}
        <div className='h-[35px] border border-[#E4E7E9] flex  items-center'>
          <img src={Google} alt='' className='ml-[10px]' />
          <div className='text-[11px] text-[#475156]  ml-16'>
            Login with Google
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
