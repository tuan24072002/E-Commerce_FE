import React, { useCallback, useEffect, useState } from 'react'
import { SlClose } from 'react-icons/sl'
import { getOrderById, updateStateOrder } from '../services/apiServices'
import { toast } from 'react-toastify'
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
const ModalOrderDetail = (props) => {
    const { setIsOrderDetail, orderId, fetchAllOrder } = props
    const [data, setData] = useState({})
    const [stateOrder, setStateOrder] = useState(``)
    const [changeState, setChangeState] = useState(false)
    const fetchOrderById = useCallback(async () => {
        const res = await getOrderById(orderId)
        if (res && res.success) {
            setData(res.data)
            setStateOrder(res?.data?.state)
        } else {
            toast.error(res.message)
        }
    }, [orderId])
    useEffect(() => {
        fetchOrderById()
    }, [fetchOrderById])

    const handleChangeStateOrder = async (stateOrderChange) => {
        const res = await updateStateOrder(orderId, stateOrderChange)
        if (res && res.success) {
            toast.dismiss()
            toast.success(res.message)
            await fetchOrderById()
            await fetchAllOrder()
        }
    }
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-[rgba(0,0,0,0.8)]'>
            <div className='relative mx-auto bg-white shadow-md p-4 w-[60%] h-[480px] grid grid-cols-2 gap-3 overflow-hidden'>
                <div className='flex flex-col justify-start relative'>
                    <div className='bg-slate-400 p-2 rounded-lg'>
                        <p className='text-white font-bold'>Order Detail:</p>
                    </div>
                    <div className='flex justify-between my-2'>
                        <p>Order Id :</p>
                        <p className='font-semibold'>{orderId}</p>
                    </div>
                    <div className='flex justify-between my-2'>
                        <p>Name :</p>
                        <p className='font-semibold'>{data?.name}</p>
                    </div>
                    <div className='flex justify-between my-2'>
                        <p>Phone number :</p>
                        <p className='font-semibold'>{data?.phoneNumber}</p>
                    </div>
                    <div className='flex justify-between my-2'>
                        <p className='w-[50%]'>Address :</p>
                        <p className='font-semibold text-wrap'>{data?.address?.split(": ")[1]}</p>
                    </div>
                    <div className='flex justify-between my-2'>
                        <p>Other note :</p>
                        <p className='font-semibold'>{data?.note}</p>
                    </div>
                    <div className='flex justify-between my-2'>
                        <p>Total :</p>
                        <p className='font-semibold'>${Number(data?.total).toFixed(2)}</p>
                    </div>
                    <div className='flex justify-between my-2'>
                        <p>Payment method :</p>
                        <p className='font-semibold'>{data?.payment?.method}</p>
                    </div>
                    <div className='flex justify-between my-2'>
                        <p>Payment state :</p>
                        {data?.payment?.method ? <FaCheckCircle size={'1.5em'} className='text-green-500' /> : <FaTimesCircle size={'1.5em'} className='text-red-500' />}
                    </div>
                    {
                        changeState && (data?.state !== 'Canceled' && data?.state !== 'Returned') &&
                        <div className='flex absolute bottom-14 right-0 gap-2'>
                            <div className={`bg-blue-400 w-fit py-2 px-4 rounded-lg  cursor-pointer`} onClick={() => { setStateOrder(`Confirmed`); setChangeState(false); handleChangeStateOrder(`Confirmed`); }}>
                                <p className='text-white font-semibold'>Confirmed</p>
                            </div>
                            <div className={`bg-yellow-400 w-fit py-2 px-4 rounded-lg  cursor-pointer`} onClick={() => { setStateOrder(`Delivering`); setChangeState(false); handleChangeStateOrder(`Delivering`); }}>
                                <p className='text-white font-semibold'>Delivering</p>
                            </div>
                            <div className={`bg-green-400 w-fit py-2 px-4 rounded-lg cursor-pointer`} onClick={() => { setStateOrder(`Completed`); setChangeState(false); handleChangeStateOrder(`Completed`); }}>
                                <p className='text-white font-semibold'>Completed</p>
                            </div>
                            <div className={`bg-slate-400 w-fit py-2 px-4 rounded-lg cursor-pointer`} onClick={() => { setStateOrder(`Canceled`); setChangeState(false); handleChangeStateOrder(`Canceled`); }}>
                                <p className='text-white font-semibold'>Canceled</p>
                            </div>
                        </div>
                    }
                    <div className={`${stateOrder === 'Wait for confirmation' && data?.payment?.state ? 'bg-red-400' : stateOrder === 'Wait for confirmation' && !data?.payment?.state ? 'bg-gray-400' : stateOrder === 'Confirmed' ? 'bg-blue-400' : stateOrder === 'Delivering' ? 'bg-yellow-400' : stateOrder === 'Completed' ? 'bg-green-400' : 'bg-slate-400'} w-fit py-2 px-4 rounded-lg absolute bottom-2 right-0 cursor-pointer`} onClick={() => {
                        if (data?.state !== 'Canceled' && data?.state !== 'Returned') {
                            setChangeState(prev => !prev)
                        } else {
                            toast.dismiss()
                            toast.error(`This order has been cancelled or returned !!!`)
                        }
                    }}>
                        <p className='text-white font-semibold'>{stateOrder}</p>
                    </div>
                </div>
                <div className='h-[90%] w-[0.5px] bg-black absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]'></div>
                <div className='flex flex-col gap-4 overflow-y-auto p-2'>
                    {
                        data?.product?.length > 0 && data?.product.map((item, index) => {
                            return (
                                <div className='w-full h-36 bg-white rounded-lg shadow flex cursor-pointer group' key={index}>
                                    <div className='bg-slate-200 h-full p-4 w-[200px] rounded-tl-lg rounded-bl-lg flex justify-center items-center' style={{ transition: '0.5s linear' }}>
                                        <img src={item?.productId.productImage[0].url} alt='' className='h-full object-scale-down mix-blend-multiply group-hover:scale-110' style={{ transition: '0.5s linear' }} />
                                    </div>
                                    <div className='p-3 flex flex-col gap-2 w-full bg-gray-100 relative'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1'>{item?.productId.productName}</h2>
                                        <p className='capitalize text-slate-500'>{item?.productId.category}</p>
                                        <p className='text-red-600 font-medium'>${item?.price}</p>
                                        <p className='absolute bottom-2 right-2'>Quantity : <span className='font-medium text-red-600'>{item?.quantity}</span></p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='absolute right-0 top-0 bg-white rounded-full cursor-pointer' onClick={() => setIsOrderDetail(false)}><SlClose size='2em' /></div>
            </div>
        </div>
    )
}

export default ModalOrderDetail