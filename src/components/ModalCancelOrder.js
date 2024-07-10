import React, { useState } from 'react'
import Select from 'react-select';
import { IoMdSad } from "react-icons/io";
import { FaInfoCircle } from 'react-icons/fa';
import { IoIosClose } from "react-icons/io";
const ModalCancelOrder = (props) => {
    const { setIsModalCancel, data, confirm,
        setReason,
        reason,
        otherReason,
        setOtherReason,
        handleConfirmCancel } = props
    const [viewProduct, setViewProduct] = useState(false)
    const DefaultReasonCancel = {
        value: '', label: `Select a reason to ${data?.state === 'Wait for confirmation' ? 'cancel this order' : data?.state === 'Completed' && "return"} ...`
    }
    const OptionReasonCancel = [
        {
            value: 'No longer need to buy', label: 'No longer need to buy'
        },
        {
            value: 'Want to buy another product', label: 'Want to buy another product'
        },
        {
            value: 'Ordered by mistake', label: 'Ordered by mistake'
        },
        {
            value: 'Other reasons', label: 'Other reasons'
        }
    ]
    const OptionReasonReturn = [
        {
            value: 'The item does not match the picture', label: 'The item does not match the picture'
        },
        {
            value: 'The item does not match the description', label: 'The item does not match the description'
        },
        {
            value: 'No longer needed', label: 'No longer needed'
        },
        {
            value: 'Other reasons', label: 'Other reasons'
        }
    ]

    return (
        <>
            <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-[rgba(0,0,0,0.8)] overflow-hidden'>
                <div className=' mx-auto mt-20 bg-slate-100 shadow-md p-4 lg:w-[40%] md:w-[70%] w-[90%] h-[550px] overflow-y-auto'>
                    <div className='flex flex-col gap-3 overflow-y-auto relative'>
                        <h1 className='text-lg font-semibold text-center border bg-slate-600 text-white p-2'>{data?.state === 'Wait for confirmation' ? 'Cancel order' : data?.state === 'Completed' && "Product return"}</h1>
                        <div className='flex items-center justify-start gap-2'>
                            <IoMdSad size={'1.5em'} className='w-[50px]' />
                            <p className='lg:text-lg text-wrap'>Please let us know the reason why you want to {data?.state === 'Wait for confirmation' ? 'cancel' : data?.state === 'Completed' && 'return'} this order.</p>
                        </div>
                        <Select
                            defaultValue={DefaultReasonCancel}
                            onChange={(e) => setReason(e.value)}
                            options={data?.state === 'Wait for confirmation' ? OptionReasonCancel : data?.state === 'Completed' && OptionReasonReturn}
                            isOptionSelected={reason}
                        />
                        {
                            reason === 'Other reasons' &&
                            <div className={`p-2 bg-white rounded-lg relative ${confirm || otherReason === '' ? 'border border-red-600' : ' border border-white'}`}>
                                <input onChange={(e) => setOtherReason(e.target.value)} value={otherReason} type='text' placeholder='Other reasons...' className='w-full outline-none' />
                                {
                                    otherReason !== '' && <IoIosClose size={'2em'} className='absolute cursor-pointer hover:text-red-600 right-2 top-[50%] transform translate-y-[-50%]' onClick={() => setOtherReason('')} />
                                }
                            </div>
                        }
                        <div className='flex flex-col gap-2 bg-white h-fit rounded-lg p-4 relative'>
                            <div className='flex justify-between items-center'>
                                <div className='flex justify-start items-center gap-2'>
                                    <FaInfoCircle size='1.3em' className='text-red-600' />
                                    <p className='lg:text-lg font-semibold'>Order Information</p>
                                </div>
                                <p className={`py-1 px-2 border ${data?.state === 'Wait for confirmation' && data?.payment?.state ?
                                    'bg-red-200 text-red-600' : data?.state === 'Wait for confirmation' && !data?.payment?.state ?
                                        'bg-gray-200 text-gray-600' : data?.state === 'Confirmed' ?
                                            'bg-blue-600 text-white' : data?.state === 'Delivering' ?
                                                'bg-yellow-600 text-white' : data?.state === 'Completed' ?
                                                    'bg-green-600 text-white' : data?.state === 'Canceled' ?
                                                        'bg-slate-600 text-white' : ''} w-fit text-sm`}>{data?.state}</p>
                            </div>
                            <div className='flex justify-start gap-4 items-center'>
                                <p className='w-[50%]'>Order ID:</p>
                                <p className='font-semibold line-clamp-1 w-[50%]'>{data?._id}</p>
                            </div>
                            <div className='flex justify-start gap-4 items-center'>
                                <p className='w-[50%]'>Name:</p>
                                <p className='font-semibold line-clamp-1 w-[50%]'>{data?.name}</p>
                            </div>
                            <div className='flex justify-start gap-4 items-center'>
                                <p className='w-[50%]'>Phone number:</p>
                                <p className='font-semibold line-clamp-1 w-[50%]'>{data?.phoneNumber}</p>
                            </div>
                            <div className='flex justify-start gap-4 items-center'>
                                <p className='w-[50%]'>Address:</p>
                                <p className='font-semibold line-clamp-1 w-[50%]'>{String(data?.address)?.split(": ")[1]}</p>
                            </div>
                            <div className='flex justify-start gap-4 items-center'>
                                <p className='w-[50%]'>Total:</p>
                                <p className='font-semibold line-clamp-1 w-[50%]'>${Number(data?.total).toFixed(2)}</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            {
                                viewProduct && data?.product?.length > 0 && data?.product?.map((item, index) => {
                                    return (
                                        <div className='bg-white w-full h-32 rounded-lg relative' key={index}>
                                            <div className='grid md:grid-cols-[180px,1fr] grid-cols-[130px,1fr] h-full'>
                                                <div className='flex bg-slate-200 justify-center items-center h-32 rounded-tl-lg rounded-bl-lg'>
                                                    <img src={item?.productId?.productImage[0]?.url} alt='' className='h-[70%] object-scale-down' />
                                                </div>
                                                <div className='h-full p-4 flex flex-col md:gap-2 gap-1 relative'>
                                                    <div className='flex gap-1 md:flex-row flex-col md:justify-between'>
                                                        <div className='lg:text-lg font-semibold cursor-pointer capitalize w-fit'>{item?.productId?.productName}</div>
                                                        <p className='text-sm w-fit text-slate-400 font-semibold'>Quantity: {item?.quantity}</p>
                                                    </div>
                                                    <p className='font-semibold text-red-600 lg:text-lg'>${item?.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <p className='hover:underline hover:text-blue-600 cursor-pointer text-sm w-fit px-4' onClick={() => setViewProduct(prev => !prev)}>{viewProduct ? 'Hide' : 'View'} products...</p>
                        </div>
                        <div className='flex sm:flex-row flex-col gap-4 justify-between'>
                            <div className='grid grid-cols-1 text-red-600 text-xs'>
                                <p className='font-semibold'>(*) Completed orders can only be returned 7 days in advance</p>
                                <p className='font-semibold'>(*) Please provide pictures or videos for faster refund</p>
                            </div>
                            <div className='flex gap-2'>
                                <button className='py-1 px-2 border border-slate-600 text-slate-600 rounded-lg hover:bg-slate-600 hover:text-white' onClick={() => setIsModalCancel(false)}>Close</button>
                                <button className='py-1 px-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white' onClick={() => handleConfirmCancel()}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalCancelOrder