import React, { useState, useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import axios from 'axios'
import { baseUrl } from '../../../baseURL.js'
import { MdDelete } from 'react-icons/md'
import Swal from 'sweetalert2'
import { MdAddCircleOutline } from "react-icons/md";

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

const ShowOfferModal = ({ getOfferId, varientId, added }) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  //updateing the offers
  const [update, setUpdate] = useState(false)

  const [offers, setOffers] = useState([])

  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminLogin')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  })
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/admin/getAllOffers`)
      .then((res) => {
        setOffers(res.data.offers)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [open, update, added])

  //get all added offers
  const [addedOffer, setAddedOffer] = useState([])
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/admin/getAllAddedOffers`, {
        params: { varientId },
      })
      .then((res) => {
        setAddedOffer(res.data.offers)
      })
      .catch((err) => {
        Swal.fire({
          text: err.response.data.message,
          icon: "error"
        });
      })
  }, [open, update, added])

  //delete offer
  const handleDelete = (id) => {
    axios
      .delete(`${baseUrl}/api/v1/admin/deleteAddedOffer`, {
        params: { id, varientId },
      })
      .then((res) => {
        Swal.fire({
          text: res.data.message,
          icon: "success"
        });
        setUpdate(!update);
      })
      .catch((err) => {
        Swal.fire({
          text: err.response.data.message,
          icon: "error"
        });
      });
  };

  //for applyoffer
  const applyOffer = () => {
    axios
      .get(`${baseUrl}/api/v1/admin/applyOffer`, {
        params: { varientId },
      })
      .then((res) => {
        console.log(res);
        Swal.fire({
          text: res.data.message,
          icon: "success"
        });
        setUpdate(!update);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          text:err.response.data.message,
          icon: "error"
        });
      });
  };
  

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
            <div className=' h-full w-[100%]'>
              {/*upper part */}
              <div className=' h-[50%]  overflow-auto '>
                <div className='font-Playfair font-bold'>Offers</div>
                {offers.map((offer) =>
                  offer.offerType == 'Product' ? (
                    <div className=' border h-[100px] rounded-sm justify-center  flex flex-col '>
                      <div
                        key={offer._id}
                        className=' w-[100%] flex justify-center items-center'
                      >
                        <div className='w-[60%]'>
                          <div className='font-Josefin font-semibold text-[16px] ml-5'>
                            {offer.offerName}
                          </div>
                          <div className='font-Josefin font-semibold text-[16px] ml-5'>
                            {offer.offerType}
                          </div>
                        </div>
                        <div className='w-[40%] flex justify-evenly items-center'>
                          <div className='font-Josefin font-semibold text-[16px] ml-5'>
                            {offer.discountType === 'Percentage'
                              ? `${offer.discountValue}%`
                              : `${offer.discountValue} ₹`}
                          </div>
                          <div
                            className='font-bold cursor-pointer'
                            onClick={() => getOfferId(offer._id, varientId)}
                          >
                            <MdAddCircleOutline className='text-[25px]' />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null
                )}
              </div>

              <div className='w-[100%] h-[1px] bg-black'></div>

              <div className=' h-[50%]  overflow-auto'>
                <div className='font-Playfair font-bold'>Offers Added</div>

                {addedOffer.map((offer) =>
                offer.offerType == 'Product' ? (
                    <div
                      className='border h-[100px] rounded-sm justify-center flex flex-col'
                      key={offer._id}
                    >
                      <div className='w-[100%] flex justify-center items-center'>
                        {offer.productId[0] === varientId ? (
                          <div className='w-[10px] h-[10px] bg-green-500 rounded-full ml-5'></div>
                        ) : (
                          <div className='w-[10px] h-[10px] bg-red-500 rounded-full ml-5'></div>
                        )}
                        <div className='w-[60%]'>
                          <div className='font-Josefin font-semibold text-[16px] ml-5'>
                            {offer.offerName}
                          </div>
                          <div className='font-Josefin font-semibold text-[16px] ml-5'>
                            {offer.offerType}
                          </div>
                        </div>
                        <div className='w-[40%] flex justify-evenly items-center'>
                          <div className='font-Josefin font-semibold text-[16px] ml-5'>
                            {offer.discountType === 'Percentage'
                              ? `${offer.discountValue}%`
                              : `${offer.discountValue} ₹`}
                          </div>
                          <MdDelete
                            className='text-[25px] cursor-pointer'
                            onClick={() => handleDelete(offer._id)}
                          />
                        </div>
                      </div>
                    </div>
                    ) : null
                )}

                <div className='w-[100%] flex justify-center items-center '>
                  <button
                    className='w-[100px] rounded-lg font-bold text-[#ffff] h-[50px] flex justify-center items-center bg-green-500 mt-3'
                    onClick={() => applyOffer()}
                  >
                    APPLY
                  </button>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default ShowOfferModal
