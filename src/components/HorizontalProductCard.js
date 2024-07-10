import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { getProductByCat } from '../services/apiServices'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';
import { AddToCart } from '../helpers/ActionCart';
import { Context } from '../context/context';
import ScrollToTop from '../helpers/ScrollToTop'
const HorizontalProductCard = (props) => {
    const { category, heading } = props
    const { fetchCountCartProduct, isLoadingAddToCart, setIsLoadingAddToCart } = useContext(Context)
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const scrollElement = useRef()
    const loadingList = new Array(12).fill(null)
    const fetchProductByCategory = useCallback(async () => {
        setIsLoading(true)
        const res = await getProductByCat(category)
        if (res && res.success) {
            setIsLoading(false)
            setData(res.data)
        }
    }, [category])
    useEffect(() => {
        fetchProductByCategory()
    }, [fetchProductByCategory])

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }
    const handleAddToCart = async (e, id) => {
        setIsLoadingAddToCart(true)
        await AddToCart(e, id);
        await fetchCountCartProduct();
        setIsLoadingAddToCart(false)
    }
    return (
        <div className='container mx-auto  my-6 relative'>
            <h2 className='text-2xl font-semibold py-2'>{heading}</h2>
            <div className=' flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all' ref={scrollElement}>
                <i className='absolute left-0 top-[50%] transform translate-y-[50%] border-red-200 hover:bg-black hover:rounded-full hover:text-white bg-white rounded-full flex justify-center items-center p-0 md:p-1 text-black cursor-pointer' onClick={() => scrollLeft()}><IoIosArrowBack size={'1.5em'} /></i>
                <i className='absolute right-0 top-[50%] transform translate-y-[50%] border-red-200 hover:bg-black hover:rounded-full hover:text-white bg-white rounded-full flex justify-center items-center p-0 md:p-1 text-black cursor-pointer' onClick={() => scrollRight()}><IoIosArrowForward size={'1.5em'} /></i>
                {
                    isLoading ? loadingList.map((pro, index) => {
                        return (
                            <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-lg shadow flex cursor-pointer' key={index} >
                                <div className='bg-slate-200 animate-pulse h-full p-4 min-w-[120px] md:min-w-[145px] group rounded-tl-lg rounded-bl-lg' style={{ transition: '0.5s linear' }}>

                                </div>
                                <div className='p-3 grid w-full gap-2 animate-pulse'>
                                    <div className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 bg-slate-200'></div>
                                    <div className='capitalize text-slate-500 bg-slate-200'></div>
                                    <div className='flex gap-3'>
                                        <div className='text-slate-500 line-through'>$</div>
                                        <div className='text-red-600 font-medium'>$</div>
                                    </div>
                                    <button className='text-sm text-white bg-red-600 hover:bg-red-500 px-3 py-0.5 rounded-lg'>...</button>
                                </div>
                            </div>
                        )
                    })
                        :
                        data && data.length > 0 && data.map((pro, index) => {
                            return (
                                <Link to={`/product/${pro._id}`} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-lg shadow flex cursor-pointer group' key={index} onClick={() => ScrollToTop()}>
                                    <div className='bg-slate-200 hover:bg-red-600 h-full p-4 min-w-[120px] md:min-w-[145px] rounded-tl-lg rounded-bl-lg flex justify-center items-center' style={{ transition: '0.5s linear' }}>
                                        <img src={pro.productImage[0].url} alt='' className='h-[80%] object-scale-down group-hover:scale-110' style={{ transition: '0.5s linear' }} />
                                    </div>
                                    <div className='p-3 grid w-full'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 capitalize'>{pro.productName}</h2>
                                        <p className='capitalize text-slate-500'>{pro.category}</p>
                                        <div className='flex gap-3'>
                                            <p className='text-slate-500 line-through'>${pro.price}</p>
                                            <p className='text-red-600 font-medium'>${pro.sellingPrice}</p>
                                        </div>
                                        <button disabled={isLoadingAddToCart} className='text-sm disabled:bg-slate-400 disabled:cursor-not-allowed text-white bg-red-600 hover:bg-red-500 px-3 py-0.5 rounded-lg' onClick={(e) => handleAddToCart(e, pro?._id)}>Add to cart</button>
                                    </div>
                                </Link>
                            )
                        })
                }
            </div>


        </div>
    )
}

export default HorizontalProductCard