import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const ShopCard = ({ featuredProducts,fullProducts }) => {



  const navigate = useNavigate();

  // State for storing products
  const [products, setProducts] = useState([]);

  // Effect to update products when featuredProducts change
  useEffect(() => {
    setProducts(featuredProducts);
  }, [featuredProducts]);

  useEffect(() => {
    setProducts(fullProducts);
  }, [fullProducts]);

  // Function to handle product details navigation
  const handleDetails = (id) => {
    navigate(`/getProductDetails/${id}`);
  };



  return (
    <div className='w-full flex flex-wrap items-center'>
      {products
        .filter((product) => !product.isDeleted)
        .map((product) => (
          <div
            key={product._id}
            className='w-[160px] h-[250px] border px-5 py-5 mt-4 ml-2 cursor-pointer rounded-lg hover:scale-105 duration-300'
            
          >
           
            {product.variants && product.variants.length > 0 && (
              <div onClick={() => handleDetails(product._id)}>
                <img src={product.variants[0].images[0]} alt='' className='mt-2' />
                <div className='flex justify-start items-center gap-1 mt-2'>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <div className='text-[#77878F] text-[13px]'>(738)</div>
                </div>
                <div>
                  <div className='text-[#191C1F] text-[12px]'>{product.name}</div>
                </div>
                <div className='text-[#2DA5F3] font-semibold text-[14px] mt-2'>
                  ₹{Math.round(product.variants[0].salePrice)}
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default ShopCard;
