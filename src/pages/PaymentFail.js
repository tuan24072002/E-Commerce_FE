import React, { useEffect, useState } from 'react'
import { IoIosClose } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
const PaymentFail = () => {
    const [timeout, setTimeout] = useState(5)
    const navigate = useNavigate()
    useEffect(() => {
        if (timeout > 0) {
            const interval = setInterval(() => {
                setTimeout(prev => prev - 1)
            }, 1000)
            return () => clearInterval(interval);
        } else {
            navigate('/')
        }
    }, [timeout, navigate])
    return (
        <div className='fixed top-0 bottom-[7%] left-0 right-0 bg-[rgba(0,0,0,0.1)] flex flex-col justify-center items-center'>
            <div className='lg:w-[30%] md:w-[50%] w-[70%] h-[40%] bg-white flex flex-col justify-center items-center rounded-lg relative'>
                <div className='flex flex-col justify-center items-center gap-4'>
                    <IoIosClose className='text-white animate-bounce border rounded-full w-fit h-fit mx-auto bg-red-600' size={'5em'} />
                    <p className='text-3xl font-bold text-red-600'>Payment failed</p>
                </div>
                <Link to={'/'} className='mt-1 absolute bottom-0'>Return to index after <span className='text-red-600 font-medium'>{timeout}</span> seconds</Link>
            </div>
        </div>
    )
}

export default PaymentFail