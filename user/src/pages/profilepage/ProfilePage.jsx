import React from 'react'
import Navbar from '../../components/navbar/Navbar.jsx'
import Footer from '../../components/footer/Footer.jsx'
import SideBar from '../../components/sidebarDashboard/SideBar.jsx'
import AccountSetting from '../../components/accountsettingform/AccountSetting.jsx'
import ShippingAddressListing from '../../components/shippingAddressListing/ShippingAddressListing.jsx'

const ProfilePage = () => {
  return (
    <div >
      <Navbar/>
      <div className='h-screen  flex justify-center items-center gap-10'>
      <div className='w-[20%]'>
      <SideBar/>
      </div>
       <div className='w-[60%]  gap-5 border flex justify-center flex-col items-center'>
       <AccountSetting/>
        <ShippingAddressListing/>
       </div>
      </div>
      <Footer/>
    </div>
  )
}

export default ProfilePage