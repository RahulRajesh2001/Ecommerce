import React, { useEffect, useState } from 'react'
import SideBar from '../../components/sidebar/SideBar'
import Navbar from '../../components/navbar/Navbar'
import 'bootstrap/dist/css/bootstrap.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const VarientListingPage = () => {
    const fullproducts = useSelector((state) => state.products.Products)
    const [products, setProducts] = useState(fullproducts)

    // Fetching id from state
    const id = useSelector((state) => state.baseProducts.productId)

    // Filter specific product based on ID
    const specificProduct = products.find(product => product._id === id)

    console.log(specificProduct.variants)

    const [varients,setVarients]=useState(specificProduct.variants)

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

    return (
        
        <div className='flex bg-[#F5F5F9] '>
            <SideBar />
            <div className='w-[100%] flex flex-col items-center'>
                <Navbar />
                <div className='w-[98%] h-full rounded-lg flex justify-evenly'>
 
                    <div className='w-[98%] h-full rounded-lg '>
                    <Link to='/add-product'>
                        <div
                          className='w-[150px] h-[50px] flex justify-center items-center bg-[#696CFF] text-[#ffff] rounded-md mr-5 font-Playfair mb-2 a'
                        >
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
                                </tr>
                            </thead>
                            <tbody>
                                {varients.map((varients)=>(
                                    <tr>
                                    <td>{varients._id}</td>
                                    <td>
                                        <img
                                            src={varients.images[0]}
                                            className='w-[50px] h-[50px] rounded-sm'
                                        />
                                    </td>
                                    <td>{varients.varientName}</td>
                                    <td>{varients.salePrice}</td>
                                    <td>{varients.regularPrice}</td>
                                    <td>{varients.stock}</td>
                                    <td>{varients.color}</td>
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
