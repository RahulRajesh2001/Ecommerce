import React, { useEffect, useState } from 'react';
import OfferBar from '../../components/offerbar/OfferBar';
import Navbar from '../../components/navbar/Navbar';
import BottomBar from '../../components/bottombar/BottomBar';
import Footer from '../../components/footer/Footer';
import { IoIosSearch } from 'react-icons/io';
import ShopCard from '../../components/shopcard/ShopCard';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { baseUrl } from '../../../baseUrl.js';
import BrudCrumbs from '../../components/brudCrumbs/BrudCrumbs';
import SortSideBar from '../../components/product/sortSidebar/SortSideBar.jsx';
import { setFullProducts } from '../../../redux/reducers/productSlice.js';

const ShopPage = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    console.log('this is token', token);
    axios
      .get(`${baseUrl}/api/v1/getProducts`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setProducts(res.data.products);
        dispatch(setFullProducts(res.data.products));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
       await axios.get(`${baseUrl}/api/v1/search`, { params: { searchQuery } }).then((res)=>{
        console.log("response search",res.data)
        dispatch(setFullProducts(res.data));
       })
        
        
      } catch (err) {
        console.log(err);
      }
    };

    if (searchQuery.trim() !== '') {
      fetchProducts();
    }
  }, [searchQuery, dispatch]);

  const breadcrumbs = [{ label: 'Home', path: '/' }, { label: 'Shop', path: '/shop' }];

  return (
    <div>
      <OfferBar />
      <Navbar />
      <BottomBar />
      <BrudCrumbs breadcrumbs={breadcrumbs} />

      <div className='flex justify-center flex-wrap mt-5 mb-5 gap-5 '>
        <SortSideBar />
        <div className='w-[60%] h-screen'>
          <div className='flex justify-between'>
            <div className='relative '>
              <input
                type='text'
                placeholder='search for anything....'
                onChange={(e) => setSearchQuery(e.target.value)}
                className='outline-none border rounded-sm w-[350px] placeholder:text-[#77878F] placeholder:text-[12px]  px-5   h-[30px]'
              />
              <IoIosSearch className='absolute top-[7px] right-[10px] hover:cursor-pointer' />
            </div>
          </div>
          <div className='bg-[#F2F4F5] h-[40px] mt-4 flex justify-between'>
            <div></div>
            <div className='flex gap-2 items-center'>
              <div className='font-semibold text-[12px]'>65,867</div>
              <div className='text-[#5F6C72] mr-5 text-[12px]'>Results found</div>
            </div>
          </div>
          <div className='flex flex-wrap mt-5'>
              <ShopCard shopPage={"shopPage"}/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopPage;
