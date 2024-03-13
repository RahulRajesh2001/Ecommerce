    import React, { useEffect, useState } from 'react'
    import SideBar from '../../components/sidebar/SideBar'
    import Navbar from '../../components/navbar/Navbar'
    import 'bootstrap/dist/css/bootstrap.css'
    import { useDispatch, useSelector } from 'react-redux'
    import { Link, useNavigate } from 'react-router-dom'
    import axios from 'axios'
    import { baseUrl } from '../../../baseURL.js'
    import SelectionBox from '../../components/selectionBox/SelectionBox'

    const OrderListing = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [orders, setOrders] = useState([])
    const token = localStorage.getItem('adminLogin')
    //fetching the baseproduct data
    useEffect(() => {
        try {
        axios
            .get(`${baseUrl}/api/v1/admin/orders`, {
            headers: {
                Authorization: token,
            },
            })
            .then((res) => {
            setOrders(res.data.orders)
            })
        } catch (err) {
        console.log(err)
        }
    }, [])

    const [currentPage, setCurrentPage] = useState(1)
    const recordPerPage = 8
    const firstIndex = (currentPage - 1) * recordPerPage
    const lastIndex = currentPage * recordPerPage
    const records = orders.slice(firstIndex, lastIndex)
    const npage = Math.ceil(orders.length / recordPerPage)
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
    ///for date
    function formatDate(dateString) {
        const date = new Date(dateString)
        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const day = date.getDate().toString().padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    //editting payment status
    const getState = (status, orderId) => {
        const token = localStorage.getItem('adminLogin');
        try {
          axios
            .put(`${baseUrl}/api/v1/admin/editPaymentStatus/${orderId}`, { paymentStatus: status[0] }, {
              headers: {
                Authorization: token,
              },
            })
            .then((res) => {
              console.log("this is res",res.data.orders);
              setOrders(res.data.orders)
            })
            .catch((err) => {
              console.log(err.response.data.message);
            });
        } catch (err) {
          console.log(err);
        }
      };
      

    return (
        <div className='flex bg-[#F5F5F9] '>
        <SideBar />
        <div className='w-[100%] flex flex-col items-center'>
            <Navbar />
            <div className='w-[98%] h-full rounded-lg flex justify-evenly'>
            <div className='w-[98%] h-full rounded-lg '>
                {orders.length > 0 ? (
  <table className='table'>
    <thead>
      <tr>
        <th>ID</th>
        <th></th>
        <th>DATE</th>
        <th></th>
        <th></th>
        <th>CUSTOMERS</th>
        <th></th>
        <th></th>
        <th>PAYMENT</th>
        <th>CHANGE STATUS</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order) => (
        <tr key={order._id}>
          <td>{order._id}</td>
          <td></td>
          <td>{formatDate(order.orderDate)}</td>
          <td></td>
          <td></td>
          <td>
            <div>{order.user.name}</div>
            <div>{order.user.email}</div>
          </td>
          <td></td>
          <td></td>
          <td>{order.orderedItems[0].paymentStatus}</td>
          <td><SelectionBox orderId={order._id} getState={getState} states={ ['Pending', 'Processing', 'Completed', 'Failed', 'Refunded']} /></td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <div>Loading...</div>
)}

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

export default OrderListing
