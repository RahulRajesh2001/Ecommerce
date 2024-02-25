import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import SideBar from '../../components/sidebar/SideBar'
import 'bootstrap/dist/css/bootstrap.css'
import { Link, useParams } from 'react-router-dom'
import AddCategoryPopUP from '../addCategoryPopup/AddCategoryPopUP'
import axios from 'axios'
import { baseUrl } from '../../../baseURL'

const CategoryList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const categoriesPerPage = 12

  const [categories, setCategories] = useState([])
  const indexOfLastCategory = currentPage * categoriesPerPage
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  )

  const totalPages = Math.ceil(categories.length / categoriesPerPage)
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  )

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  useEffect(() => {
    try {
      axios
        .get(`${baseUrl}/api/v1/admin/categories`)
        .then((res) => {
          setCategories(res.data.categories)
            //addcategory
             const addCategory=()=>{
                    setCategories(res.data.categories)
                 }
  
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (err) {
      console.log(err)
    }
  }, [])


  //category delete
  const handleDelete=(id)=>{
   axios.get(`${baseUrl}/api/v1/admin/deleteCategory`,{params:{id}}).then((res)=>{
    setCategories(res.data.categories)
   })

  }

  return (
    <div className='flex bg-[#F5F5F9]'>
      <SideBar />
      <div className='w-[100%] flex flex-col items-center'>
        <Navbar />
        <div className='w-[98%] h-full rounded-lg flex flex-col'>
          <div className='flex justify-end mr-20 w-[100%] mb-2 '>
            <div className='w-[150px] h-[50px] flex justify-center items-center'>
              <AddCategoryPopUP />
            </div>
          </div>
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>--</th>
                <th>CATEGORIES</th>
                <th>TOTAL PRODUCTS</th>
                <th>---</th>
                <th>---</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentCategories.map((category) => (
                    category.isDeleted==false ? <tr key={category._id}>
                    <td>{category._id}</td>
                    <td></td>
                    <td>{category.title}</td>
                    <td>{category.description}</td>
                    <td></td>
                    <td></td>
                    <td className='flex'>
                      <div className='w-[100px] h-[50px] flex justify-center items-center bg-[#696CFF] text-[#ffff] rounded-md mr-5 font-Playfair cursor-pointer'>
                        EDIT
                      </div>
                      <div onClick={()=>handleDelete(category._id)}  className='w-[100px] h-[50px] flex justify-center items-center bg-red-400 text-[#ffff] rounded-md mr-5 font-Playfair cursor-pointer'>
                        DELETE
                      </div>
                    </td>
                  </tr> : ""
              ))}
            </tbody>
          </table>
          <nav>
            <ul className='pagination'>
              <li className='page-item'>
                <button
                  className='page-link'
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
              </li>
              {pageNumbers.map((number) => (
                <li
                  key={number}
                  className={`page-item ${
                    currentPage === number ? 'active' : ''
                  }`}
                >
                  <button
                    className='page-link'
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </button>
                </li>
              ))}
              <li className='page-item'>
                <button
                  className='page-link'
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default CategoryList
