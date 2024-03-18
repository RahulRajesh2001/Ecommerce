import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { baseUrl } from '../../../baseUrl.js';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProductDetails } from '../../../redux/reducers/productSlice.js';
import { FaHeart } from "react-icons/fa";
import Swal from 'sweetalert2'


const ShopCard = ({ shopPage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const featuredProducts = useSelector((state) => state.productDetails.featuredProducts);

  const token = localStorage.getItem('userToken');

  //handleDetails
  const handleDetails = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/api/v1/getProductDetails`, {
        params: { id },
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.status === 200) {
        dispatch(setProductDetails(response.data.product));
        navigate('/details');
      } else {
        navigate('/shop');
      }
    } catch (err) {
      console.log(err);
    }
  };


 //adding wishlist
 const [addTowishlist,setAddtowishlist]=useState(false)
const addToWishList = async (id) => {
  try {
    await axios.get(`${baseUrl}/api/v1/addToWishlist`, {
      params: { id },
      headers: {
        Authorization: `${token}`,
      },
    }).then((res) => {
      Swal.fire({
        title: res.data.message,
        icon: "success"
      });
      setAddtowishlist(!addToWishList)
    }).catch((err) => {
      Swal.fire({
        icon: "error",
        text: err.response.data.message,
      });
    });
  } catch (error) {
    console.error("Error:", error);
  }
}


//fetching wishlistproducts
const [wishlist,setWishList]=useState([])
useEffect(()=>{
  axios.get(`${baseUrl}/api/v1/getWishlistProducts`).then((res)=>{
    setWishList(res.data.products)
  })
},[addToWishList])


 // Check if a product is in the wishlist
 const isInWishlist = (productId) => {
  return wishlist.some(item => item.productId === productId);
};


    const products = useSelector((store) => store.productDetails.products);
  const renderProducts = shopPage === 'shopPage' ? products : featuredProducts;

  return (
    <div className='w-full flex flex-wrap items-center'>
      {renderProducts
        .filter((product) => !product.isDeleted)
        .map((product, index) => (
          
          <div
            
            key={product._id}
            className='w-[160px] h-[250px] border px-5 py-5 mt-4 ml-2 cursor-pointer rounded-lg hover:scale-105 duration-300'
          >
            <FaHeart className={`text-[15px] ${isInWishlist(product._id) ? 'text-red-500' : 'text-gray-500'}`} onClick={() => addToWishList(product._id)} />
            {product.variants && product.variants.length > 0 && (
              <>
                <div>
                  <img src={product.variants[0].images[0]} alt='' className='mt-2' />
                </div>
                <div className='flex justify-start items-center gap-1 mt-2'>
                  <div className='flex'></div>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <div className='text-[#77878F] text-[13px]'>(738)</div>
                </div>
                <div onClick={() => handleDetails(product._id)}>
                  <div className='text-[#191C1F] text-[12px]'>{product.name}</div>
                </div>
                <div className='text-[#2DA5F3] font-semibold text-[14px] mt-2'>
                  ₹{product.variants[0].salePrice}
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default ShopCard;
