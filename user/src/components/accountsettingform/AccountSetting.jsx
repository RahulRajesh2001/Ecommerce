import React, { useEffect, useState } from 'react';
import FilledButton from '../buttons/filledbutton/FilledButton';
import axios from 'axios';
import { baseUrl } from '../../../baseUrl.js';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../redux/reducers/userSlice.js';

const AccountSetting = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem('userToken');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/v1/getCurrentUser`, { params: { token } });
        dispatch(setUser(res.data.user));
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };
    fetchUser();
  }, []);

  const currentUser = useSelector((state) => state.user.user);
  const [name, setName] = useState(currentUser.name );
  const [email, setEmail] = useState(currentUser.email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const editUser = {
        name,
        email,
        id: currentUser._id
      };

      const res = await axios.post(`${baseUrl}/api/v1/editUser`, editUser);
      if(res.status==200){
        alert(res.data.message)
      }else{
        alert(res.data.message)
      }
    } catch (err) {
      console.error('Error editing user:', err);
      alert('Please resubmit the form!');
    }
  };

  return (
    <div className='w-[100%] h-[200px] flex flex-col justify-center items-center gap-5'>
      <div className='flex font-semibold text-[18px]'>Account Setting</div>
      <form onSubmit={handleSubmit} className='flex gap-10 mt-5 justify-center items-center'>
        <div className='flex flex-col gap-2'>
          <div className='text-[12px] font-semibold'>Full Name</div>
          <input
            name='name'
            type='text'
            className='outline-none rounded-lg h-[35px] border'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <div className='text-[12px] font-semibold'>Email Address</div>
          <input
            name='email'
            type='email'
            className='outline-none rounded-lg h-[35px] border'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type='submit' className='mt-5'>
          <FilledButton value={'Save Changes'} w={'100px'} />
        </button>
      </form>
    </div>
  );
};

export default AccountSetting;
