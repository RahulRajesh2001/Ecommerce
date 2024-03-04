import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {baseUrl} from '../../../baseUrl.js'
import person from '../../assets/person.jpeg'


const Review = ({id}) => {
  const [review,setReview]=useState([]);
  const token = localStorage.getItem('userToken')
  useEffect(()=>{
    try{
        axios.get(`${baseUrl}/api/v1/get-review`, {
          params: { id },
          headers: {
            Authorization: `${token}`,
          },
        }).then((res)=>{
      
         setReview(res.data.review)
         console.log(review)
        })
    }catch(err){
      console.log(err)
    }
  },[])
  
  return (
    <div className='w-[100%] h-[340px] flex flex-col justify-center items-center gap-2'>
   {review.map((review)=>(
     <div key={review._id} className=' w-[70%] h-[100px]  flex justify-evenly items-center'>
     <div className='w-[80px] h-[80px] rounded-full'>
      <img src={person} alt="" className='rounded-full w-[80px] h-[80px]' />
     </div>
     <div>
       <div className='font-semibold'>{review.review}</div>
       <div></div>
     </div>
   </div>
   ))}
  </div>
  
  )
}

export default Review