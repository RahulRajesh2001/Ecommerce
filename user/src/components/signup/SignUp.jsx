import React, { useState } from 'react'
import FilledButton from '../../components/buttons/filledbutton/FilledButton'
import Google from '../../assets/Google.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../../../baseUrl.js'
import { useDispatch } from 'react-redux'
import { setEmailvalue } from '../../../redux/reducers/otpSlice.js'
import { useFormik } from 'formik'
import { signupSchema } from '../../formValidationSchema/signUpValidation.js'

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (values, actions) => {
    const user = {
      email: values.email,
      password: values.password,
      name: values.name,
      confirmPassword: values.confirmPassword,
    }

    try {
      const registerResponse = await axios.post(
        `${baseUrl}/api/v1/register`,
        user
      )

      if (registerResponse.data) {
        const otpGenerationResponse = await axios.post(
          `${baseUrl}/api/v1/otp-generation`,
          { email: registerResponse.data.user.email }
        )
        dispatch(setEmailvalue({email: registerResponse.data.user.email }))
        if (otpGenerationResponse.status == 200) {
          alert(registerResponse.data.message)
          navigate('/email-verification')
        } else {
         alert(registerResponse.data.message)
          navigate('/register')
        }
      }
    } catch (err) {
      console.error('Error occurred when user registering..!', err)
      alert('Some error occurred..!')
    }
    actions.resetForm()
  }

  //formik validation
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    },
    validationSchema: signupSchema,
    onSubmit,
  })

  return (
    <div>
      {/*signinbody*/}
      <form
        onSubmit={handleSubmit}
        className='flex flex-col justify-center ml-[20px] mt-[10px] w-[90%] gap-2'
      >
        {/*input box*/}

        <div className='flex  flex-col gap-2 '>
          <div className='text-[12px] font-semibold '>Full Name</div>
          <input
            name='name'
            type='text'
            className={`border h-[35px]  ${
              errors.name ? 'outline-red-400 ' : 'outline-none'
            }`}
            value={values.name}
            onChange={handleChange}
          />
          {errors.name ? <p className='text-[10px] '>{errors.name}</p> : ''}
        </div>
        {/*input box*/}
        <div className='flex  flex-col gap-2 '>
          <div className='text-[12px] font-semibold '>Email Address</div>
          <input
            name='email'
            type='email'
            className={`border h-[35px]  ${
              errors.email ? 'outline-red-400 ' : 'outline-none'
            }`}
            value={values.email}
            onChange={handleChange}
          />
          {errors.email ? <p className='text-[10px] '>{errors.email}</p> : ''}
        </div>
        {/*input box*/}
        <div className='flex  flex-col gap-2 '>
          <div className='text-[12px] font-semibold '>Password</div>
          <input
            name='password'
            type='password'
            className={`border h-[35px]  ${
              errors.password ? 'outline-red-400 ' : 'outline-none'
            }`}
            value={values.password}
            onChange={handleChange}
          />
          {errors.password ? (
            <p className='text-[10px] '>{errors.password}</p>
          ) : (
            ''
          )}
        </div>
        {/*input box*/}
        <div className='flex  flex-col gap-2 '>
          <div className='flex justify-between'>
            <div className='text-[12px] font-semibold '>Confirm Password</div>
            <div className='text-[12px] font-semibold text-[#2DA5F3]'>
              Forget Password
            </div>
          </div>
          <input
            name='confirmPassword'
            type='password'
            className={`border h-[35px]  ${
              errors.confirmPassword ? 'outline-red-400 ' : 'outline-none'
            }`}
            value={values.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword ? (
            <p className='text-[10px] '>{errors.confirmPassword}</p>
          ) : (
            ''
          )}
        </div>
        <div disabled={isSubmitting} className='mt-2' onClick={handleSubmit}>
          <FilledButton value='SIGN UP' w='100%' type='submit' />
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
      </form>
    </div>
  )
}

export default SignUp
