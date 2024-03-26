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
import { MdAddCircleOutline } from 'react-icons/md'

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

const ShowCategoryOffer = ({ categoryId }) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  //for all offers
  const [offers, setOffers] = useState([])
  //axios interceptor
  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminLogin')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  })

  //for fetching all offers
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/admin/getAllOffers`)
      .then((res) => {
        setOffers(res.data.offers)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const token = localStorage.getItem('userToken')
  //for apply offer
  const applyCategoryOffer = (id) => {
    axios
      .post(
        `${baseUrl}/api/v1/admin/applyCategoryOffer`,
        { id, categoryId },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        alert(res.data.message)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //getting category applied for a category
  const [appliedOffer,setAppliedOffer]=useState([])
  useEffect(() => {
    try {
      axios
        .get(`${baseUrl}/api/v1/admin/getAppliedOffer`, {
          params: { categoryId },
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setAppliedOffer(res.data.categoryOffer)
        })
    } catch (err) {
      console.log(err)
    }
  }, [open])

  //for deleting applied offer
  const handleDelete=(id)=>{
    
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
            <div className=' h-full w-[100%]'>
              {/*upper part */}
              <div className=' h-[50%]  overflow-auto '>
                <div className='font-Playfair font-bold'>Offers</div>
                {offers.map((offer) =>
                  offer.offerType == 'Category' ? (
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
                          <div>
                            <button
                              className='w-[80px] rounded-lg font-bold text-[#ffff] h-[30px] flex justify-center items-center bg-green-500 '
                              onClick={() => applyCategoryOffer(offer._id)}
                            >
                              APPLY
                            </button>
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

                {appliedOffer.map((offer) => (
                  <div
                    className='border h-[100px] rounded-sm justify-center flex flex-col'
                    key={offer._id}
                  >
                    <div className='w-[100%] flex justify-center items-center'>
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
