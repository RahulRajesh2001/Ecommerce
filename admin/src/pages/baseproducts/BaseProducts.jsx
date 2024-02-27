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
} from '../../../redux/reducers/BaseProductSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '../../../redux/reducers/ProductSlice'

const BaseProducts = () => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const recordPerPage = 8
  const firstIndex = (currentPage - 1) * recordPerPage
  const lastIndex = currentPage * recordPerPage
  const baseproducts = useSelector((state) => state.baseProducts.baseProducts)

  useEffect(() => {
    fetchProducts()
  }, [])

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/v1/admin/getAllProducts`)
      dispatch(setBaseProducts(response.data))
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }
  //for fetch full products
  useEffect(()=>{
    axios.get(`${baseUrl}/api/v1/admin/fullProducts`).then((res)=>{
        dispatch(setProducts(res.data.products))
    })
  },[])

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
                <th></th>
                <th>PRODUCT</th>
                <th>CATEGORY</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {baseproducts
                .slice(firstIndex, lastIndex)
                .map((product, index) => (
                  <tr key={index}>
                    <td>{product._id}</td>
                    <td></td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td></td>
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
                  </tr>
                ))}
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
