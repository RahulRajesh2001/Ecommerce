import React, { useState, useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import axios from 'axios'
import { baseUrl } from '../../../baseUrl.js'



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }
const ChooseAddresss = ({chooseAddress}) => {

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [addresses,setAddress]=useState([])

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
            console.log(res.data.shippingAddresses)
            setAddress(res.data.shippingAddresses)
          })
          .catch((err) => {
            console.log(err)
          })
      }, [open])

  return (
    
    <div>
      <Button className='text-[#FFFF]' onClick={handleOpen}>Choose add</Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
           <div className=' h-full w-[100%]'>
            {/*upper part */}
                <div className=' h-[100%] overflow-auto'>
                        <div className=' border h-[20%] rounded-sm justify-center  flex flex-col'>
                        {addresses.map((address)=>(
                            <div key={address._id} className=' w-[100%] flex justify-center items-center'>
                            <div className='w-[60%] '>
                            <div className='font-Josefin font-semibold text-[16px] ml-5'>{address.name}</div>
                            <div className='font-Josefin font-semibold text-[16px] ml-5'>{address.address}</div>
                            </div>
                            <div className='w-[40%] flex justify-evenly items-center'>
                            <div className='font-Josefin font-semibold text-[16px] ml-5'>{address.pincode}</div>
                            <button className='font-bold' onClick={() => { handleClose(); chooseAddress(address._id); }}>Add</button>
                            </div>
                            </div>
                        ))}
                        </div>
                </div>
           </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default ChooseAddresss