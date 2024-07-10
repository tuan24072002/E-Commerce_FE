import React, { useCallback, useEffect, useState } from 'react'
import { MdCardMembership } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { getOrderByUserId } from '../services/apiServices'
import { toast } from 'react-toastify'
import moment from 'moment'
import { Link, useNavigate } from 'react-router-dom'
const History = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [filterStateOrder, setFilterStateOrder] = useState('All')

    const fetchOrderByUserId = useCallback(async () => {
        const res = await getOrderByUserId()
        if (res && res.success) {
            setData(res.data)
        } else {
            toast.dismiss()
            toast.error(res.message)
        }
    }, [])
    useEffect(() => {
        fetchOrderByUserId()
    }, [fetchOrderByUserId])
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    })
    const totalPriceOrder = data.reduce((prev, curr) => prev + curr.total, 0)
    return (
        <div className='container mx-auto lg:w-[50%] md:w-[70%] sm:max-w-[70%] grid'>
            <div className='flex justify-start items-center p-4 gap-4'>
                <div title='Membership' className='border lg:p-4 p-3 rounded-full bg-red-600 text-white'>
                    <MdCardMembership size={'3em'} />
                </div>
                <div className='flex flex-col'>
                    <h2 className='uppercase lg:text-2xl text-xl font-bold'>{user?.name}</h2>
                    <p className='lg:text-lg text-base'>{user?.phoneNumber}</p>
                    <p className={`border ${user?.role === 'ADMIN' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'} text-center rounded-lg font-bold py-2 px-4 text-xs uppercase`}>{user?.role === 'ADMIN' ? 'Administrator' : 'Membership'}</p>
                </div>
            </div>
            <div className='p-4'>
                <div className='relative grid grid-cols-2 items-center h-40 bg-white rounded-lg shadow'>
                    <div className='flex flex-col justify-center text-center gap-2'>
                        <p className='text-2xl font-bold'>{data.length}</p>
                        <p className='text-sm'>Orders</p>
                    </div>
                    <div className='flex flex-col justify-center text-center gap-2'>
                        <p className='text-2xl font-bold'>${Number(totalPriceOrder).toFixed(2)}</p>
                        <p className='text-sm'>Total</p>
                    </div>
                    <div className='absolute left-[50%] translate-x-[-50%] w-[1px] h-[60%] bg-black'></div>
                </div>
            </div>
            {
                data && data.length > 0 ? <div className='grid gap-4 p-4'>
                    <div className='flex flex-wrap lg:text-lg text-sm gap-4 items-center justify-start'>
                        <button className={`px-4 py-2 ${filterStateOrder === 'All' ? 'bg-red-600 text-white' : 'bg-white'} rounded-lg`} onClick={() => setFilterStateOrder(`All`)}>All</button>
                        <button className={`px-4 py-2 ${filterStateOrder === 'Wait for confirmation' ? 'bg-red-600 text-white' : 'bg-white'} rounded-lg`} onClick={() => setFilterStateOrder(`Wait for confirmation`)}>Wait for confirmation</button>
                        <button className={`px-4 py-2 ${filterStateOrder === 'Confirmed' ? 'bg-red-600 text-white' : 'bg-white'} rounded-lg`} onClick={() => setFilterStateOrder(`Confirmed`)}>Confirmed</button>
                        <button className={`px-4 py-2 ${filterStateOrder === 'Delivering' ? 'bg-red-600 text-white' : 'bg-white'} rounded-lg`} onClick={() => setFilterStateOrder(`Delivering`)}>Delivering</button>
                        <button className={`px-4 py-2 ${filterStateOrder === 'Completed' ? 'bg-red-600 text-white' : 'bg-white'} rounded-lg`} onClick={() => setFilterStateOrder(`Completed`)}>Completed</button>
                        <button className={`px-4 py-2 ${filterStateOrder === 'Canceled & Returned' ? 'bg-red-600 text-white' : 'bg-white'} rounded-lg`} onClick={() => setFilterStateOrder(`Canceled & Returned`)}>Canceled & Returned</button>
                    </div>
                    <div className='flex flex-col justify-center gap-2'>
                        {
                            data && data.length > 0 && data.map((item, index) => {
                                if (filterStateOrder !== 'All' && item?.state === filterStateOrder) {
                                    return (
                                        <div className='bg-white w-full h-40 rounded-lg z-20' key={index}>
                                            <div className='grid md:grid-cols-[180px,1fr] grid-cols-[130px,1fr] h-full'>
                                                <div className='flex bg-slate-200 justify-center items-center h-40 rounded-tl-lg rounded-bl-lg'>
                                                    <img src={item?.product[0]?.productId?.productImage[0]?.url} alt='' className='h-[70%] object-scale-down' />
                                                </div>
                                                <div className='h-full p-4 flex flex-col md:gap-2 gap-1 relative'>
                                                    <div className='flex gap-1 md:flex-row flex-col md:justify-between items-start'>
                                                        <Link to={`/order-detail/${item._id}`} className='lg:text-lg font-semibold cursor-pointer w-fit capitalize'>{item?.product[0]?.productId?.productName}</Link>
                                                        <p className='text-sm w-fit text-slate-400 font-semibold'>{moment(item?.createdAt).format('DD/MM/yyyy HH:mm')}</p>
                                                    </div>
                                                    {
                                                        item?.product.length > 1 && <p className='lg:text-sm text-xs font-semibold text-slate-400'>and {item?.product.length} other products</p>
                                                    }
                                                    <p className={`py-1 px-2 border line-clamp-1 ${item?.state === 'Wait for confirmation' && item?.payment?.state ?
                                                        'bg-red-200 text-red-600' : item?.state === 'Wait for confirmation' && !item?.payment?.state ?
                                                            'bg-gray-200 text-gray-600' : item?.state === 'Confirmed' ?
                                                                'bg-blue-600 text-white' : item?.state === 'Delivering' ?
                                                                    'bg-yellow-600 text-white' : item?.state === 'Completed' ?
                                                                        'bg-green-600 text-white' : item?.state === 'Canceled' || item?.state === 'Returned' ?
                                                                            'bg-slate-600 text-white' : ''} w-fit text-sm`}>{item?.state}</p>
                                                    <p className='font-semibold text-red-600 lg:text-lg'>${Number(item?.total).toFixed(2)}</p>
                                                    <button onClick={() => navigate(`/order-detail/${item._id}`)} className='absolute bottom-4 right-4 py-1 px-2 border border-red-600 text-red-600 rounded-lg sm:block hidden'>View detail</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                } else if (filterStateOrder === 'All') {
                                    return (
                                        <div className='bg-white w-full h-40 rounded-lg z-20' key={index}>
                                            <div className='grid md:grid-cols-[180px,1fr] grid-cols-[130px,1fr] h-full'>
                                                <div className='flex bg-slate-200 justify-center items-center h-40 rounded-tl-lg rounded-bl-lg'>
                                                    <img src={item?.product[0]?.productId?.productImage[0]?.url} alt='' className='h-[70%] object-scale-down' />
                                                </div>
                                                <div className='h-full p-4 flex flex-col md:gap-2 gap-1 relative'>
                                                    <div className='flex gap-1 md:flex-row flex-col items-start md:justify-between'>
                                                        <Link to={`/order-detail/${item._id}`} className='lg:text-lg font-semibold cursor-pointer w-fit capitalize'>{item?.product[0]?.productId?.productName}</Link>
                                                        <p className='text-sm text-slate-400 font-semibold w-fit'>{moment(item?.createdAt).format('DD/MM/yyyy HH:mm')}</p>
                                                    </div>
                                                    {
                                                        item?.product.length > 1 && <p className='lg:text-sm text-xs font-semibold text-slate-400'>and {item?.product.length} other products</p>
                                                    }
                                                    <p className={`py-1 px-2 border line-clamp-1 ${item?.state === 'Wait for confirmation' && item?.payment?.state ?
                                                        'bg-red-200 text-red-600' : item?.state === 'Wait for confirmation' && !item?.payment?.state ?
                                                            'bg-gray-200 text-gray-600' : item?.state === 'Confirmed' ?
                                                                'bg-blue-600 text-white' : item?.state === 'Delivering' ?
                                                                    'bg-yellow-600 text-white' : item?.state === 'Completed' ?
                                                                        'bg-green-600 text-white' : item?.state === 'Canceled' || item?.state === 'Returned' ?
                                                                            'bg-slate-600 text-white' : ''} w-fit text-sm`}>{item?.state}</p>
                                                    <p className='font-semibold text-red-600 lg:text-lg'>${Number(item?.total).toFixed(2)}</p>
                                                    <button onClick={() => navigate(`/order-detail/${item._id}`)} className='absolute bottom-4 right-4 py-1 px-2 border border-red-600 text-red-600 rounded-lg sm:block hidden'>View detail</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                } else if (filterStateOrder === 'Canceled & Returned' && (item?.state === 'Canceled' || item?.state === 'Returned')) {
                                    return (
                                        <div className='bg-white w-full h-40 rounded-lg z-20' key={index}>
                                            <div className='grid md:grid-cols-[180px,1fr] grid-cols-[130px,1fr] h-full'>
                                                <div className='flex bg-slate-200 justify-center items-center h-40 rounded-tl-lg rounded-bl-lg'>
                                                    <img src={item?.product[0]?.productId?.productImage[0]?.url} alt='' className='h-[70%] object-scale-down' />
                                                </div>
                                                <div className='h-full p-4 flex flex-col md:gap-2 gap-1 relative'>
                                                    <div className='flex gap-1 md:flex-row flex-col md:justify-between items-start'>
                                                        <Link to={`/order-detail/${item._id}`} className='lg:text-lg font-semibold cursor-pointer w-fit capitalize'>{item?.product[0]?.productId?.productName}</Link>
                                                        <p className='text-sm w-fit text-slate-400 font-semibold'>{moment(item?.createdAt).format('DD/MM/yyyy HH:mm')}</p>
                                                    </div>
                                                    {
                                                        item?.product.length > 1 && <p className='lg:text-sm text-xs font-semibold text-slate-400'>and {item?.product.length} other products</p>
                                                    }
                                                    <p className={`py-1 px-2 border line-clamp-1 ${item?.state === 'Wait for confirmation' && item?.payment?.state ?
                                                        'bg-red-200 text-red-600' : item?.state === 'Wait for confirmation' && !item?.payment?.state ?
                                                            'bg-gray-200 text-gray-600' : item?.state === 'Confirmed' ?
                                                                'bg-blue-600 text-white' : item?.state === 'Delivering' ?
                                                                    'bg-yellow-600 text-white' : item?.state === 'Completed' ?
                                                                        'bg-green-600 text-white' : item?.state === 'Canceled' || item?.state === 'Returned' ?
                                                                            'bg-slate-600 text-white' : ''} w-fit text-sm`}>{item?.state}</p>
                                                    <p className='font-semibold text-red-600 lg:text-lg'>${Number(item?.total).toFixed(2)}</p>
                                                    <button onClick={() => navigate(`/order-detail/${item._id}`)} className='absolute bottom-4 right-4 py-1 px-2 border border-red-600 text-red-600 rounded-lg sm:block hidden'>View detail</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return <></>
                                }
                            })
                        }
                    </div>
                </div> : <div className='p-4'>
                    <div className='w-full h-40 rounded-lg bg-red-400 flex justify-center items-center'>
                        <p className='font-semibold text-white text-lg'>Don't have any orders !</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default History