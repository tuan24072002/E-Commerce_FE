import React, { useContext, useEffect, useState } from 'react'
import { SlClose } from "react-icons/sl";
import ProductCategory from '../helpers/ProductCategory'
import { FaPlus } from "react-icons/fa";
import DisplayImage from './DisplayImage';
import { deleteImageCloundinary, updateProduct, uploadImageCloundinary, uploadProduct } from '../services/apiServices';
import { toast } from 'react-toastify'
import { Context } from '../context/context'
import ModalLoading from '../components/ModalLoading'
const ModalAdminProduct = (props) => {
    const { setModalProduct, stateModalProduct, product, fetchAllProduct } = props
    const { isLoading, setIsLoading } = useContext(Context)
    const [displayImg, setDisplayImg] = useState(false)
    const [imgUrl, setImgUrl] = useState(``)
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: ProductCategory[0].value,
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    })
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleUploadProductImage = async (e) => {
        setIsLoading(true)
        const files = Array.from(e.target.files)
        const uploadPromise = files.map(file => uploadImageCloundinary(file))
        if (uploadPromise) {
            const res = await Promise.all(uploadPromise);

            const newImages = res.map((rs) => (
                {
                    url: rs.data.url,
                    id: rs.data.public_id
                }
            ))

            setData(prev => {
                return {
                    ...prev,
                    productImage: [...prev.productImage, ...newImages]
                }
            })
            setIsLoading(false)
        }
    }
    const handleRemoveProductImage = async (index) => {
        setIsLoading(true)
        const res = await deleteImageCloundinary(data.productImage[index].id)
        if (res) {
            setData(prev => {
                const cloneProductImage = [...prev.productImage]
                const newProductImage = cloneProductImage?.slice(0, index)?.concat(cloneProductImage?.slice(index + 1));
                return {
                    ...prev,
                    productImage: newProductImage
                }
            })
            setIsLoading(false)
            setDisplayImg(false)
        }
    }
    const handleOpenDisplayImage = (img) => {
        if (img.url === imgUrl) {
            setDisplayImg(prev => !prev)
            setImgUrl(img.url)
        } else {
            setDisplayImg(true)
            setImgUrl(img.url)
        }
    }
    const handleOnSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        if (stateModalProduct === 'POST') {
            if (data.productImage.length > 0) {
                const res = await uploadProduct(data.productName, data.brandName, data.category, data.productImage, data.description, data.price, data.sellingPrice)
                if (res && res.success) {
                    toast.dismiss()
                    toast.success(res.message)
                    setModalProduct(false)
                    fetchAllProduct()
                } else {
                    toast.dismiss()
                    toast.error(res.message)
                }
            } else {
                toast.dismiss()
                toast.error(`You must post product images !`)
            }
            setIsLoading(false)
        } else {
            if (data.productImage.length > 0) {
                const res = await updateProduct(product._id, data.productName, data.brandName, data.category, data.productImage, data.description, data.price, data.sellingPrice)
                if (res && res.success) {
                    toast.dismiss()
                    toast.success(res.message)
                    setModalProduct(false)
                    fetchAllProduct()
                } else {
                    toast.dismiss()
                    toast.error(res.message)
                }
            } else {
                toast.dismiss()
                toast.error(`You must post product images !`)
            }
            setIsLoading(false)
        }
    }
    useEffect(() => {
        if (product) {
            setData(prev => {
                return {
                    ...prev,
                    productName: product.productName,
                    brandName: product.brandName,
                    category: product.category,
                    description: product.description,
                    price: product.price,
                    sellingPrice: product.sellingPrice,
                    productImage: product.productImage || []
                }
            })
        }
    }, [product])
    if (isLoading) {
        return <ModalLoading />
    }
    return (
        <div className='fixed bg-[rgba(0,0,0,0.8)] w-full h-full top-0 left-0 bottom-0 right-0 flex justify-center items-center cursor-default'>
            <div className='relative bg-white px-2 py-4 rounded w-full h-full max-w-[40%] max-h-[80%]  overflow-hidden'>
                <h2 className='font-bold text-lg text-center bg-slate-600 text-white'>{stateModalProduct === 'POST' ? 'Upload Product' : 'Edit Product'}</h2>
                <form className='relative overflow-y-scroll h-full p-2' onSubmit={(e) => handleOnSubmit(e)}>
                    <div className='flex flex-col justify-between gap-4'>
                        <div className='flex flex-col gap-1 w-full'>
                            <label htmlFor='productName'>Product Name:</label>
                            <input
                                type='text'
                                name='productName'
                                id='productName'
                                placeholder='Enter Product Name'
                                className='py-2 px-4 border border-slate-600 rounded bg-slate-100 focus:bg-slate-200'
                                onChange={(e) => handleOnChange(e)}
                                value={data.productName}
                                required />
                        </div>
                        <div className='flex flex-col gap-1 w-full'>
                            <label htmlFor='brandName'>Brand Name:</label>
                            <input
                                type='text'
                                name='brandName'
                                id='brandName'
                                placeholder='Enter Brand Name'
                                className='py-2 px-4 border border-slate-600 rounded bg-slate-100 focus:bg-slate-200'
                                onChange={(e) => handleOnChange(e)}
                                value={data.brandName}
                                required />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1 w-full mt-3'>
                        <label htmlFor='category'>Category:</label>
                        <select id='category' name='category' value={data.category} onChange={(e) => handleOnChange(e)} className='py-2 px-4 border border-slate-600 rounded bg-slate-100 focus:bg-slate-200' required>
                            {
                                ProductCategory.map((value) => {
                                    return (
                                        <option value={value.value} key={value.id}>{value.value}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='flex flex-col gap-1 w-full mt-3'>
                        <label htmlFor='description'>Description:</label>
                        <textarea
                            name='description'
                            id='description'
                            placeholder='Desc...'
                            className='py-2 px-4 border border-slate-600 rounded bg-slate-100 focus:bg-slate-200'
                            onChange={(e) => handleOnChange(e)}
                            value={data.description} />
                    </div>
                    <div className='flex flex-col justify-between gap-4 mt-3'>
                        <div className='flex flex-col gap-1 w-full'>
                            <label htmlFor='price'>Price:</label>
                            <input
                                type='number'
                                name='price'
                                id='price'
                                placeholder='$'
                                className='py-2 px-4 border border-slate-600 rounded bg-slate-100 focus:bg-slate-200'
                                onChange={(e) => handleOnChange(e)}
                                value={data.price}
                                min={0}
                                required />
                        </div>
                        <div className='flex flex-col gap-1 w-full'>
                            <label htmlFor='sellingPrice'>Selling:</label>
                            <input
                                type='number'
                                name='sellingPrice'
                                id='sellingPrice'
                                placeholder='$'
                                className='py-2 px-4 border border-slate-600 rounded bg-slate-100 focus:bg-slate-200'
                                onChange={(e) => handleOnChange(e)}
                                value={data.sellingPrice}
                                min={0}
                                required />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1 w-full h-fit mt-3'>
                        <label>Product Image:</label>
                        <div className='flex flex-wrap gap-2'>
                            {
                                data.productImage && data.productImage.length > 0 && data.productImage.map((value, index) => {
                                    return (
                                        <div className='relative p-2 bg-slate-600 h-20 w-20 flex justify-center items-center rounded-lg cursor-pointer' key={index} >
                                            <img src={value?.url} alt='' className='h-full w-full object-cover' onClick={() => handleOpenDisplayImage(value)} />
                                            <div className='absolute right-0 top-0 cursor-pointer bg-white rounded-full' onClick={() => handleRemoveProductImage(index)}><SlClose size={'1.2em'} /></div>
                                        </div>
                                    )
                                })
                            }
                            <label className='p-2 bg-slate-100 h-20 w-20  rounded-lg flex justify-center items-center cursor-pointer' htmlFor='productImage'>
                                <FaPlus />
                                <input
                                    type='file'
                                    accept='image/*'
                                    multiple
                                    name='productImage'
                                    id='productImage'
                                    onChange={(e) => handleUploadProductImage(e)}
                                    hidden />
                            </label>
                        </div>
                    </div>
                    <button type='submit' className={`w-full py-2 ${stateModalProduct === 'POST' ? 'bg-red-600' : stateModalProduct === 'UPDATE' ? 'bg-green-600' : ''} text-white mt-4`}>{stateModalProduct === 'POST' ? 'Upload' : 'Save'}</button>
                </form>
                <div className='absolute right-0 top-0 bg-white rounded-full cursor-pointer' onClick={() => setModalProduct(false)}><SlClose size='2em' /></div>
            </div>
            {
                displayImg && <DisplayImage imgUrl={imgUrl} setDisplayImg={setDisplayImg} />
            }
        </div>
    )
}

export default ModalAdminProduct