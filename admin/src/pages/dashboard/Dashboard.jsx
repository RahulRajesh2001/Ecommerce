import React from 'react'
import SideBar from '../../components/sidebar/SideBar'
import Navbar from '../../components/navbar/Navbar'

const Dashboard = () => {
  return (
    <div className='bg-[#F5F5F9] flex w-[100%]'>
       <SideBar/>
        <Navbar/>  
    </div>
  )
}

export default Dashboard