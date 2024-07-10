import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";
import { getOrderById, getRateByProId, updateOrderById } from '../services/apiServices';
import { toast } from 'react-toastify';
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { FaInfoCircle, FaRegCreditCard, FaRegUser } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { BiNotepad } from "react-icons/bi";
import { AddToCart } from '../helpers/ActionCart'
import { Context } from '../context/context'
import moment from 'moment';
import ModalCancelOrder from '../components/ModalCancelOrder';
import ModalNotificationCanceled from '../components/ModalNotificationCanceled';
import ModalRateProduct from '../components/ModalRateProduct';
const OrderDetail = () => {
    const { orderId } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const [showMore, setShowMore] = useState(false)
    const [isModalCancel, setIsModalCancel] = useState(false)
    const [modalNotify, setModalNotify] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [otherReason, setOtherReason] = useState('')
    const [reason, setReason] = useState('')
    const [modalRate, setModalRate] = useState(false)
    const [rateProduct, setRateProduct] = useState({})
    const { isLoadingAddToCart, setIsLoadingAddToCart, fetchCountCartProduct, setDataRate } = useContext(Context)
    const fetchOrderById = useCallback(async () => {
        const res = await getOrderById(orderId)
        if (res && res.success) {
            setData(res.data)
        } else {
            toast.error(res.message)
        }
    }, [orderId])
    useEffect(() => {
        fetchOrderById()
    }, [fetchOrderById])
    const totalPrice = data?.product?.reduce((prev, curr) => prev + curr.price, 0)
    const handleAddToCart = async (e, id) => {
        setIsLoadingAddToCart(true)
        await AddToCart(e, id);
        await fetchCountCartProduct();
        setIsLoadingAddToCart(false)
    }
    const handleConfirmCancel = async () => {
        setConfirm(true)
        if (reason === '' || (reason === 'Other reasons' && otherReason === '')) {
            toast.dismiss()
            toast.warning(`Please let us know the reason why you want to cancel this order.`)
        } else {
            const res = await updateOrderById(data?._id, data?.state === 'Wait for confirmation' ? 'Canceled' : data?.state === 'Completed' && 'Returned', reason === 'Other reasons' ? otherReason : reason)
            if (res && res.success) {
                await fetchOrderById()
                setModalNotify(true)
                setIsModalCancel(false)
            } else {
                toast.dismiss()
                toast.error(res.message)
            }
        }
    }
    const fetchRateByProId = async () => {
        const res = await getRateByProId(rateProduct)
        if (res && res.success) {
            setDataRate(res.data)
        }
    }
    return (
        <>
            <div className='container mx-auto p-4 lg:w-[50%] md:w-[70%] sm:w-[90%]'>
                <div className='flex justify-start items-center gap-4'>
                    <IoIosArrowRoundBack size={'2em'} className='text-slate-400 cursor-pointer' onClick={() => navigate('/history')} />
                    <p className='font-semibold md:text-2xl text-xl'>Order detail</p>
                </div>
                <div className='flex flex-col gap-2 my-2'>
                    <div className='flex sm:flex-row flex-col sm:items-center sm:justify-between justify-start'>
                        <div className='flex justify-start items-center gap-2'>
                            <p className='text-sm'>Order ID: </p>
                            <p className='font-semibold'>{orderId}</p>
                        </div>
                        <p className={`py-1 px-2 border ${data?.state === 'Wait for confirmation' && data?.payment?.state ?
                            'bg-red-600 text-red-200 font-semibold' : data?.state === 'Wait for confirmation' && !data?.payment?.state ?
                                'bg-gray-600 text-gray-200 font-semibold' : data?.state === 'Confirmed' ?
                                    'bg-blue-600 text-blue-200 font-semibold' : data?.state === 'Delivering' ?
                                        'bg-yellow-600 text-yellow-200 font-semibold' : data?.state === 'Completed' ?
                                            'bg-green-600 text-green-200 font-semibold' : data?.state === 'Canceled' || data?.state === 'Returned' ?
                                                'bg-slate-600 text-slate-200 font-semibold' : ''} w-fit text-sm`}>{data?.state}</p>
                    </div>
                    <div className='flex sm:flex-row flex-col sm:items-center sm:justify-between justify-start'>
                        <p className='text-sm'>Created at: <span className='font-semibold'>{moment(data.createdAt).format('DD/MM/yyyy HH:mm')}</span></p>
                        {
                            data?.state === 'Canceled' ?
                                <p className='text-sm'>Canceled at: <span className='font-semibold'>{moment(data?.canceled?.canceledAt).format('DD/MM/yyyy HH:mm')}</span></p> :
                                data?.state === 'Returned' ?
                                    <p className='text-sm'>Returned at: <span className='font-semibold'>{moment(data?.returned?.returnedAt).format('DD/MM/yyyy HH:mm')}</span></p> :
                                    data?.state === 'Completed' &&
                                    <p className='text-sm'>Completed at: <span className='font-semibold'>{moment(data?.completedAt).format('DD/MM/yyyy HH:mm')}</span></p>
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-2 my-2'>
                    {
                        data?.product && <div className='bg-white w-full h-36 rounded-lg relative'>
                            <div className='grid md:grid-cols-[180px,1fr] grid-cols-[130px,1fr] h-full'>
                                <div className='flex bg-slate-200 justify-center items-center h-36 rounded-tl-lg rounded-bl-lg'>
                                    <img src={data?.product[0]?.productId?.productImage[0]?.url} alt='' className='h-[70%] object-scale-down' />
                                </div>
                                <div className='h-full p-4 flex flex-col md:gap-2 gap-1 relative'>
                                    <div className='flex gap-1 md:flex-row flex-col md:justify-between'>
                                        <div className='lg:text-lg font-semibold cursor-pointer capitalize w-fit'>{data?.product[0]?.productId?.productName}</div>
                                        <p className='text-sm w-fit text-slate-400 font-semibold'>Quantity: {data?.product[0]?.quantity}</p>
                                    </div>
                                    <div className='flex md:justify-start justify-between sm:flex-col flex-row'>
                                        <p className='font-semibold text-red-600 lg:text-lg'>${data?.product[0]?.price}</p>
                                        <div className='flex items-center justify-start gap-2'>
                                            <p className='text-sm'>Sub:</p>
                                            <p className='lg:text-lg font-semibold text-red-600'> ${data?.product[0]?.quantity * data?.product[0]?.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex absolute bottom-4 right-4 gap-2'>
                                <button disabled={isLoadingAddToCart} className={`py-1 px-2 border border-red-600 text-red-600 disabled:bg-slate-200 disabled:text-white disabled:border-slate-200 rounded-lg text-sm`} onClick={() => { setModalRate(true); setRateProduct(data?.product[0]?.productId); }}>Evaluate</button>
                                <button disabled={isLoadingAddToCart} className={`py-1 px-2 border border-red-600 text-red-600 disabled:bg-slate-200 disabled:text-white disabled:border-slate-200 rounded-lg text-sm`} onClick={(e) => handleAddToCart(e, data?.product[0]?.productId?._id)}>Buy again</button>
                            </div>
                        </div>
                    }
                    {
                        showMore && data?.product?.length > 0 && data?.product?.map((item, index) => {
                            if (index !== 0) {
                                return (
                                    <div className='bg-white w-full h-36 rounded-lg relative' key={index}>
                                        <div className='grid md:grid-cols-[180px,1fr] grid-cols-[130px,1fr] h-full'>
                                            <div className='flex bg-slate-200 justify-center items-center h-36 rounded-tl-lg rounded-bl-lg'>
                                                <img src={item?.productId?.productImage[0]?.url} alt='' className='h-[70%] object-scale-down' />
                                            </div>
                                            <div className='h-full p-4 flex flex-col md:gap-2 gap-1 relative'>
                                                <div className='flex gap-1 md:flex-row flex-col md:justify-between'>
                                                    <div className='lg:text-lg font-semibold cursor-pointer capitalize w-fit'>{item?.productId?.productName}</div>
                                                    <p className='text-sm w-fit text-slate-400 font-semibold'>Quantity: {item?.quantity}</p>
                                                </div>
                                                <div className='flex md:justify-start justify-between sm:flex-col flex-row'>
                                                    <p className='font-semibold text-red-600 lg:text-lg'>${item?.price}</p>
                                                    <div className='flex items-center justify-start gap-2'>
                                                        <p className='text-sm'>Sub:</p>
                                                        <p className='lg:text-lg font-semibold text-red-600'> ${item?.quantity * data?.product[0]?.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex absolute bottom-4 right-4 gap-2'>
                                            <button disabled={isLoadingAddToCart} className={`py-1 px-2 border border-red-600 text-red-600 disabled:bg-slate-200 disabled:text-white disabled:border-slate-200 rounded-lg text-sm`} onClick={() => { setModalRate(true); setRateProduct(item?.productId); }}>Evaluate</button>
                                            <button disabled={isLoadingAddToCart} className={`py-1 px-2 border border-red-600 text-red-600 disabled:bg-slate-200 disabled:text-white disabled:border-slate-200 rounded-lg text-sm`} onClick={(e) => handleAddToCart(e, item?.productId?._id)}>Buy again</button>
                                        </div>
                                    </div>
                                )
                            } else {
                                return <></>
                            }
                        })
                    }
                    {
                        data?.product?.length > 1 ?
                            !showMore ? <div className='flex items-center mx-auto cursor-pointer' onClick={() => setShowMore(prev => !prev)}>
                                <p>and {data?.product?.length - 1} other product{data?.product?.length - 1 > 1 ? 's' : ''} </p>
                                {
                                    !showMore ? <IoMdArrowDropdown /> : <IoMdArrowDropup />
                                }
                            </div> : <div className='flex items-center mx-auto cursor-pointer' onClick={() => setShowMore(prev => !prev)}>
                                <p>Hide more</p>
                                {
                                    !showMore ? <IoMdArrowDropdown /> : <IoMdArrowDropup />
                                }
                            </div> : <></>
                    }
                </div>
                <div className='flex flex-col my-2 p-4 bg-white rounded-lg'>
                    <div className='flex items-center gap-2 my-2'>
                        <FaRegCreditCard size='1.5em' className='text-red-600' />
                        <p className='lg:text-lg font-semibold'>Billing Information</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-between items-center'>
                            <p>Total price:</p>
                            <p>${Number(totalPrice).toFixed(2)}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p>Discount:</p>
                            <p>- ${Number(totalPrice * 10 / 100).toFixed(2)}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p>Transport fee:</p>
                            <p>Free of charge</p>
                        </div>
                        <hr />
                        <div className='flex justify-between items-center'>
                            <p>Have to pay:</p>
                            <p className='font-semibold'>${Number(data?.total).toFixed(2)}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            {
                                data?.payment?.state || data?.completedAt ? <p className='text-green-500 font-semibold'>Paid</p> : <p>Remaining Payment:</p>
                            }
                            <p className={`font-semibold ${data?.payment?.state && 'text-green-500'}`}>${Number(data?.total).toFixed(2)}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p>Payment method:</p>
                            <p className='font-semibold'>{data?.payment?.method}</p>
                        </div>
                        {
                            (data?.payment?.state || data?.completedAt) && (data?.state === 'Canceled' || data?.state === 'Returned') &&
                            <div className='flex justify-between items-center bg-red-200 p-2 rounded-lg text-red-600'>
                                <p className='font-semibold'>Refunds:</p>
                                <p className='font-semibold'>${Number(data?.total).toFixed(2)}</p>
                            </div>
                        }
                    </div>
                </div>
                <div className='flex flex-col my-2 p-4 bg-white rounded-lg'>
                    <div className='flex items-center gap-2 my-2'>
                        <FaInfoCircle size='1.5em' className='text-red-600' />
                        <p className='lg:text-lg font-semibold'>Customer information</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='grid grid-cols-[20px,1fr] gap-4 items-center'>
                            <FaRegUser size={'1.2em'} />
                            <p>{data?.name}</p>
                        </div>
                        <div className='grid grid-cols-[20px,1fr] gap-4 items-center'>
                            <FiPhone size={'1.2em'} />
                            <p>{data?.phoneNumber}</p>
                        </div>
                        <div className='grid grid-cols-[20px,1fr] gap-4 items-center'>
                            <IoLocationOutline size={'1.5em'} />
                            <p>{data?.address}</p>
                        </div>
                        {
                            data?.note !== '' && <div className='flex gap-4 items-center'>
                                <BiNotepad size={'1.2em'} />
                                <p>{data?.note}</p>
                            </div>
                        }
                    </div>
                </div>
                {
                    data?.state === 'Wait for confirmation' ?
                        <div className='my-2 w-full flex justify-end items-center'>
                            <button onClick={() => setIsModalCancel(true)} className='py-1 px-2 border bg-slate-400 hover:bg-slate-500 text-white rounded-lg'>Cancel</button>
                        </div> : data?.state === 'Completed' && moment.duration(moment().diff(data?.completedAt)).asDays() <= 7 ?
                            <div className='my-2 w-full flex justify-end items-center'>
                                <button onClick={() => setIsModalCancel(true)} className='py-1 px-2 border bg-slate-400 hover:bg-slate-500 text-white rounded-lg'>Return</button>
                            </div> : <></>
                }
            </div>
            {
                isModalCancel && <ModalCancelOrder
                    setIsModalCancel={setIsModalCancel}
                    data={data}
                    fetchOrderById={fetchOrderById}
                    confirm={confirm}
                    setReason={setReason}
                    reason={reason}
                    otherReason={otherReason}
                    setOtherReason={setOtherReason}
                    handleConfirmCancel={handleConfirmCancel} />
            }
            {
                modalNotify && <ModalNotificationCanceled data={data} setModalNotify={setModalNotify} />
            }
            {
                modalRate && <ModalRateProduct setModalRate={setModalRate} data={rateProduct} fetchRateByProId={fetchRateByProId} />
            }
        </>
    )
}

export default OrderDetail