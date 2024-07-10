import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import { toast } from 'react-toastify';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaUserCircle, FaAddressCard } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { MdCardMembership } from "react-icons/md";
import { IoMdClose } from "react-icons/io"
import SelectedDeliveryAtStore from '../components/SelectedDeliveryAtStore';
import SelectedDeliveryAtHome from '../components/SelectedDeliveryAtHome';
const PaymentInfo = (props) => {
    const { otherNote, setOtherNote, receive, setReceive, isLoading, totalPrice, data, setStatePayment, addressHome, setAddressHome, addressStore, setAddressStore, nameReceive, setNameReceive, phoneNumberReceive, setPhoneNumberReceive } = props
    const navigate = useNavigate()
    const user = useSelector(state => state?.user?.user)
    const [email, setEmail] = useState('')
    const [showMore, setShowMore] = useState(false)

    useEffect(() => {
        if (user?.email) {
            setEmail(user?.email)
        }
    }, [user?.email])

    const handleNextMethodPayment = () => {
        if ((receive === 'AtStore' && addressStore.startsWith('Store:')) || (receive === 'AtHome' && nameReceive !== '' && phoneNumberReceive !== '' && addressHome.startsWith('Home:'))) {
            setStatePayment('payment-method')
        } else {
            toast.dismiss()
            toast.warning(`Please fill in all information before making payment !`)
        }
    }
    return (
        isLoading ? <div className='container mx-auto lg:max-w-[40%] md:max-w-[80%] sm:max-w-[90%] max-w-[100%] p-4 grid'>
            <div className='flex items-center justify-center relative pb-4 border-b-2 border-slate-400'>
                <FaArrowLeft onClick={() => navigate('/cart')} className=' absolute left-0 cursor-pointer' size={'1.5em'} />
                <h2 className='text-xl lg:text-2xl font-medium'>Information</h2>
            </div>
            <div className='grid grid-cols-2 items-center w-full my-3'>
                <div className='text-center text-red-600 font-medium lg:text-xl text-lg cursor-pointer' onClick={() => setStatePayment('payment-info')}>
                    <h2>1. INFORMATION</h2>
                    <hr className='w-[80%] h-1 bg-red-600 mx-auto mt-2' />
                </div>
                <div className='text-center font-medium text-slate-400 lg:text-xl text-lg cursor-pointer' onClick={handleNextMethodPayment}>
                    <h2>2. PAYMENT</h2>
                    <hr className='w-[80%] h-1 bg-slate-400 mx-auto mt-2' />
                </div>
            </div>
            <div className={`flex flex-col gap-2 rounded-lg items-center my-3`}>
                <div className={`w-full h-36 bg-white rounded-tl-lg rounded-tr-lg flex cursor-pointer group animate-pulse`} >
                    <div className='h-full p-4 min-w-[120px] md:min-w-[145px] rounded-tl-lg rounded-bl-lg bg-slate-200' style={{ transition: '0.5s linear' }}>

                    </div>
                    <div className='p-3 grid w-full'>
                        <div className='font-medium text-base md:text-lg h-4 bg-slate-200'></div>
                        <div className='h-4 bg-slate-200'></div>
                        <div className='flex justify-between w-full'>
                            <div className='grid grid-cols-2 gap-3 w-[50%]'>
                                <div className='h-4 bg-slate-200'></div>
                                <div className='h-4 bg-slate-200'></div>
                            </div>
                            <div className='h-4 bg-slate-200 w-20'>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full my-3'>
                <div className='flex justify-start items-center gap-2'>
                    <FaUserCircle className='text-red-600' />
                    <p className='font-medium lg:text-lg'>CUSTOMER INFORMATION</p>
                </div>
                <div className='mt-2 w-full bg-white rounded-lg shadow'>
                    <div className='w-full p-4 flex flex-col gap-2 items-center'>
                        <div className='flex items-center justify-between w-full'>
                            <div className='flex items-center gap-2'>
                                <div className='animate-pulse h-4 w-20 bg-slate-200'></div><MdCardMembership className='text-red-600 cursor-pointer' title='Membership' size={'1.5em'} />
                            </div>
                            <p className='h-4 w-32 bg-slate-200 animate-pulse'></p>
                        </div>
                        <div className='flex flex-col justify-start w-full gap-2'>
                            <div className='grid grid-cols-1 gap-1 items-center w-full'>
                                <label className='lg:text-sm text-xs font-medium text-slate-400'>EMAIL</label>
                                <div className='relative items-center group'>
                                    <input type='text' value={''} placeholder='abc@gmail.com' onChange={(e) => setEmail(e.target.value)} className='border-b pb-2 border-slate-400 outline-none focus:border-green-600 w-full' />
                                    {email !== '' && <IoMdClose className='absolute cursor-pointer right-0 top-0 group-hover:block group-focus-within:block hidden' onClick={() => setEmail('')} />}
                                </div>
                            </div>
                            <p className='text-xs italic text-slate-400'>(*) VAT invoice will be sent via this email</p>
                            <div className='flex items-center gap-2 '>
                                <input type='checkbox' id='sendNotify' className='cursor-pointer' />
                                <label htmlFor='sendNotify' className='cursor-pointer'>Receive email notifications and offers</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full my-3'>
                <div className='flex justify-start items-center gap-2'>
                    <FaAddressCard className='text-red-600' />
                    <p className='font-medium lg:text-lg'>RECEIVING INFORMATION</p>
                </div>
                <div className='mt-2 w-full grid items-center shadow rounded-lg'>
                    <div className='flex items-center rounded-lg '>
                        <div className={`w-full flex items-center ${receive === 'AtStore' ? 'bg-slate-400' : 'bg-white'} rounded-tl-lg`}>
                            <div className={`w-full px-2 py-4 flex items-center gap-2  rounded-tl-lg ${receive === 'AtStore' ? 'bg-white rounded-tr-lg' : 'bg-slate-400 rounded-br-lg'}`}>
                                <input type='radio' id='receiveAtStore' className='w-3 h-3 appearance-none bg-white checked:bg-red-500 checked:animate-ping rounded-full transition-all' onChange={() => setReceive('AtStore')} name='receive' value={receive || ''} checked={receive === 'AtStore'} />
                                <label htmlFor='receiveAtStore' className='cursor-pointer'>Pick up in store</label>
                            </div>
                        </div>
                        <div className={`w-full flex items-center ${receive === 'AtHome' ? 'bg-slate-400' : 'bg-white'} rounded-tr-lg`}>
                            <div className={`w-full px-2 py-4 flex items-center gap-2 rounded-tr-lg ${receive === 'AtHome' ? 'bg-white  rounded-tl-lg' : 'bg-slate-400  rounded-bl-lg'}`}>
                                <input type='radio' id='receiveAtHome' className='w-3 h-3 appearance-none bg-white checked:bg-red-500 checked:animate-ping rounded-full  transition-all' onChange={() => setReceive('AtHome')} name='receive' value={receive || ''} checked={receive === 'AtHome'} />
                                <label htmlFor='receiveAtHome' className='cursor-pointer'>Delivery at home</label>
                            </div>
                        </div>
                    </div>
                    <div className='h-fit bg-white rounded-bl-lg rounded-br-lg'>
                        {
                            receive === 'AtStore' ? <SelectedDeliveryAtStore /> :
                                receive === 'AtHome' && <SelectedDeliveryAtHome />
                        }
                    </div>
                </div>
            </div>
            <div className='bg-white rounded-lg shadow w-full grid gap-2 p-4'>
                <div className='flex items-center justify-between'>
                    <p className='font-bold lg:text-lg'>Total Price :</p>
                    <p className='bg-slate-200 h-4 w-20 animate-pulse'></p>
                </div>
                <button disabled className='bg-slate-400 cursor-not-allowed py-2 rounded-lg font-semibold text-white'>Next</button>
            </div>
        </div> :
            <div className='container mx-auto lg:max-w-[40%] md:max-w-[80%] sm:max-w-[90%] max-w-[100%] p-4 grid'>
                <div className='flex items-center justify-center relative pb-4 border-b-2 border-slate-400'>
                    <FaArrowLeft onClick={() => navigate('/cart')} className=' absolute left-0 cursor-pointer' size={'1.5em'} />
                    <h2 className='text-xl lg:text-2xl font-medium'>Information</h2>
                </div>
                <div className='grid grid-cols-2 items-center w-full my-3'>
                    <div className='text-center text-red-600 font-medium lg:text-xl text-lg cursor-pointer' onClick={() => setStatePayment('payment-info')}>
                        <h2>1. INFORMATION</h2>
                        <hr className='w-[80%] h-1 bg-red-600 mx-auto mt-2' />
                    </div>
                    <div className='text-center font-medium text-slate-400 lg:text-xl text-lg cursor-pointer' onClick={handleNextMethodPayment}>
                        <h2>2. PAYMENT</h2>
                        <hr className='w-[80%] h-1 bg-slate-400 mx-auto mt-2' />
                    </div>
                </div>
                <div className={`flex flex-col rounded-lg items-center shadow ${data.length > 1 ? 'bg-slate-200' : 'bg-white'} my-3`}>
                    <div className={`w-full h-36 bg-white rounded-tl-lg rounded-tr-lg flex cursor-pointer group`} >
                        <div className='h-full p-4 min-w-[120px] md:min-w-[145px] rounded-tl-lg rounded-bl-lg' style={{ transition: '0.5s linear' }}>
                            <img src={data[0]?.productId?.productImage[0]?.url} alt='' className='h-full object-scale-down  group-hover:scale-110' style={{ transition: '0.5s linear' }} />
                        </div>
                        <div className='p-3 grid w-full'>
                            <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1'>{data[0]?.productId?.productName}</h2>
                            <p className='capitalize text-slate-500'>{data[0]?.productId?.category}</p>
                            <div className='flex justify-between'>
                                <div className='flex gap-3'>
                                    <p className='text-slate-500 line-through'>${data[0]?.productId?.price}</p>
                                    <p className='text-red-600 font-medium'>${data[0]?.productId?.sellingPrice}</p>
                                </div>
                                <div>
                                    <p>Quantity: <span className='font-medium text-red-600'>{data[0]?.quantity}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        showMore && <hr className='h-[2px] bg-slate-300' />
                    }
                    {
                        showMore && data && data.length > 0 && data.map((pro, index) => {
                            if (index > 0) {
                                return (
                                    <>
                                        <div className={`w-full h-36  bg-white ${showMore && 'pb-2 border-b-[1px] border-slate-300'} flex cursor-pointer group`} key={index} >
                                            <div className='h-full p-4 min-w-[120px] md:min-w-[145px] rounded-tl-lg rounded-bl-lg' style={{ transition: '0.5s linear' }}>
                                                <img src={pro?.productId?.productImage[0]?.url} alt='' className='h-full object-scale-down  group-hover:scale-110' style={{ transition: '0.5s linear' }} />
                                            </div>
                                            <div className='p-3 grid w-full'>
                                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1'>{pro?.productId?.productName}</h2>
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
                                        </div>
                                        <hr className='h-[2px] bg-slate-300' />
                                    </>
                                )
                            } else {
                                return null
                            }
                        })
                    }
                    <div className={`flex ${data.length === 1 && 'h-2'} items-center justify-center gap-1 hover:text-red-600 cursor-pointer`} onClick={() => setShowMore(prev => !prev)}>
                        {
                            data.length > 1 && !showMore ?
                                <>
                                    <p className='font-medium'>And {data.length - 1} other product{data.length - 1 > 1 && 's'}</p> <IoIosArrowDown />
                                </>
                                : data.length > 1 && showMore && <>
                                    <p className='font-medium'>Hide more</p> <IoIosArrowUp />
                                </>
                        }
                    </div>
                </div>
                <div className='w-full my-3'>
                    <div className='flex justify-start items-center gap-2'>
                        <FaUserCircle className='text-red-600' />
                        <p className='font-medium lg:text-lg'>CUSTOMER INFORMATION</p>
                    </div>
                    <div className='mt-2 w-full bg-white rounded-lg shadow'>
                        <div className='w-full p-4 flex flex-col gap-2 items-center'>
                            <div className='flex items-center justify-between w-full'>
                                <div className='flex items-center gap-2'>
                                    <h2 className='lg:text-lg'>{user?.name} </h2><MdCardMembership className='text-red-600 cursor-pointer' title='Membership' size={'1.5em'} />
                                </div>
                                <p className='lg:text-lg font-medium text-slate-400'>{user?.phoneNumber || '0123456789'}</p>
                            </div>
                            <div className='flex flex-col justify-start w-full gap-2'>
                                <div className='grid grid-cols-1 gap-1 items-center w-full'>
                                    <label className='lg:text-sm text-xs font-medium text-slate-400'>EMAIL</label>
                                    <div className='relative items-center group'>
                                        <input type='text' value={email || ''} placeholder='abc@gmail.com' onChange={(e) => setEmail(e.target.value)} className='border-b pb-2 border-slate-400 outline-none focus:border-green-600 w-full' />
                                        {email !== '' && <IoMdClose className='absolute cursor-pointer right-0 top-0 group-hover:block group-focus-within:block hidden' onClick={() => setEmail('')} />}
                                    </div>
                                </div>
                                <p className='text-xs italic text-slate-400'>(*) VAT invoice will be sent via this email</p>
                                <div className='flex items-center gap-2 '>
                                    <input type='checkbox' id='sendNotify' className='cursor-pointer' />
                                    <label htmlFor='sendNotify' className='cursor-pointer'>Receive email notifications and offers</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full my-3'>
                    <div className='flex justify-start items-center gap-2'>
                        <FaAddressCard className='text-red-600' />
                        <p className='font-medium lg:text-lg'>RECEIVING INFORMATION</p>
                    </div>
                    <div className='mt-2 w-full grid items-center shadow rounded-lg'>
                        <div className='flex items-center rounded-lg '>
                            <div className={`w-full flex items-center ${receive === 'AtStore' ? 'bg-slate-400' : 'bg-white'} rounded-tl-lg`}>
                                <div className={`w-full px-2 py-4 flex items-center gap-2  rounded-tl-lg ${receive === 'AtStore' ? 'bg-white rounded-tr-lg' : 'bg-slate-400 rounded-br-lg'}`}>
                                    <input type='radio' id='receiveAtStore' className='w-3 h-3 appearance-none bg-white checked:bg-red-500 checked:animate-ping rounded-full transition-all' onChange={() => setReceive('AtStore')} name='receive' value={receive || ''} checked={receive === 'AtStore'} />
                                    <label htmlFor='receiveAtStore' className='cursor-pointer'>Pick up in store</label>
                                </div>
                            </div>
                            <div className={`w-full flex items-center ${receive === 'AtHome' ? 'bg-slate-400' : 'bg-white'} rounded-tr-lg`}>
                                <div className={`w-full px-2 py-4 flex items-center gap-2 rounded-tr-lg ${receive === 'AtHome' ? 'bg-white  rounded-tl-lg' : 'bg-slate-400  rounded-bl-lg'}`}>
                                    <input type='radio' id='receiveAtHome' className='w-3 h-3 appearance-none bg-white checked:bg-red-500 checked:animate-ping rounded-full  transition-all' onChange={() => setReceive('AtHome')} name='receive' value={receive || ''} checked={receive === 'AtHome'} />
                                    <label htmlFor='receiveAtHome' className='cursor-pointer'>Delivery at home</label>
                                </div>
                            </div>
                        </div>
                        <div className='h-fit bg-white rounded-bl-lg rounded-br-lg'>
                            {
                                receive === 'AtStore' ?
                                    <SelectedDeliveryAtStore addressStore={addressStore}
                                        setAddressStore={setAddressStore}
                                        receive={receive}
                                        setAddressHome={setAddressHome}
                                        otherNote={otherNote}
                                        setOtherNote={setOtherNote} /> :
                                    receive === 'AtHome' && <SelectedDeliveryAtHome addressHome={addressHome}
                                        setAddressHome={setAddressHome}
                                        receive={receive}
                                        nameReceive={nameReceive}
                                        setNameReceive={setNameReceive}
                                        phoneNumberReceive={phoneNumberReceive}
                                        setPhoneNumberReceive={setPhoneNumberReceive}
                                        setAddressStore={setAddressStore}
                                        otherNote={otherNote}
                                        setOtherNote={setOtherNote} />
                            }
                        </div>
                    </div>
                </div>
                <div className='bg-white rounded-lg shadow w-full grid gap-2 p-4'>
                    <div className='flex items-center justify-between'>
                        <p className='font-bold lg:text-lg'>Total Price :</p>
                        <p className='text-red-600 font-bold lg:text-lg'>${totalPrice}</p>
                    </div>
                    <button className='bg-red-600 hover:bg-red-500 py-2 rounded-lg font-semibold text-white' onClick={handleNextMethodPayment}>Next</button>
                </div>
            </div>
    )
}

export default PaymentInfo