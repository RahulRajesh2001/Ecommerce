import React from 'react';
import { useSearchParams } from 'react-router-dom';

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const reference = searchParams.length > 0 ? searchParams[0].get('reference') : null;

  return (
    <div className='bg-red-500 w-[100px] h-[100px]'>
      PaymentSuccessPage : {reference}
    </div>
  );
}

export default PaymentSuccessPage;
