import { Link, useParams } from "react-router-dom"
import { filterProduct, getProductByCatPaginate } from "../services/apiServices"
import { useCallback, useContext, useEffect, useState } from "react"
import { Context } from "../context/context"
import { AddToCart } from "../helpers/ActionCart"
import { toast } from "react-toastify"
import ProductCategory from '../helpers/ProductCategory'
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import Pagination from "../components/Pagination"
const ProductByCategory = () => {
    const { category } = useParams()
    const [data, setData] = useState([])
    const productLoadingList = new Array(8).fill(null)
    const { fetchCountCartProduct, isLoadingAddToCart, setIsLoadingAddToCart, pageProductByCat } = useContext(Context)
    const [isLoading, setIsLoading] = useState(false)
    const [selectCategory, setSelectCategory] = useState({})
    const [filterCategory, setFilterCategory] = useState([])
    const [selectSortPrice, setSelectSortPrice] = useState('')
    const [pagination, setPagination] = useState({})
    const fetchProductByCategory = useCallback(async () => {
        setIsLoading(true)
        const res = await getProductByCatPaginate(category, pageProductByCat)
        if (res && res.success) {
            setData(res.data)
            setIsLoading(false)
        } else {
            toast.dismiss()
            toast.error(res.message)
            setIsLoading(false)
        }
    }, [category, pageProductByCat])

    const handleAddToCart = async (e, id) => {
        setIsLoadingAddToCart(true)
        await AddToCart(e, id);
        await fetchCountCartProduct();
        setIsLoadingAddToCart(false)
    }
    const handleSelectCategory = (e) => {
        const { name, value, checked } = e.target
        if (name === 'category') {
            setSelectCategory((prev) => {
                return {
                    ...prev,
                    [value]: checked
                }
            })
        }
    }
    useEffect(() => {
        const arrCategory = Object.keys(selectCategory).map(categoryName => {
            if (selectCategory[categoryName]) {
                return categoryName
            }
            return null
        }).filter(pro => pro)
        setFilterCategory(arrCategory);
    }, [selectCategory])
    useEffect(() => {
        if (category) {
            setSelectCategory(prev => ({
                ...prev,
                [category]: true
            }));
        }
    }, [category]);
    const fetchDataFilterCategoryProduct = useCallback(async () => {
        const res = await filterProduct(filterCategory, '', pageProductByCat)
        if (res && res.success) {
            setData(res.data)
            setPagination(res.pagination)
        } else {
            toast.dismiss();
            toast.error(res.message)
        }
    }, [filterCategory, pageProductByCat])
    useEffect(() => {
        if (filterCategory.length > 0) {
            fetchDataFilterCategoryProduct()
        } else {
            fetchProductByCategory()
        }
    }, [filterCategory, fetchDataFilterCategoryProduct, fetchProductByCategory])
    const handleSortPrice = async (e) => {
        if (filterCategory.length > 0) {
            setSelectSortPrice(e.target.value)
            const res = await filterProduct(filterCategory, e.target.value, pageProductByCat)
            if (res && res.success) {
                setData(res.data)
            } else {
                toast.dismiss()
                toast.error(res.message)
            }
        } else {
            toast.dismiss()
            toast.warning(`Please choose a category to sort by price !`)
        }
    }
    return (
        <div className="container mx-auto p-4">
            <div className="lg:grid grid-cols-[200px,1fr] gap-4">
                <div className="bg-white p-2 h-fit ">
                    <div className="">
                        <h3 className="text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1">Sort by Price</h3>
                        <form className="text-sm flex lg:flex-col flex-row lg:gap-2 gap-4 py-2">
                            <div className="flex items-center lg:gap-3 gap-2">
                                <input type="radio" name="sort" checked={selectSortPrice === 'ASC'} value={'ASC'} id="lowToHight" className="cursor-pointer" onChange={(e) => handleSortPrice(e)} />
                                <label htmlFor="lowToHight" className="cursor-pointer flex items-center gap-1"><span>Low to High</span><FaSortAmountUp /></label>
                            </div>
                            <div className="flex items-center lg:gap-3 gap-2">
                                <input type="radio" name="sort" checked={selectSortPrice === 'DESC'} value={'DESC'} id="highToLow" className="cursor-pointer" onChange={(e) => handleSortPrice(e)} />
                                <label htmlFor="highToLow" className="cursor-pointer flex items-center gap-1"><span>High to Low</span><FaSortAmountDown /></label>
                            </div>
                        </form>
                    </div>

                    <div className="">
                        <h3 className="text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1">Category</h3>
                        <form className="text-sm lg:gap-2 gap-4 py-2 flex flex-row flex-wrap lg:flex-col">
                            {
                                ProductCategory.map((cat) => {
                                    return (
                                        <div key={cat.id} className="flex items-center lg:gap-3 gap-2">
                                            <input type="checkbox" name="category" checked={selectCategory[cat.value] || false} id={cat.id} value={cat.value} className="cursor-pointer" onChange={handleSelectCategory} />
                                            <label htmlFor={cat.id} className="cursor-pointer">{cat.value}</label>
                                        </div>
                                    )
                                })
                            }
                        </form>
                    </div>
                </div>

                <div className='flex gap-4 flex-wrap md:justify-between sm:justify-center items-center flex-col sm:flex-row lg:justify-start mt-4 lg:mt-0'>
                    {
                        !isLoading && data?.length === 0 && productLoadingList.map((pro, index) => (
                            <div className='w-full md:min-w-[300px] max-w-[250px] md:max-w-[300px] sm:min-w-[250px] min-w-full border  bg-white rounded-lg shadow cursor-pointer animate-pulse' key={index} >
                                <div className='bg-slate-200 h-48 p-4 min-w-[250px] md:min-w-[115px] rounded-tl-lg rounded-bl-lg flex justify-center items-center group' style={{ transition: '0.5s linear' }}>

                                </div>
                                <div className='p-3 grid gap-3'>
                                    <div className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 capitalize h-6 w-full bg-slate-200 rounded-full'></div>
                                    <p className='h-4 w-full  rounded-full bg-slate-200'></p>
                                    <div className='flex gap-3'>
                                        <p className=' rounded-full h-4 w-[50%] bg-slate-200'></p>
                                        <p className=' rounded-full h-4 w-[50%] bg-slate-200'></p>
                                    </div>
                                    <button className=' text-sm text-white bg-red-600 hover:bg-red-500 px-3 py-1 rounded-lg' >...</button>
                                </div>
                            </div>
                        ))
                    }
                    {
                        data && data.length > 0 && !isLoading && data.map((pro, index) => {
                            return (
                                <Link to={`/product/${pro._id}`} className='w-full md:min-w-[300px] max-w-[250px] md:max-w-[300px] sm:min-w-[250px] min-w-full border  bg-white rounded-lg shadow cursor-pointer' key={index} >
                                    <div className='bg-slate-200 h-48 p-4 min-w-[250px] md:min-w-[115px] rounded-tl-lg rounded-bl-lg flex justify-center items-center group' style={{ transition: '0.5s linear' }}>
                                        <img src={pro.productImage[0].url} alt='' className='h-[80%] p-2 object-fill mix-blend-multiply group-hover:scale-125' style={{ transition: '0.5s linear' }} />
                                    </div>
                                    <div className='p-3 grid gap-3'>
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
            </div>
            <Pagination totalPage={pagination.totalPage} currentPage={pagination.currentPage} />
        </div>
    )
}

export default ProductByCategory