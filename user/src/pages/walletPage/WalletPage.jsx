import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar.jsx'
import Footer from '../../components/footer/Footer.jsx'
import SideBar from '../../components/sidebarDashboard/SideBar.jsx'
import axios from 'axios'
import {baseUrl} from '../../../baseUrl.js'

const WalletPage = () => {
    const token = localStorage.getItem('userToken');
    const [wallet,setWallet]=useState({})
    const [history,setHistory]=useState([])
  
    useEffect(() => {

        try{
            axios.get(`${baseUrl}/api/v1/getWalletHistory`, {
                headers: {
                  Authorization: token,
                },
              }).then((res)=>{
                console.log(res.data.history )
                setWallet(res.data)
                setHistory(res.data.history)
              })
        }catch(err){
            console.log(err)
        }
    }, []);
  return (
    <div>
      <Navbar />
      <div className='h-screen  flex justify-center items-center gap-10 '>
        <div className='w-[20%] '>
          <SideBar />
        </div>
        <div className='w-[60%]  gap-5'>
          <div className='w-[80%]  h-[500px] '>
            <div className='font-Playfair text-[25px] font-semibold ml-10'>Wallet</div>

            <div className='flex flex-col gap-4 mt-5'>
                <div className='flex justify-around'>
                    <div className='font-Josefin font-semibold text-[20px] text-green-600'>Current Balance</div>
                    <div className='font-Josefin font-semibold text-[20px] text-green-600'>₹ {wallet.balance}</div>
                </div>
                <div className='flex justify-around items-center'>
                    <div className='font-Playfair font-semibold '>Transactions</div>
                    <div className='font-Playfair font-semibold'>Amount</div>
                    <div className='font-Playfair font-semibold'>Date</div>
                </div>
                    {history.map((item)=>(
                        <div key={item._id} className='flex justify-around '>
                    <div className='font-Playfair '>{item.type}</div>
                    <div className='font-Playfair '>{item.amount}</div>
                    <div className='font-Playfair '>{new Date(item.date).toLocaleDateString()}</div>
                </div>
                    ))}
                    

            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default WalletPage
