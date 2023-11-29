import React from 'react'
import { useParams } from 'react-router-dom'

const OrderComplete = () => {
    const {oid} =useParams();
    return (
        <div className='my-5'>
            <h1 className='text-center'>주문이 완료되었습니다!</h1>
            <h3 className='text-center'>주문번호: {oid}</h3>
        </div>
    )
}

export default OrderComplete