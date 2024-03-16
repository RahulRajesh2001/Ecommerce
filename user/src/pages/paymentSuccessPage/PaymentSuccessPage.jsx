import React from 'react'
import { useSearchParams } from 'react-router-dom'

const PaymentSuccessPage = () => {
  const searchQuery = useSearchParams()[0]
  const reference = searchQuery.get('reference')
  return <div>PaymentSuccessPage : {reference}</div>
}

export default PaymentSuccessPage
