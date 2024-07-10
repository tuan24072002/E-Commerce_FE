import React, { useCallback, useEffect, useState } from 'react'
import { getCategoryProduct } from '../services/apiServices'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const categoryLoading = new Array(12).fill(null)
    const fetchCategoryProduct = useCallback(async () => {
        setIsLoading(true)
        const res = await getCategoryProduct()
        if (res && res.success) {
            setIsLoading(false)
            setCategoryProduct(res.data)
        } else {
            toast.dismiss()
            toast.error(res.message)
            setIsLoading(false)
        }
    }, [])
    useEffect(() => {
        fetchCategoryProduct()
    }, [fetchCategoryProduct])

    return (
        <div className='container mx-auto p-4'>
            <div className='flex items-center justify-between overflow-x-scroll scrollbar-none'>
                {
                    isLoading ? categoryLoading.map((pro, index) => {
                        return (
                            <div className='flex flex-col gap-2 animate-pulse' key={index}>
                                <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex justify-center items-center group' >

                                </div>
                                <div className=' bg-slate-200 h-2 w-2 mx-auto border'></div>
                            </div>
                        )
                    }) :
                        categoryProduct && categoryProduct.length > 0 && categoryProduct.map((pro, index) => {
                            return (
                                <Link to={`/product-category/${pro.category}`} key={index} className='cursor-pointer'>
                                    <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex justify-center items-center group' >
                                        <img src={pro.productImage[0].url} alt='' className='w-full h-full object-scale-down mix-blend-multiply group-hover:scale-110 transition-all' />
                                    </div>
                                    <p className='text-center text-sm md:text-base'>{pro.category}</p>
                                </Link>
                            )
                        })
                }
            </div>
        </div>
    )
}

export default CategoryList