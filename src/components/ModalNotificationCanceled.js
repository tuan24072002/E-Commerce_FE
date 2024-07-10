import React, { useEffect, useState } from 'react'
import { IoMdSad } from "react-icons/io";
const ModalNotificationCanceled = (props) => {
    const { data, setModalNotify } = props
    const [timeout, setTimeout] = useState(5)
    useEffect(() => {
        if (timeout > 0) {
            const interval = setInterval(() => {
                setTimeout(prev => prev - 1)
            }, 1000)
            return () => clearInterval(interval);
        } else {
            setModalNotify(false)
        }
    }, [timeout, setModalNotify])
    return (
        <div className='fixed top-0  bottom-0 left-0 right-0 w-full h-full bg-[rgba(0,0,0,0.8)] flex justify-center items-center'>
            <div className='lg:w-[30%] md:w-[50%] w-[70%] h-[40%] bg-white flex flex-col justify-center items-center rounded-lg relative'>
                <div className='flex flex-col justify-center items-center gap-4'>
                    <IoMdSad className='text-slate-600 animate-bounce w-fit h-fit mx-auto' size={'5em'} />
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <p className='text-3xl font-bold text-slate-600'>Your order has been cancelled !</p>
                        {
                            data?.payment?.state && <p className='font-bold text-red-600'>The system will transfer the money back to your bank account</p>
                        }
                    </div>
                </div>
                <div className='mt-1 absolute bottom-0 cursor-pointer' onClick={() => setModalNotify(false)}>Return to history after <span className='text-red-600 font-medium'>{timeout}</span> seconds</div>
            </div>
        </div>
    )
}

export default ModalNotificationCanceled