import React, { useState } from 'react'
import { SlClose } from 'react-icons/sl'
import Rating from 'react-rating'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { AiOutlinePicture } from "react-icons/ai";
import { toast } from 'react-toastify'
import { createRate, uploadImageCloundinary } from '../services/apiServices'
const ModalRateProduct = (props) => {
    const { setModalRate, data, fetchRateByProId } = props
    const [star, setStar] = useState(0)
    const [file, setFile] = useState([])
    const [comment, setComment] = useState('')
    const handleSendRating = async () => {
        if (star === 0) {
            toast.dismiss()
            toast.warning(`Please rate the product before sending !`)
        }
        const res = await createRate(data?._id, star, comment, file)
        if (res && res.success) {
            toast.dismiss()
            toast.success(res.message)
            setModalRate(false)
            await fetchRateByProId()
        } else {
            toast.dismiss()
            toast.error(res.message)
        }
    }
    const handleUploadFile = async (e) => {
        const files = Array.from(e.target.files)
        if (files.length <= 3) {
            const uploadPromise = files.map(file => uploadImageCloundinary(file))
            if (uploadPromise) {
                const res = await Promise.all(uploadPromise);

                const newImages = res.map((rs) => (
                    {
                        url: rs.data.url,
                        id: rs.data.public_id
                    }
                ))

                setFile(prev => [...prev, ...newImages])
            }
        } else {
            toast.dismiss()
            toast.warning(`Only a maximum of 3 photos !`)
        }
    }
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-[rgba(0,0,0,0.8)]'>
            <div className='relative mx-auto bg-white shadow-md rounded-lg mt-20 lg:w-[40%] md:w-[60%] w-[80%] h-[550px] flex flex-col overflow-y-auto'>
                <h2 className='h-14 p-4 w-full bg-slate-200 flex items-center text-lg font-semibold'>
                    Reviews & comments
                </h2>
                <div className='p-4 flex flex-col gap-3'>
                    <div className='flex flex-col'>
                        <div className='flex items-center gap-2'>
                            <div className='h-14 w-14 p-2'>
                                <img src={data.productImage[0].url} alt='' className='w-full h-full object-contain hover:scale-125' />
                            </div>
                            <h2 className='capitalize font-semibold md:text-2xl text-xl'>
                                {data?.productName}
                            </h2>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center py-2 bg-slate-50 border rounded-lg shadow'>
                        <Rating
                            className='text-center'
                            onChange={(e) => setStar(e)}
                            initialRating={star}
                            placeholderRating={star}
                            emptySymbol={<FaRegStar className='text-yellow-600 px-4 md:text-base text-sm' size={'5em'} />}
                            fullSymbol={<FaStar className='text-red-600 px-4 md:text-base text-sm' size={'5em'} />}
                            placeholderSymbol={<FaStar className='text-red-600 px-4 md:text-base text-sm' size={'5em'} />}
                        />
                        <div className='items-center justify-center sm:flex hidden'>
                            <p className=''>Very bad</p>
                            <p className='ml-10'>Bad</p>
                            <p className='mx-10'>Normal</p>
                            <p className='mr-10'>Good</p>
                            <p>Great</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-xl'>Your comment:</p>
                        <textarea rows={5} onChange={(e) => setComment(e.target.value)} value={comment || ''} placeholder='Please share some feedback about the product (Minimum 15 characters).' className='border-slate-600 border outline-none p-2'></textarea>
                    </div>
                    <div className='flex sm:flex-row flex-col gap-2 sm:justify-between'>
                        <div className='flex flex-wrap gap-2 items-center'>
                            {
                                file.length > 0 && file.map((item, index) => {
                                    return (
                                        <div className='h-14 w-14 border p-1 border-slate-600 flex justify-center items-center cursor-pointer' key={index}>
                                            <img src={item.url} alt='' className='w-full h-full object-contain mix-blend-multiply' />
                                        </div>
                                    )
                                })
                            }
                            <label htmlFor='file' className='h-14 w-14 border-2 border-dashed border-slate-600 flex justify-center items-center cursor-pointer'>
                                <AiOutlinePicture size={'2em'} className='text-slate-600' />
                            </label>
                            <input type='file' accept='image/*' multiple id='file' name='file' hidden onChange={(e) => handleUploadFile(e)} />
                        </div>
                        <button onClick={handleSendRating} className='px-4 py-2 rounded-lg bg-red-600 text-white'>Send</button>
                    </div>
                </div>
                <div className='absolute right-0 top-0 bg-white rounded-full cursor-pointer' onClick={() => setModalRate(false)}><SlClose size='2em' /></div>
            </div>
        </div>
    )
}

export default ModalRateProduct