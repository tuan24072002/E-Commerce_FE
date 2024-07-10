import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductDetail, getRateByProId } from '../services/apiServices'
import { toast } from 'react-toastify'
import { FaRegStar, FaStar } from "react-icons/fa";
import VerticalProductCard from '../components/VerticalProductCard'
import { AddToCart, BuyNow } from '../helpers/ActionCart';
import { Context } from '../context/context';
import Rate from '../components/Rate';
const ProductDetail = () => {
    const { productId } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const productImageListLoading = new Array(4).fill(null)
    const [activeImg, setActiveImg] = useState('')
    const { fetchCountCartProduct, isLoadingAddToCart, setIsLoadingAddToCart, dataRate, setDataRate } = useContext(Context)
    const [zoomImage, setZoomImage] = useState({
        x: 0,
        y: 0
    })
    const [isZoomImage, setIsZoomImage] = useState(false)
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: 0,
        sellingPrice: 0
    })

    const fetchRateByProId = useCallback(async () => {
        const res = await getRateByProId(productId)
        if (res && res.success) {
            setDataRate(res.data)
        }
    }, [productId, setDataRate])
    const fetchProductDetail = useCallback(async () => {
        setIsLoading(true)
        const res = await getProductDetail(productId)
        if (res && res.success) {
            setData(res.data)
            setIsLoading(false)
            setActiveImg(res?.data?.productImage[0]?.url)
        } else {
            toast.dismiss()
            toast.error(res.message)
            setIsLoading(false)
        }
    }, [productId])
    useEffect(() => {
        fetchProductDetail()
        fetchRateByProId()
    }, [fetchProductDetail, fetchRateByProId])

    const handleMouseEnterProductImage = (imgUrl) => {
        setActiveImg(imgUrl)
    }
    const handleZoomImage = useCallback((e) => {
        setIsZoomImage(true)
        const { left, top, width, height } = e.target.getBoundingClientRect()

        const y = (e.clientY - top) / height
        const x = (e.clientX - left) / width

        setZoomImage({
            x, y
        })
    }, [])
    const handleLeaveImageZoom = () => {
        setIsZoomImage(false)
    }
    const handleAddToCart = async (e, id) => {
        setIsLoadingAddToCart(true)
        await AddToCart(e, id)
        await fetchCountCartProduct()
        setIsLoadingAddToCart(false)
    }
    const handleBuyNow = async (id) => {
        setIsLoadingAddToCart(true)
        await BuyNow(id)
        await fetchCountCartProduct()
        navigate('/cart')
        setIsLoadingAddToCart(false)
    }
    const average = Number(dataRate?.reduce((curr, prev) => curr + prev?.star, 0) / dataRate?.length)
    return (
        <div className='container mx-auto p-4'>
            <div className='min-h-[200px] flex flex-col gap-4 lg:flex-row'>
                <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
                    {
                        isLoading ? <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 animate-pulse'>
                        </div> : <div className='relative h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200'>
                            <img src={activeImg} alt='' className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseMove={(e) => handleZoomImage(e)} onMouseLeave={handleLeaveImageZoom} />
                            {
                                isZoomImage && <div className='hidden lg:block absolute w-96 h-96 overflow-hidden bg-slate-300 -right-[394px] top-0'>
                                    <div className='w-full h-full mix-blend-multiply' style={{ backgroundImage: `url(${activeImg})`, backgroundRepeat: 'no-repeat', backgroundPositionX: `${zoomImage.x * 100}%`, backgroundPositionY: `${zoomImage.y * 100}%` }}>

                                    </div>
                                </div>
                            }
                        </div>
                    }
                    <div className='h-full'>
                        {
                            isLoading ?
                                <div className='flex gap-3 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                    {productImageListLoading.map((img, index) => (
                                        <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={index}>

                                        </div>
                                    ))}
                                </div> :
                                <div className='flex gap-3 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                    {data.productImage && data.productImage.length > 0 && data.productImage.map((img, index) => (
                                        <div className='h-20 w-20 bg-slate-200 rounded p-1 cursor-pointer' key={index} onMouseEnter={() => handleMouseEnterProductImage(img.url)} onClick={() => handleMouseEnterProductImage(img.url)}>
                                            <img src={img.url} alt='' className='h-full w-full object-scale-down mix-blend-multiply' />
                                        </div>
                                    ))}
                                </div>
                        }
                    </div>
                </div>
                {
                    isLoading ?
                        <div className='grid w-full gap-1'>
                            <div className='bg-slate-200 animate-pulse h-6 min-w-[40%] capitalize rounded inline-block'></div>
                            <div className='h-8 bg-slate-200 min-w-[50%] animate-pulse'></div>
                            <div className='h-6 min-w-[20%] animate-pulse bg-slate-200'></div>
                            <div className='flex items-center text-slate-200 gap-1 animate-pulse'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>
                            <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 animate-pulse'>
                                <div className='h-6 w-[100%] bg-slate-200'></div>
                                <div className='h-6 w-[100%] bg-slate-200'></div>
                            </div>
                            <div className='flex items-center gap-3 my-2 animate-pulse'>
                                <button className='border-2 bg-slate-200 rounded px-3 py-3 w-[50%]'></button>
                                <button className='border-2 rounded px-3 py-3 min-w-[50%] font-medium bg-slate-200'></button>
                            </div>
                            <div className='flex flex-col gap-2 animate-pulse min-w-[200px]'>
                                <div className='bg-slate-200 h-6 min-w-[100px]'></div>
                                <div className='bg-slate-200 h-6 min-w-[100px]'></div>
                            </div>
                        </div> :
                        <div className='flex flex-col gap-1'>
                            <p className='bg-red-200 text-red-600 px-2 capitalize rounded inline-block w-fit'>{data?.brandName}</p>
                            <h2 className='text-2xl lg:text-4xl font-medium capitalize'>{data?.productName}</h2>
                            <p className='capitalize text-slate-400'>{data?.category}</p>
                            <div className='flex items-center gap-2 text-red-600'>
                                {
                                    Array.from({ length: Math.round(average) }).map((_, index) => {
                                        return (
                                            <FaStar key={index} />
                                        )
                                    })
                                }
                                {
                                    Array.from({ length: Math.round(average ? 5 - average : 5) }).map((_, index) => {
                                        return (
                                            <FaRegStar key={index} />
                                        )
                                    })
                                }
                                <p className='text-blue-600 text-sm cursor-pointer'><b>{dataRate?.length}</b> Comments</p>
                            </div>
                            <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
                                <p className='text-slate-400 line-through'>${data?.price}</p>
                                <p className='text-red-600'>${data?.sellingPrice}</p>
                            </div>
                            <div className='flex items-center gap-3 my-2'>
                                <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white' onClick={() => handleBuyNow(data?._id)}>Buy Now</button>
                                <button disabled={isLoadingAddToCart} className='disabled:bg-slate-400 disabled:cursor-not-allowed border-2 rounded px-3 py-1 min-w-[120px] font-medium bg-red-600 text-white border-red-600 disabled:border-slate-400 hover:text-red-600 hover:bg-white' onClick={(e) => handleAddToCart(e, data?._id)}>Add To Cart</button>
                            </div>
                            <div>
                                <p className='text-slate-600 font-medium my-1'>Description : </p>
                                <p>{data?.description}</p>
                            </div>
                        </div>
                }
            </div>
            <VerticalProductCard category={data?.category && data?.category} heading={"Recommend for you"} />
            <Rate data={data} average={average} dataRate={dataRate} fetchRateByProId={fetchRateByProId} />
        </div>
    )
}

export default ProductDetail