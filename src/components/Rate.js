import React, { useState } from 'react'
import { FaCheckCircle, FaRegClock, FaRegSmileBeam, FaRegStar, FaStar } from 'react-icons/fa'
import moment from 'moment'
import ModalRateProduct from './ModalRateProduct';
import ModalPicture from './ModalPicture';
const Rate = (props) => {
    const { data, dataRate, fetchRateByProId, average } = props
    const [filterStar, setFilterStar] = useState(0)
    const [modalRate, setModalRate] = useState(false)
    const [isModalPicture, setIsModalPicture] = useState(false)
    const [urlPicture, setUrlPicture] = useState('')
    const count5s = dataRate?.filter(i => i?.star === 5).length
    const count4s = dataRate?.filter(i => i?.star === 4).length
    const count3s = dataRate?.filter(i => i?.star === 3).length
    const count2s = dataRate?.filter(i => i?.star === 2).length
    const count1s = dataRate?.filter(i => i?.star === 1).length
    const formatNumber = (number) => {
        if (Number.isInteger(number)) {
            return number
        } else {
            return Number(number).toFixed(1)
        }
    }
    return (
        <>
            <div className='bg-white flex flex-col p-4 rounded-lg h-fit'>
                <h2 className='lg:text-lg font-semibold'>Reviews & comments {data?.productName}</h2>
                <div className='grid grid-cols-1 h-full relative'>
                    <div className='lg:grid lg:grid-cols-2 flex flex-col-reverse relative'>
                        <div className='flex flex-col gap-1 justify-center items-center'>
                            <p className='text-lg font-semibold'>{average ? formatNumber(average) : 0}/5</p>
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
                            </div>
                            <p className='text-blue-600 cursor-pointer'><b>{dataRate?.length}</b> Comments</p>
                        </div>
                        <div className='p-4 flex justify-center items-center'>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className='flex gap-1 items-center'>5 <FaStar className='text-red-600' /></td>
                                        <td className='px-2'>
                                            <div className='rounded-full sm:w-[15rem] w-[10rem] h-2 relative bg-slate-200'>
                                                <hr className={`rounded-full my-auto h-2 absolute left-0 top-[50%] transform -translate-y-1/2 bg-red-600`} style={{ width: `${count5s > 100 ? 100 : count5s}%` }} />
                                            </div>
                                        </td>
                                        <td className='text-sm sm:block hidden'>{count5s} Comments</td>
                                    </tr>
                                    <tr>
                                        <td className='flex gap-1 items-center'>4 <FaStar className='text-red-600' /></td>
                                        <td className='px-2'>
                                            <div className='rounded-full sm:w-[15rem] w-[10rem] h-2 relative bg-slate-200'>
                                                <hr className={`rounded-full my-auto h-2 absolute left-0 top-[50%] transform translate-y-[-50%] bg-red-600`} style={{ width: `${count4s > 100 ? 100 : count4s}%` }} />
                                            </div>
                                        </td>
                                        <td className='text-sm sm:block hidden'>{count4s} Comments</td>
                                    </tr>
                                    <tr>
                                        <td className='flex gap-1 items-center'>3 <FaStar className='text-red-600' /></td>
                                        <td className='px-2'>
                                            <div className='rounded-full sm:w-[15rem] w-[10rem] h-2 relative bg-slate-200'>
                                                <hr className={`rounded-full my-auto h-2 absolute left-0 top-[50%] transform translate-y-[-50%] bg-red-600`} style={{ width: `${count3s > 100 ? 100 : count3s}%` }} />
                                            </div>
                                        </td>
                                        <td className='text-sm sm:block hidden'>{count3s} Comments</td>
                                    </tr>
                                    <tr>
                                        <td className='flex gap-1 items-center'>2 <FaStar className='text-red-600' /></td>
                                        <td className='px-2'>
                                            <div className='rounded-full sm:w-[15rem] w-[10rem] h-2 relative bg-slate-200'>
                                                <hr className={`rounded-full my-auto h-2 absolute left-0 top-[50%] transform translate-y-[-50%] bg-red-600`} style={{ width: `${count2s > 100 ? 100 : count2s}%` }} />
                                            </div>
                                        </td>
                                        <td className='text-sm sm:block hidden'>{count2s} Comments</td>
                                    </tr>
                                    <tr>
                                        <td className='flex gap-1 items-center'>1 <FaStar className='text-red-600' /></td>
                                        <td className='px-2'>
                                            <div className='rounded-full sm:w-[15rem] w-[10rem] h-2 relative bg-slate-200'>
                                                <hr className={`rounded-full my-auto h-2 absolute left-0 top-[50%] transform translate-y-[-50%] bg-red-600`} style={{ width: `${count1s > 100 ? 100 : count1s}%` }} />
                                            </div>
                                        </td>
                                        <td className='text-sm sm:block hidden'>{count1s} Comments</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='h-[50%] lg:block hidden w-[1px] bg-slate-400 absolute right-[50%] top-[50%] transform translate-y-[-50%] translate-x-[-50%]'></div>
                    </div>
                    <div className='flex flex-col gap-4 justify-center items-center border-t border-b h-32'>
                        <p className='lg:text-lg flex items-center gap-2'>How do you rate this product? <FaRegSmileBeam /></p>
                        <button onClick={() => setModalRate(true)} className='px-4 py-2 bg-red-600 rounded-lg text-white'>Rate now</button>
                    </div>
                    <div className='p-2 flex flex-col'>
                        {
                            dataRate.length > 0 &&
                            <div className='flex items-center flex-wrap gap-2'>
                                <button className={`border px-2 py-1 rounded-full w-12 ${filterStar === 0 ? 'border-red-600 text-red-600 bg-red-200' : 'border-slate-600'}`} onClick={() => setFilterStar(0)}>All</button>
                                <button className={`border px-2 py-1 flex items-center gap-1 w-12 rounded-full ${filterStar === 5 ? 'border-red-600 text-red-600 bg-red-200' : 'border-slate-600'}`} onClick={() => setFilterStar(5)}>5 <FaStar className='text-red-600' /></button>
                                <button className={`border px-2 py-1 flex items-center gap-1 w-12 rounded-full ${filterStar === 4 ? 'border-red-600 text-red-600 bg-red-200' : 'border-slate-600'}`} onClick={() => setFilterStar(4)}>4 <FaStar className='text-red-600' /></button>
                                <button className={`border px-2 py-1 flex items-center gap-1 w-12 rounded-full ${filterStar === 3 ? 'border-red-600 text-red-600 bg-red-200' : 'border-slate-600'}`} onClick={() => setFilterStar(3)}>3 <FaStar className='text-red-600' /></button>
                                <button className={`border px-2 py-1 flex items-center gap-1 w-12 rounded-full ${filterStar === 2 ? 'border-red-600 text-red-600 bg-red-200' : 'border-slate-600'}`} onClick={() => setFilterStar(2)}>2 <FaStar className='text-red-600' /></button>
                                <button className={`border px-2 py-1 flex items-center gap-1 w-12 rounded-full ${filterStar === 1 ? 'border-red-600 text-red-600 bg-red-200' : 'border-slate-600'}`} onClick={() => setFilterStar(1)}>1 <FaStar className='text-red-600' /></button>
                            </div>
                        }
                        {
                            dataRate.length > 0 && dataRate.map((item, index) => {
                                if (filterStar === item?.star || filterStar === 0) {
                                    return (
                                        <div className='h-fit flex flex-col gap-2 border-b my-4 p-4' key={index}>
                                            <div className='flex gap-2'>
                                                <div className='w-10 h-10'>
                                                    <img src={item?.userId?.profilePic} alt='' className='h-full w-full object-cover rounded-full' />
                                                </div>
                                                <div className='flex flex-col justify-center'>
                                                    <div className='flex items-center gap-4'>
                                                        <p>{item?.userId?.name}</p>
                                                        <p className='flex items-center gap-2 text-sm text-slate-400'><FaRegClock /> {moment(item?.createdAt).format('DD/MM/yyyy HH:mm')}</p>
                                                    </div>
                                                    {
                                                        item?.purchased && <p className='flex items-center text-sm text-green-500 gap-2'><FaCheckCircle />Purchased product</p>
                                                    }
                                                </div>
                                            </div>
                                            <div className='flex items-center gap-2 ml-12 text-red-600'>
                                                {
                                                    Array.from({ length: Math.round(item?.star) }).map((_, index) => {
                                                        return (
                                                            <FaStar key={index} />
                                                        )
                                                    })
                                                }
                                                {
                                                    Array.from({ length: Math.round(5 - item?.star) }).map((_, index) => {
                                                        return (
                                                            <FaRegStar key={index} />
                                                        )
                                                    })
                                                }
                                            </div>
                                            <p className='ml-12 text-wrap line-clamp-3'>{item?.comment}</p>
                                            <div className='flex items-center gap-2 ml-12'>
                                                {
                                                    item?.image?.length > 0 && item?.image.map((img, index) => {
                                                        return (
                                                            <div className='w-12 h-12 border' key={index}>
                                                                <img src={img?.url} alt='' className='w-full h-full object-cover cursor-pointer' onClick={() => { setIsModalPicture(true); setUrlPicture(img?.url) }} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return <></>
                                }
                            })
                        }
                    </div>
                </div>
            </div>
            {
                modalRate && <ModalRateProduct setModalRate={setModalRate} data={data} fetchRateByProId={fetchRateByProId} />
            }
            {
                isModalPicture && <ModalPicture urlPicture={urlPicture} setIsModalPicture={setIsModalPicture} />
            }
        </>
    )
}

export default Rate