import React from 'react';
import { useSearchParams } from 'react-router-dom';

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const reference = searchParams.length > 0 ? searchParams[0].get('reference') : null;

  return (
    <div className='flex justify-center items-center h-screen flex-col gap-10'>
      <div className='w-[100px] h-[100px] bg-green-300 rounded-full flex justify-center items-center font-Josefin font-semibold text-[20px]'>
        Success
      </div>
      <div>
        <div className='font-Playfair'>id : {reference} </div>
      </div>
    
    </div>
  );
}

export default PaymentSuccessPage;
