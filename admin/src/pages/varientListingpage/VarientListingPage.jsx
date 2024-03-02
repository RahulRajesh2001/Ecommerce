import React, { useEffect, useState } from 'react'
import SideBar from '../../components/sidebar/SideBar'
import Navbar from '../../components/navbar/Navbar'
import 'bootstrap/dist/css/bootstrap.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaRegEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import { baseUrl } from '../../../baseURL'
import { setProducts } from '../../../redux/reducers/ProductSlice.js'

const VarientListingPage = () => {
  const dispatch = useDispatch()
  const fullproducts = useSelector((state) => state.products.Products)

  // Fetching id from state
  const id = useSelector((state) => state.baseProducts.productId)

  // Filter specific product based on ID
  const specificProduct = products.find((product) => product._id === id)

  const [varients, setVarients] = useState(specificProduct.variants)

  const [currentPage, setCurrentPage] = useState(1)
  const recordPerPage = 8
  const firstIndex = (currentPage - 1) * recordPerPage
  const lastIndex = currentPage * recordPerPage
  const records = products.slice(firstIndex, lastIndex)
  const npage = Math.ceil(products.length / recordPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1)
    }
  }

  function changeCurrentPage(n) {
    setCurrentPage(n)
  }

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const token = localStorage.getItem('adminLogin')

  //for edint the varient
  const handleEdit = (id) => {
    console.log(id)
  }

//fetching the baseproduct data
useEffect(()=>{
    try{
        axios.get(`${baseUrl}/api/v1/admin/productVarients`).then((res)=>{
            console.log("varients",res)
        })
    }catch(err){

    }

},[])



  //for edint the varient
  const handleDelete = async (id) => {
    await axios
      .get(`${baseUrl}/api/v1/admin/deleteVarient`, {
        params: { id },
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data.updatedVarients)
        dispatch(setProducts(res.data.updatedVarients))
      })
  }

  return (
    <div className='flex bg-[#F5F5F9] '>
      <SideBar />
      <div className='w-[100%] flex flex-col items-center'>
        <Navbar />
        <div className='w-[98%] h-full rounded-lg flex justify-evenly'>
          <div className='w-[98%] h-full rounded-lg '>
            <Link to='/add-product'>
              <div className='w-[150px] h-[50px] flex justify-center items-center bg-[#696CFF] text-[#ffff] rounded-md mr-5 font-Playfair mb-2 a'>
                ADD VARIANTS
              </div>
            </Link>
            <table className='table'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>IMG</th>
                  <th>NAME</th>
                  <th>SALE ₹</th>
                  <th>REGULAR ₹</th>
                  <th>STOCK</th>
                  <th>COLOR</th>
                  <th>EDIT</th>
                  <th>DELETE</th>
                </tr>
              </thead>
              <tbody>
                {varients.map(
                  (variant) =>
                    variant.isDeleted === false && (
                      <tr key={variant._id}>
                        <td>{variant._id}</td>
                        <td>
                          <img
                            src={variant.images[0]}
                            className='w-[50px] h-[50px] rounded-sm'
                          />
                        </td>
                        <td>{variant.varientName}</td>
                        <td>{variant.salePrice}</td>
                        <td>{variant.regularPrice}</td>
                        <td>{variant.stock}</td>
                        <td>{variant.color}</td>
                        <td>
                          <FaRegEdit
                            className='text-[25px] cursor-pointer'
                            onClick={() => handleEdit(variant._id)}
                          />
                        </td>
                        <td>
                          <MdDelete
                            className='text-[25px] cursor-pointer'
                            onClick={() => handleDelete(variant._id)}
                          />
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
            <nav>
              <ul className='pagination'>
                <li className='page-item'>
                  <a href='#' className='page-link' onClick={prePage}>
                    Prev
                  </a>
                </li>
                {numbers.map((n, i) => (
                  <li
                    className={`page-item ${currentPage === n ? 'active' : ''}`}
                    key={i}
                  >
                    <a
                      href='#'
                      className='page-link'
                      onClick={() => changeCurrentPage(n)}
                    >
                      {n}
                    </a>
                  </li>
                ))}
                <li className='page-item'>
                  <a href='#' className='page-link' onClick={nextPage}>
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VarientListingPage
