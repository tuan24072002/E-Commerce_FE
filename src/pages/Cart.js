import React, { useCallback, useContext, useEffect, useState } from 'react'
import { IoMdSad } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { deleteCartPro, getCartPro, plusOrMinusProductCart, updateCheckAllStateProductCart, updateStateProductCart } from '../services/apiServices';
import { toast } from 'react-toastify';
import { Context } from '../context/context';
import { FaTrash } from "react-icons/fa";
const Cart = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const { countCart, fetchCountCartProduct, isLoadingPlusOrMinus, setIsLoadingPlusOrMinus } = useContext(Context)
    const loadingCart = new Array(countCart).fill(null)
    const [checkAll, setCheckAll] = useState(false)
    const fetchProductCart = useCallback(async () => {
        setIsLoading(true)
        const res = await getCartPro()
        if (res && res.success) {
            setData(res.data)
            setIsLoading(false)
        } else {
            toast.dismiss()
            toast.error(res.message)
            setIsLoading(false)
        }
    }, [])
    useEffect(() => {
        fetchProductCart()
    }, [fetchProductCart])
    const handleMinusQuantityProductCart = async (e, productId, state) => {
        e.preventDefault()
        setIsLoadingPlusOrMinus(true)
        const res = await plusOrMinusProductCart(productId, state)
        if (res && res.success) {
            toast.dismiss()
            setIsLoadingPlusOrMinus(false)
            await fetchProductCart()
            await fetchCountCartProduct()
        } else {
            toast.error(res.message)
        }
    }
    const handlePlusQuantityProductCart = async (e, productId, state) => {
        e.preventDefault()
        setIsLoadingPlusOrMinus(true)
        const res = await plusOrMinusProductCart(productId, state)
        if (res && res.success) {
            toast.dismiss()
            setIsLoadingPlusOrMinus(false)
            await fetchProductCart()
        } else {
            toast.dismiss()
            toast.error(res.message)
        }
    }
    const handleDeleteProductCart = async (productId) => {
        const res = await deleteCartPro(productId)
        if (res && res.success) {
            toast.dismiss()
            await fetchProductCart()
            await fetchCountCartProduct()
        } else {
            toast.error(res.message)
        }
    }
    const handleChangeStateProductCart = async (productId, state) => {
        const res = await updateStateProductCart(state, productId)
        if (res && res.success) {
            toast.dismiss()
            fetchProductCart()
        } else {
            toast.dismiss()
            toast.error(res.message)
        }
    }
    const handleChangeAllStateProductCart = useCallback(async () => {
        if (checkAll) {
            const res = await updateCheckAllStateProductCart(checkAll)
            if (res && res.success) {
                toast.dismiss()
                fetchProductCart()
            } else {
                toast.dismiss()
                toast.error(res.message)
            }
        }
    }, [checkAll, fetchProductCart])
    useEffect(() => {
        handleChangeAllStateProductCart()
    }, [handleChangeAllStateProductCart])
    const totalPrice = data.filter(curr => curr.state === true).reduce((prev, curr) => prev + (curr?.quantity * curr?.productId?.sellingPrice), 0)
    const totalProduct = data.filter(curr => curr.state === true).reduce((prev, curr) => prev + curr?.quantity, 0)
    const handleToPayment = () => {
        if (totalProduct > 0) {
            navigate('/payment')
        } else {
            toast.dismiss()
            toast.warning(`Please choose product to pay !`)
        }
    }
    return (
        <div className='container mx-auto p-4 min-h-[calc(100vh-130px)]'>
            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between'>
                <div className='w-full max-w-3xl'>
                    {
                        isLoading ?
                            loadingCart.map((pro, index) => (
                                <div className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded' key={index}>

                                </div>
                            ))
                            :
                            <>
                                {
                                    data.length > 1 &&
                                    <div className='flex items-center gap-2'>
                                        <input type='checkbox' id='checkAll' className='w-4 h-4 cursor-pointer' checked={checkAll} onChange={() => setCheckAll(prev => !prev)} />
                                        <label htmlFor='checkAll' className=' cursor-pointer text-slate-600 font-medium'>Check all</label>
                                    </div>
                                }
                                {
                                    data.map((pro, index) => {
                                        return (
                                            <div key={index} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[8rem,1fr]'>
                                                <div className='w-32 h-32 bg-slate-200 relative'>
                                                    <img src={pro?.productId?.productImage[0]?.url} alt='' className='w-full h-full p-4 hover:scale-125 object-scale-down mix-blend-multiply' style={{ transition: '0.5s' }} />
                                                    <input type='checkbox' className='absolute top-2 left-2 w-4 h-4 cursor-pointer' checked={pro?.state} onChange={() => {
                                                        handleChangeStateProductCart(pro.productId, !pro.state)
                                                        setCheckAll(false)
                                                    }} />
                                                </div>
                                                <div className='px-4 py-2 relative'>
                                                    <Link to={`/product/${pro?.productId?._id}`} className='text-lg lg:text-2xl text-ellipsis line-clamp-1 font-semibold w-fit'>{pro?.productId.productName}</Link>
                                                    <p className='capitalize text-slate-500'>{pro?.productId?.category}</p>
                                                    <p className='text-red-600 text-lg font-medium'>${pro?.productId?.sellingPrice}</p>
                                                    <div className='flex items-center mt-2 absolute bottom-4 right-2'>
                                                        <button disabled={isLoadingPlusOrMinus} className='disabled:bg-slate-400 disabled:border-slate-400 disabled:text-white disabled:cursor-not-allowed lg:px-3 lg:py-1 px-2 py-0 border-t border-l border-b border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-tl-lg rounded-bl-lg text-lg flex justify-center items-center' onClick={(e) => handleMinusQuantityProductCart(e, pro?.productId?._id, 'MINUS')}>-</button>
                                                        <span className={`lg:px-3 lg:py-1 px-2 py-0 w-fit text-center border-t border-b border-t-red-600 border-b-red-600 cursor-not-allowed text-lg text-slate-700 ${isLoadingPlusOrMinus ? 'border-t-slate-400 border-b-slate-400 bg-slate-400' : ''}`} >{pro?.quantity}</span>
                                                        <button disabled={isLoadingPlusOrMinus} className='disabled:bg-slate-400 disabled:border-slate-400 disabled:text-white disabled:cursor-not-allowed lg:px-3 lg:py-1 px-2 py-0 border-t border-r border-b border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-tr-lg rounded-br-lg text-lg flex justify-center items-center' onClick={(e) => handlePlusQuantityProductCart(e, pro?.productId?._id, 'PLUS')}>+</button>
                                                    </div>
                                                    <div className='absolute right-2 top-2 flex flex-col-reverse gap-4 items-center'>
                                                        <p className='text-slate-500'>Sub: <b className='text-slate-600'>${pro?.productId?.sellingPrice * pro?.quantity}</b></p>
                                                        <div className=' hover:text-red-600 hover:animate-bounce cursor-pointer ml-auto' onClick={() => handleDeleteProductCart(pro?.productId?._id)}>
                                                            <FaTrash size={'1.5em'} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </>
                    }
                </div>
                <div className='w-full lg:max-w-md'>
                    {
                        isLoading ?
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse rounded-lg'>

                            </div> : data.length > 0 &&
                            <div className='h-36 bg-white flex flex-col justify-between'>
                                <div className=''>
                                    <h2 className='text-white rounded-tr-lg rounded-tl-lg bg-red-600 px-4 py-1 font-medium'>Total</h2>
                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Number of products:</p>
                                        <p>{totalProduct}</p>
                                    </div>
                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Total Price:</p>
                                        <p>${totalPrice}</p>
                                    </div>
                                </div>
                                <button onClick={() => handleToPayment()} className='rounded-bl-lg text-center rounded-br-lg bg-blue-600 hover:bg-blue-500 font-medium p-2 text-white w-full'>Payment</button>
                            </div>
                    }
                </div>
            </div>
            {
                data.length === 0 &&
                <div className=' gap-2 flex flex-col justify-center items-center w-full min-h-[calc(100vh-162px)]'>
                    <div className='flex justify-center items-center lg:text-3xl 2xl'>
                        <p>Don't have any product</p>
                        <IoMdSad size={'1.5em'} />
                    </div>
                    <Link to={'/'} className='px-3 py-1 bg-slate-600 text-white hover:bg-slate-400 hover:text-black rounded-lg'>Go back</Link>
                </div>
            }

        </div>
    )
}

export default Cart