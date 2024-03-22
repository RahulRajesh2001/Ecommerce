import React from 'react'
import { Link } from 'react-router-dom'
import * as Icons from 'react-icons/io'

const SideBar = () => {
  const dashboard = [
    { name: 'Dashboard', route: '/profile', icon: 'IoMdSettings' },
    { name: 'Order History', route: '/orderHistory', icon: 'IoMdSettings' },
    { name: 'Track Order', route: '/orderHistory', icon: 'IoMdSettings' },
    { name: 'Shoppig Cart', route: '/cart', icon: 'IoMdSettings' },
    { name: 'Whishlist', route: '/wishlist', icon: 'IoMdSettings' },
    { name: 'Browsing History', route: '/profile', icon: 'IoMdSettings' },
    { name: 'Setting', route: '/profile', icon: 'IoMdSettings' },
    { name: 'Wallet', route: '/wallet', icon: 'IoMdSettings' },
    { name: 'Cupons', route: '/profile', icon: 'IoMdSettings' },
    { name: 'Log-out', route: '/profile', icon: 'IoMdSettings' },
  ]

  return (
    <div className='w-[200px] h-[500px] flex flex-col items-start justify-center gap-5 shadow-md '>
      {dashboard.map((value, index) => {
        const IconComponent = Icons[value.icon]

        return (
          <Link key={index} to={value.route}>
            <div className='flex gap-2 justify-center items-center ml-5'>
              <div>
                <IconComponent className='font-semibold text-[#5F6C72] text-[15px]' />
              </div>
              <div className='font-semibold text-[#5F6C72] text-[16px]'>
                {value.name}
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default SideBar
