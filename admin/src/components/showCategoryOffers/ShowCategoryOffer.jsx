import React, { useState, useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import axios from 'axios'
import { baseUrl } from '../../../baseURL.js'
import { MdDelete } from 'react-icons/md'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

const ShowCategoryOffer = ({categoryId }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [update, setUpdate] = useState(true)
  const [offers, setOffers] = useState([])
  const [appliedOffer, setAppliedOffer] = useState([])
  const token = localStorage.getItem('adminLogin')

  useEffect(() => {
    axios.get(`${baseUrl}/api/v1/admin/getAllOffers`, { headers: { Authorization: token } })
      .then((res) => {
        setOffers(res.data.offers)
      })
      .catch((err) => {
        console.log('Error fetching offers:', err)
      })
  }, [open, update, token])



  useEffect(() => {
    axios.get(`${baseUrl}/api/v1/admin/getAppliedOffer`, { params: { categoryId }, headers: { Authorization: token } })
      .then((res) => {
        setAppliedOffer(res.data.categoryOffer)
      })
      .catch((err) => {
        console.log('Error fetching applied offer:', err)
      })
  }, [open, update, categoryId, token])

  const applyCategoryOffer = (id) => {
    axios.post(`${baseUrl}/api/v1/admin/applyCategoryOffer`, { id, categoryId }, { headers: { Authorization: token } })
      .then((res) => {
        setUpdate(!update)
        alert(res.data.message)
      })
      .catch((err) => {
        console.log('Error applying category offer:', err)
      })
  }

  const handleDelete = (id, categoryid) => {
    axios.delete(`${baseUrl}/api/v1/admin/deleteAppliedCategoryOffer`, { params: { id, categoryid }, headers: { Authorization: token } })
      .then((res) => {
        console.log(res)
        setUpdate(!update)
        handleClose()
      })
      .catch((err) => {
        console.log('Error deleting applied category offer:', err)
      })
  }

  return (
    <div>
      <Button className='text-[#FFFF]' onClick={handleOpen}>
        Show
      </Button>
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
            <div className='h-full w-[100%]'>
              <div className='h-[50%] overflow-auto'>
                <div className='font-Playfair font-bold'>Offers</div>
                {offers.map((offer) =>
                  offer.offerType == 'Category' ? (
                    <div className='border h-[100px] rounded-sm justify-center flex flex-col' key={offer._id}>
                      <div className='w-[100%] flex justify-center items-center'>
                        <div className='w-[60%]'>
                          <div className='font-Josefin font-semibold text-[16px] ml-5'>{offer.offerName}</div>
                          <div className='font-Josefin font-semibold text-[16px] ml-5'>{offer.offerType}</div>
                        </div>
                        <div className='w-[40%] flex justify-evenly items-center'>
                          <div className='font-Josefin font-semibold text-[16px] ml-5'>
                            {offer.discountType === 'Percentage' ? `${offer.discountValue}%` : `${offer.discountValue} ₹`}
                          </div>
                          <div>
                            <button className='w-[80px] rounded-lg font-bold text-[#ffff] h-[30px] flex justify-center items-center bg-green-500' onClick={() => applyCategoryOffer(offer._id)}>APPLY</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null
                )}
              </div>

              <div className='w-[100%] h-[1px] bg-black'></div>

              <div className='h-[50%] overflow-auto'>
                <div className='font-Playfair font-bold'>Offers Added</div>
                {appliedOffer.map((offer) => (
                  <div className='border h-[100px] rounded-sm justify-center flex flex-col' key={offer._id}>
                    <div className='w-[100%] flex justify-center items-center'>
                      <div className='w-[60%]'>
                        <div className='font-Josefin font-semibold text-[16px] ml-5'>{offer.offerName}</div>
                        <div className='font-Josefin font-semibold text-[16px] ml-5'>{offer.offerType}</div>
                      </div>
                      <div className='w-[40%] flex justify-evenly items-center'>
                        <div className='font-Josefin font-semibold text-[16px] ml-5'>
                          {offer.discountType === 'Percentage' ? `${offer.discountValue}%` : `${offer.discountValue} ₹`}
                        </div>
                        <MdDelete className='text-[25px] cursor-pointer' onClick={() => handleDelete(offer._id, categoryId)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default ShowCategoryOffer
