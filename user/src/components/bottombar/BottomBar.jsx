        import React from 'react'
        import { MdKeyboardArrowDown } from 'react-icons/md'
        import { CiLocationOn } from "react-icons/ci";
        import { MdOutlineCompareArrows } from "react-icons/md";
        import { MdHeadphones } from "react-icons/md";
        import { IoHelpCircleOutline } from "react-icons/io5";
        import { MdOutlinePhoneCallback } from "react-icons/md";
import { Link } from 'react-router-dom';

        const BottomBar = () => {
        return (
            <div className=' w-[100%] h-[40px] bg-[#fffff] flex justify-around items-center shadow border-b border-gray-300 '>
                <div className='flex gap-3 '>
                    {/*left side*/}
                <div className='flex items-center justify-center gap-2 hover:bg-[#F2F4F5]  h-[40px] w-[100px] hover:cursor-pointer'>
                    <div className='text-[10px]'>All Category </div>
                    <MdKeyboardArrowDown className='text-[black] text-[15px]' />
                </div>
               <Link to='/orderHistory'>
               <div className='flex items-center justify-center gap-2 hover:bg-[#F2F4F5]  h-[40px] w-[100px] hover:cursor-pointer'>
                    <CiLocationOn className='text-[black] text-[15px]'/>
                    <div className='text-[10px]'>Track Order</div>
                
                </div>
               </Link>
                <div className='flex items-center justify-center gap-2 hover:bg-[#F2F4F5]  h-[40px] w-[100px] hover:cursor-pointer'>
                    <MdOutlineCompareArrows className='text-[black] text-[15px]'/>
                    <div className='text-[10px]'>Compare</div>
                
                </div>
                <div className='flex items-center justify-center gap-2 hover:bg-[#F2F4F5]  h-[40px] w-[110px] hover:cursor-pointer'>
                    <MdHeadphones className='text-[black] text-[15px]'/>
                    <div className='text-[10px]'>Customer Support</div>
                
                </div>
                <div className='flex items-center justify-center gap-2 hover:bg-[#F2F4F5]  h-[40px] w-[100px] hover:cursor-pointer'>
                    <IoHelpCircleOutline className='text-[black] text-[15px]'/>
                    <div className='text-[10px]'>Need help</div>
                
                </div>
                </div>

                {/*right side*/}
                <div className='flex items-center justify-center gap-2 hover:bg-[#F2F4F5]  h-[40px] w-[100px] hover:cursor-pointer'>
                    <MdOutlinePhoneCallback  className='text-[black] text-[15px]'/>
                    <div className='text-[10px]'>+91 7510329871</div>
                
                </div>
            </div>
        )
        }

        export default BottomBar