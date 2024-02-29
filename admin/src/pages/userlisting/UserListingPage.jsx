import React, { useEffect, useState } from 'react'
import SideBar from '../../components/sidebar/SideBar'
import Navbar from '../../components/navbar/Navbar'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import { baseUrl } from '../../../baseURL'
import personimage from '../../assets/personimage.jpg'
import { SlActionRedo } from "react-icons/sl";

const UserListingPage = () => {
  const [users,setUsers]=useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const recordPerPage = 8
    const firstIndex = (currentPage - 1) * recordPerPage
    const lastIndex = currentPage * recordPerPage
    const records = users.slice(firstIndex, lastIndex)
    const npage = Math.ceil(users.length / recordPerPage)
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

  //block or unblock user
  
const token=localStorage.getItem('adminLogin')
const [userStatus,setUserStatus]=useState('false')

function Block(id) {
  setUserStatus(true);
  axios.get(`${baseUrl}/api/v1/admin/blockUnblock`, {
    params: { id },
    headers: { 
      Authorization: token,
    },
  }).then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
  });
}


function UnBlock(id){
    setUserStatus(false)
    axios.get(`${baseUrl}/api/v1/admin/blockUnblock`,{
      params: { id },
      headers: { 
        Authorization: token,
      },
    }).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
      
}
useEffect(()=>{
    axios.get(`${baseUrl}/api/v1/admin/getUsers`).then((res)=>{
            setUsers(res.data.users)
            console.log(users)
    }).catch((err)=>{
        console.log(err)
    })
},[])


  
  return (
    <div className='flex bg-[#F5F5F9] '>
        <SideBar/>
        <div className='w-[100%] flex flex-col items-center'>
            <Navbar/> 
            <div className='w-[98%] h-full rounded-lg flex justify-evenly'>
            <div className='w-[98%] h-full rounded-lg'>
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>PRO-IMG</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>---</th>
                <th>---</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user._id}</td>
                  <td>
                    <img
                      src={personimage}
                      className='w-[50px] h-[50px] rounded-sm'
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className='font-bold cursor-pointer' onClick={()=>Block(user._id)}>Unblock</td>
                  <td className='font-bold cursor-pointer' onClick={()=>UnBlock(user._id)} >Block</td>
                  <td><SlActionRedo /></td>
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

export default UserListingPage