import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import SideBar from '../../components/sidebar/SideBar'
import 'bootstrap/dist/css/bootstrap.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from '../../../baseURL'
import AddBaseProduct from '../addBaseproduct/AddBaseProduct'
import {
  setBaseProductId,
  setBaseProducts,
} from '../../../redux/reducers/BaseProductSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { MdDelete } from 'react-icons/md'
import EditBaseProductPage from '../editBaseProductPage/EditBaseProductPage'

const BaseProducts = () => {
  const baseproducts = useSelector((state) => state.baseProducts.baseProducts)

  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const recordPerPage = 8
  const firstIndex = (currentPage - 1) * recordPerPage
  const lastIndex = currentPage * recordPerPage
  const records = baseproducts.slice(firstIndex, lastIndex)
  const npage = Math.ceil(baseproducts.length / recordPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)

  useEffect(() => {
    fetchProducts()
  }, [])

  // Fetch products from the API
  const token = localStorage.getItem('adminLogin')
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/admin/getBaseProducts`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      dispatch(setBaseProducts(response.data.products))
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const changeCurrentPage = (n) => {
    setCurrentPage(n)
  }

  const nextPage = () => {
    if (currentPage !== Math.ceil(baseproducts.length / recordPerPage)) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleSetBaseProductId = (id) => {
    dispatch(setBaseProductId(id))
  }

  //handle Delete
  const handleDelete = async (id) => {
    await axios
      .get(`${baseUrl}/api/v1/admin/deleteBaseProduct`, {
        params: { id },
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        dispatch(setBaseProducts(res.data.savedProduct))
        if (res.status == 200) {
          alert(res.data.message)
        } else {
          alert(res.data.message)
        }
      })
  }

  //handle Edit
  const handleEdit = async (id) => {
    console.log(id)
  }

  return (
    <div className='flex bg-[#F5F5F9]'>
      <SideBar />
      <div className='w-[100%] flex flex-col items-center'>
        <Navbar />
        <div className='w-[98%] h-full rounded-lg flex flex-col'>
          <div className='flex justify-end mr-20  w-[100%] mb-2 '>
            <AddBaseProduct />
          </div>
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>

                <th>PRODUCT</th>
                <th>CATEGORY</th>
                <th></th>
                <th>ADD VARIENTS</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {baseproducts.map(
                (product, index) =>
                  !product.isDeleted && (
                    <tr key={product._id}>
                      <td>{index + 1}</td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td></td>

                      <td>
                        <Link to='/varients'>
                          <div
                            onClick={() => handleSetBaseProductId(product._id)}
                            className='w-[150px] h-[50px] flex justify-center items-center bg-[#696CFF] text-[#ffff] rounded-md mr-5 font-Playfair'
                          >
                            ADD VARIANTS
                          </div>
                        </Link>
                      </td>
                      <td
                        onClick={() => handleEdit(product._id)}
                        className='text-[25px] cursor-pointer'
                      >
                        <EditBaseProductPage id={product._id} />
                      </td>
                      <td
                        onClick={() => handleDelete(product._id)}
                        className='text-[25px] cursor-pointer'
                      >
                        <MdDelete />
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
              {[
                ...Array(Math.ceil(baseproducts.length / recordPerPage)).keys(),
              ].map((n, i) => (
                <li
                  className={`page-item ${
                    currentPage === n + 1 ? 'active' : ''
                  }`}
                  key={i}
                >
                  <a
                    href='#'
                    className='page-link'
                    onClick={() => changeCurrentPage(n + 1)}
                  >
                    {n + 1}
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
  )
}

export default BaseProducts
