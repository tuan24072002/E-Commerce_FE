import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { searchProduct } from '../services/apiServices';
import { toast } from 'react-toastify';
import { ImSpinner } from "react-icons/im";
import { Context } from '../context/context';
import { AddToCart } from '../helpers/ActionCart';
import Pagination from '../components/Pagination';
const SearchProduct = () => {
    const params = useLocation()
    const [data, setData] = useState([])
    const { fetchCountCartProduct, isLoadingAddToCart, setIsLoadingAddToCart, pageSearchProduct } = useContext(Context)
    const [isLoading, setIsLoading] = useState(false)
    const [pagination, setPagination] = useState({})

    const fetchSearchProduct = useCallback(async () => {
        setIsLoading(true)
        const res = await searchProduct(params.search, pageSearchProduct)
        if (res && res.success) {

            setData(res.data)
            setPagination(res.pagination)
            setIsLoading(false)
        } else {
            toast.dismiss()
            toast.error(res.message)
            setIsLoading(false)
        }
    }, [params, pageSearchProduct])

    useEffect(() => {
        fetchSearchProduct()
    }, [fetchSearchProduct])
    const handleAddToCart = async (e, id) => {
        setIsLoadingAddToCart(true)
        await AddToCart(e, id);
        await fetchCountCartProduct();
        setIsLoadingAddToCart(false)
    }
    return (
        <div className='container mx-auto p-4'>
            {
                isLoading && <div className='flex justify-center items-center w-full min-h-[calc(100vh-162px)]'><p className='text-2xl flex items-center'><span>Loading...</span><ImSpinner className='animate-spin' /></p></div>
            }
            {
                data?.length === 0 && !isLoading &&
                <p className='bg-white text-xl text-center p-4'>No data found...</p>
            }
            {
                data?.length > 0 && !isLoading && <p className='text-lg my-3'>Search Results: <b>{pagination.totalProduct}</b></p>
            }

            <div className='flex gap-4 flex-wrap lg:justify-center md:justify-between sm:justify-center flex-col sm:flex-row mt-4 lg:mt-0'>
                {
                    data && data.length > 0 && !isLoading && data.map((pro, index) => {
                        return (
                            <Link to={`/product/${pro._id}`} className='w-full  md:min-w-[320px] md:max-w-[320px] max-w-[270px]  sm:min-w-[270px] min-w-full  bg-white rounded-lg shadow cursor-pointer' key={index} >
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] rounded-tl-lg rounded-bl-lg flex justify-center items-center group' style={{ transition: '0.5s linear' }}>
                                    <img src={pro.productImage[0].url} alt='' className='h-[80%] object-fill mix-blend-multiply group-hover:scale-125' style={{ transition: '0.5s linear' }} />
                                </div>
                                <div className='p-3 flex flex-col gap-1'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 capitalize'>{pro.productName}</h2>
                                    <p className='capitalize text-slate-500'>{pro.category}</p>
                                    <div className='flex gap-3'>
                                        <p className='text-slate-500 line-through'>${pro.price}</p>
                                        <p className='text-red-600 font-medium'>${pro.sellingPrice}</p>
                                    </div>
                                    <button disabled={isLoadingAddToCart} className='disabled:bg-slate-400 disabled:cursor-not-allowed text-sm text-white bg-red-600 hover:bg-red-500 px-3 py-1 rounded-lg' onClick={(e) => handleAddToCart(e, pro?._id)}>Add to cart</button>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
            <Pagination totalPage={pagination?.totalPage} currentPage={pagination?.currentPage} />
        </div>
    )
}

export default SearchProduct