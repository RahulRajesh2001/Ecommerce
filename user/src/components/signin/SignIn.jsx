import React, { useState } from 'react'
import FilledButton from '../../components/buttons/filledbutton/FilledButton'
import Google from '../../assets/Google.png'
import axios from 'axios'
import { baseUrl } from '../../../baseUrl.js'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../redux/reducers/userSlice.js'
import { useFormik } from 'formik'
import { loginSchema } from '../../formValidationSchema/loginFormValidation.js'

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = (values, actions) => {
    const user = {
      email: values.email,
      password: values.password,
    }
    try {
      axios.post(`${baseUrl}/api/v1/login`, user).then((response) => {
        dispatch(setUser(response.data))
        if (response.status == 200) {
          alert(response.data.message)
          navigate('/')
        } else {
          alert(response.data.message)
          navigate('/loginSignup')
        }
      })
    } catch (error) {
      console.log(error)
      navigate('/loginSignup')
      notify('Check your details')
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
    },
    validationSchema: loginSchema,
    onSubmit,
  })

  return (
    <div>
      {/*signinbody*/}
      <div className='flex flex-col justify-center ml-[20px] mt-[10px] w-[90%] gap-2'>
        {/*From validation*/}
        <form className='flex justify-center flex-col' onSubmit={handleSubmit}>
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
            <div className='flex justify-between'>
              <div className='text-[12px] font-semibold '>Password</div>
              <div className='text-[12px] font-semibold text-[#2DA5F3]'>
                Forget Password
              </div>
            </div>
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
          <button className='mt-2' type='submit' disabled={isSubmitting}>
            <FilledButton value='SIGN IN' w='100%' />
          </button>
        </form>
        {/*0auth section*/}
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
