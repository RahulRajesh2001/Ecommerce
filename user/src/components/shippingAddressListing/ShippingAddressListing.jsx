import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import AddShippingAddress from '../addShippingAddresModal/AddShippingAddress.jsx'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setShippingAddress } from '../../../redux/reducers/userSlice.js'
import { baseUrl } from '../../../baseUrl.js'
import EditShippingAddress from '../ediShippingAddress/EditShippingAddress.jsx'

const ShippingAddressListing = () => {
  const dispatch = useDispatch()

  const addresses = useSelector((state) => state.user.shippingAddress)

  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('userToken')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  })

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/getShippingAddress`)
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data.shippingAddresses)
          dispatch(setShippingAddress(res.data.shippingAddresses))
        } else {
          alert(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [dispatch])

  const handleDelete = (id) => {
    axios
      .delete(`${baseUrl}/api/v1/deleteShippingAddress?id=${id}`)
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message)
          dispatch(setShippingAddress(res.data.existingAddresses))
        } else {
          alert(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }



  return (
    <div className=' w-[100%] h-[300px] flex flex-col justify-center items-center gap-2  mt-[50px] '>
      <div className='flex justify-around w-[100%] items-center '>
        <div className='flex font-semibold text-[18px] '>Account Setting</div>
        <div className='cursor-pointer '>
          <AddShippingAddress />
        </div>
      </div>
      <div className='overflow-auto w-[100%] flex flex-col gap-2'>
        {/*Address part*/}
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <div
              key={address._id}
              className='w-[70%] h-[100px]  flex flex-col gap-2 justify-center border p-2'
            >
              <div className='flex justify-around'>
                <div className='font-semibold font-Josefin'>{address.name}</div>
                <div className='flex gap-5'>
                  <MdDelete 
                    onClick={() => handleDelete(address._id)}
                    className='text-[20px] cursor-pointer mt-2'
                  />
                  <div className='text-[20px] cursor-pointer'  >
                  <EditShippingAddress  id={address._id}/>
                  </div>
                 
                </div>
              </div>
              <div>{address.address}</div>
              <div className='font-semibold font-Josefin'>
                {address.pincode}
              </div>
            </div>
          ))
        ) : (
          <div>There are no addresses</div>
        )}
      </div>
    </div>
  )
}

export default ShippingAddressListing
