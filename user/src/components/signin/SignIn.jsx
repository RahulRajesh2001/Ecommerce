import React from 'react'
import FilledButton from '../../components/buttons/filledbutton/FilledButton'
import Google from '../../assets/Google.png'

const SignIn = () => {
  return (
    <div>
      {/*signinbody*/}
      <div className='flex flex-col justify-center ml-[20px] mt-[10px] w-[90%] gap-2'>
        {/*input box*/}
        <div className='flex  flex-col gap-2 '>
          <div className='text-[12px] font-semibold '>Email Address</div>
          <input type='email' className='border outline-none  h-[35px]' />
        </div>
        {/*input box*/}
        <div className='flex  flex-col gap-2 '>
          <div className='flex justify-between'>
            <div className='text-[12px] font-semibold '>Password</div>
            <div className='text-[12px] font-semibold text-[#2DA5F3]'>
              Forget Password
            </div>
          </div>
          <input type='password' className='border outline-none  h-[35px]' />
        </div>
        <div className='mt-2'>
          <FilledButton value='SIGN IN' w='100%' />
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

export default SignIn
