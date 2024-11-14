import PaymentPage from '@/components/PaymentPage'
import React from 'react'

const Page = ({amount,ProposalNo}) => {
  return (
    <>
        <PaymentPage amount={amount} ProposalNo={ProposalNo}/>
    </>
  )
}

export default Page
