import React, { useContext } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteCartPro } from '../services/apiServices';
import { Context } from '../context/context';
import { toast } from 'react-toastify';
const ListProductPayment = (props) => {
    const { data, setViewListProduct, fetchProductCart } = props
    const { fetchCountCartProduct } = useContext(Context)
    const handleDeleteProductCart = async (productId) => {
        const res = await deleteCartPro(productId)
        if (res && res.success) {
            await fetchProductCart()
            await fetchCountCartProduct()
        } else {
            toast.dismiss()
            toast.error(res.message)
        }
    }
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.8)] flex justify-center items-center'>
            <div className='lg:w-[40%] md:w-[70%] w-[90%] min-h-fit max-h-[50%] overflow-hidden flex flex-col shadow rounded-lg bg-white'>
                <div className='bg-slate-200 p-4 rounded-tl-lg rounded-tr-lg relative'>
                    <h2 className='lg:text-lg font-medium text-slate-600'>List of currently paid products</h2>
                    <IoIosCloseCircleOutline className='absolute top-2 right-2 text-slate-600 hover:text-red-600 cursor-pointer' size={'2em'} onClick={() => setViewListProduct(false)} />
                </div>
                <div className='mb-2 overflow-y-auto'>
                    {
                        data && data.length > 0 && data.map((pro, index) => {
                            return (
                                <div key={index}>
                                    <div className={`w-full h-36 bg-white flex group relative`}>
                                        <div className='h-full p-4 min-w-[120px] md:min-w-[145px]' style={{ transition: '0.5s linear' }}>
                                            <img src={pro?.productId?.productImage[0]?.url} alt='' className='h-full object-scale-down  group-hover:scale-110' style={{ transition: '0.5s linear' }} />
                                        </div>
                                        <div className='p-3 grid w-full'>
                                            <h2 className='font-medium text-base md:text-lg text-wrap w-[80%]'>{pro?.productId?.productName}</h2>
                                            <p className='capitalize text-slate-500'>{pro?.productId?.category}</p>
                                            <div className='flex justify-between'>
                                                <div className='flex gap-3'>
                                                    <p className='text-slate-500 line-through'>${pro?.productId?.price}</p>
                                                    <p className='text-red-600 font-medium'>${pro?.productId?.sellingPrice}</p>
                                                </div>
                                                <div>
                                                    <p>Quantity: <span className='font-medium text-red-600'>{pro?.quantity}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <FaRegTrashAlt className='absolute top-4 right-4 cursor-pointer hover:text-red-600' size={'1.5em'} onClick={() => handleDeleteProductCart(pro?.productId)} />
                                    </div>
                                    {
                                        data?.length > 1 && <hr className='h-[2px] bg-slate-300' />
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ListProductPayment