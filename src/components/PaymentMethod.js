import React, { useState } from 'react'
import { FaArrowLeft, FaInfoCircle, FaTruck } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowDropright } from "react-icons/io"
import { MdCardMembership, MdOutlinePayments } from "react-icons/md"
import ListProductPayment from './ListProductPayment'
import ChoosePaymentMethod from './ChoosePaymentMethod'
import { BsQrCodeScan } from "react-icons/bs"
import { FaHome } from "react-icons/fa";
import vnpay from '../assets/payment/vnpay.webp'
import onepay from '../assets/payment/onepay.webp'
import kredivo from '../assets/payment/kredivo.webp'
import zalopay from '../assets/payment/zalopay.webp'
import shopeepay from '../assets/payment/shopeepay.webp'
import { createPaymentStripe } from '../services/apiServices'
import { loadStripe } from '@stripe/stripe-js'
import { toast } from 'react-toastify'
import ModalQRCodePayment from './ModalQRCodePayment'
import { useSelector } from 'react-redux'
const PaymentMethod = (props) => {
    const { otherNote, receive, fetchProductCart, data, totalPrice, totalProduct, setStatePayment, addressHome, addressStore, nameReceive, phoneNumberReceive } = props
    const navigate = useNavigate()
    const user = useSelector(state => state?.user?.user)
    const [viewListProduct, setViewListProduct] = useState(false)
    const [choosePaymentMethod, setChoosePaymentMethod] = useState(false)
    const [isQrCodePayment, setIsQrCodePayment] = useState(false)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
    const handleMakeToPay = async () => {
        const stripe = await loadStripe(process.env.REACT_APP_PUBLISH_KEY_STRIPE)
        if (selectedPaymentMethod === 'Via Visa / Master / JCB / Napas card') {
            const res = await createPaymentStripe(data, nameReceive || user?.name, phoneNumberReceive || user?.phoneNumber, addressHome !== '' ? addressHome : addressStore, otherNote)
            if (res && res.success) {
                const result = await stripe.redirectToCheckout({
                    sessionId: res.session.id
                })
                console.log(result);
            }
        } else if (selectedPaymentMethod === 'Pay at the store' || selectedPaymentMethod === 'Pay on delivery') {
            navigate('/payment-success')
        } else if (selectedPaymentMethod === 'Bank transfer via QR code') {
            setIsQrCodePayment(true)
        } else if (selectedPaymentMethod !== '') {
            toast.warning(`Payment method not available !`)
        } else {
            toast.warning(`Please choose payment method !`)
        }
    }
    return (
        <>
            <div className='container mx-auto lg:max-w-[40%] md:max-w-[80%] sm:max-w-[90%] max-w-[100%] p-4 grid'>
                <div className='flex items-center justify-center relative pb-4 border-b-2 border-slate-400'>
                    <FaArrowLeft onClick={() => navigate('/cart')} className=' absolute left-0 cursor-pointer' size={'1.5em'} />
                    <h2 className='text-xl lg:text-2xl font-medium'>Information</h2>
                </div>
                <div className='grid grid-cols-2 items-center w-full my-3'>
                    <div className='text-center  text-slate-400 font-medium lg:text-xl text-lg cursor-pointer' onClick={() => setStatePayment('payment-info')}>
                        <h2>1. INFORMATION</h2>
                        <hr className='w-[80%] h-1 bg-slate-400 mx-auto mt-2' />
                    </div>
                    <div className='text-center font-medium text-red-600 lg:text-xl text-lg cursor-pointer' onClick={() => setStatePayment('payment-method')}>
                        <h2>2. PAYMENT</h2>
                        <hr className='w-[80%] h-1 bg-red-600 mx-auto mt-2' />
                    </div>
                </div>
                <div className='grid p-4 my-3 gap-2 bg-white rounded-lg shadow'>
                    <div className='flex justify-between'>
                        <h2 className='lg:text-lg font-medium text-slate-400'>Number of products:</h2>
                        <p className='lg:text-xl text-lg font-medium'>{totalProduct}</p>
                    </div>
                    <div className='flex justify-between'>
                        <h2 className='lg:text-lg font-medium text-slate-400'>Cash (temporary):</h2>
                        <p className='lg:text-xl text-lg font-medium'>${totalPrice}</p>
                    </div>
                    <div className='flex justify-between'>
                        <h2 className='lg:text-lg font-medium text-slate-400'>Transport fee:</h2>
                        <p className='lg:text-xl text-lg font-medium'>FREE</p>
                    </div>
                    <div className='flex justify-between py-4 border-t border-b'>
                        <h2 className='lg:text-lg font-medium text-slate-400'>Member discount (-10%):</h2>
                        <p className='lg:text-xl text-lg font-medium text-red-600'> - ${Number(totalPrice * 10 / 100).toFixed(2)}</p>
                    </div>
                    <div className='flex justify-between'>
                        <h2 className='lg:text-lg font-semibold'>Total price:</h2>
                        <p className='lg:text-xl text-lg font-semibold'>${Number(totalPrice - totalPrice * 10 / 100).toFixed(2)}</p>
                    </div>
                </div>
                <div className='grid my-3'>
                    <div className='flex justify-start items-center gap-2'>
                        <FaInfoCircle className='text-red-600' size={'1.2em'} />
                        <p className='font-medium lg:text-lg uppercase'>Billing Information</p>
                    </div>
                    <div className='mt-2 p-4 w-full grid items-center shadow rounded-lg hover:text-red-600 bg-white cursor-pointer' onClick={() => setChoosePaymentMethod(true)}>
                        {
                            selectedPaymentMethod === '' ? <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-4'>
                                    <MdOutlinePayments className='text-green-600' size={'1.5em'} />
                                    <h2 className='lg:text-lg font-semibold'>Select a payment method</h2>
                                </div>
                                <IoMdArrowDropright size={'1.8em'} />
                            </div> :
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-4'>
                                        {
                                            selectedPaymentMethod === 'VN PAY' ?
                                                <div className='w-[2em] h-[2em] flex justify-center items-center'>
                                                    <img src={vnpay} alt='VN PAY' className='w-full h-full object-contain scale-125 mix-blend-multiply' />
                                                </div> : selectedPaymentMethod === 'Via Visa / Master / JCB / Napas card' ?
                                                    <div className='w-[2em] h-[2em] flex justify-center items-center'>
                                                        <img src={onepay} alt='VN PAY' className='w-full h-full object-contain scale-125 mix-blend-multiply' />
                                                    </div> : selectedPaymentMethod === 'Kredivo' ?
                                                        <div className='w-[2em] h-[2em] flex justify-center items-center'>
                                                            <img src={kredivo} alt='VN PAY' className='w-full h-full object-contain scale-125 mix-blend-multiply' />
                                                        </div> : selectedPaymentMethod === 'ZaloPay' ?
                                                            <div className='w-[2em] h-[2em] flex justify-center items-center'>
                                                                <img src={zalopay} alt='VN PAY' className='w-full h-full object-contain scale-125 mix-blend-multiply' />
                                                            </div> : selectedPaymentMethod === 'ShopeePay' ?
                                                                <div className='w-[2em] h-[2em] flex justify-center items-center'>
                                                                    <img src={shopeepay} alt='VN PAY' className='w-full h-full object-contain scale-125 mix-blend-multiply' />
                                                                </div> : selectedPaymentMethod === 'Pay at the store' || selectedPaymentMethod === 'Pay on delivery' ?
                                                                    <FaHome size={'2em'} /> : selectedPaymentMethod === 'Bank transfer via QR code' &&
                                                                    <BsQrCodeScan size={'2em'} />
                                        }
                                        <h2 className='lg:text-lg font-semibold'>{selectedPaymentMethod}</h2>
                                    </div>
                                    <IoMdArrowDropright size={'1.8em'} />
                                </div>
                        }
                    </div>
                </div>
                <div className='grid my-3'>
                    <div className='flex justify-start items-center gap-2'>
                        <FaTruck className='text-red-600' size={'1.2em'} />
                        <p className='font-medium lg:text-lg uppercase'>Delivery information</p>
                    </div>
                    <div className='mt-2 p-4 gap-4 w-full grid items-center shadow rounded-lg bg-white'>
                        <div className='flex items-center justify-between'>
                            <h2 className='lg:text-lg font-medium text-slate-400'>Customer :</h2>
                            <p className='lg:text-lg font-medium flex items-center gap-2'><MdCardMembership className='text-red-600 cursor-pointer' title='Membership' size={'1.5em'} /><span>{user?.name}</span></p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <h2 className='lg:text-lg font-medium text-slate-400'>Phone number :</h2>
                            <p className='lg:text-lg font-medium'>{user?.phoneNumber}</p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <h2 className='lg:text-lg font-medium text-slate-400'>Email :</h2>
                            <p className='lg:text-lg font-medium'>{user?.email}</p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <h2 className='lg:text-lg font-medium text-slate-400 w-[60%]'>Pick up at :</h2>
                            <p className='lg:text-lg text-wrap font-medium'>{addressHome?.slice(6) || addressStore?.slice(7)}</p>
                        </div>
                        {
                            addressHome !== '' && <div className='flex items-center justify-between'>
                                <h2 className='lg:text-lg font-medium text-slate-400'>Receiver :</h2>
                                <p className='lg:text-lg font-medium'>{nameReceive} - {phoneNumberReceive}</p>
                            </div>
                        }
                        {
                            otherNote !== '' && <div className='flex items-center justify-between'>
                                <h2 className='lg:text-lg font-medium text-slate-400'>Other note :</h2>
                                <p className='lg:text-lg text-wrap font-medium'>{otherNote}</p>
                            </div>
                        }
                    </div>
                </div>
                <div className='bg-white rounded-lg shadow w-full grid gap-2 p-4'>
                    <div className='flex items-center justify-between'>
                        <p className='font-bold lg:text-lg'>Total Price :</p>
                        <p className='text-red-600 font-bold lg:text-lg'>${Number(totalPrice - totalPrice * 10 / 100).toFixed(2)}</p>
                    </div>
                    <button className='bg-red-600 hover:bg-red-500 py-2 rounded-lg font-semibold text-white uppercase' onClick={handleMakeToPay}>Pay</button>
                    <p className='hover:underline cursor-pointer text-center mt-2 text-blue-600' onClick={() => setViewListProduct(true)}>Check out the product list ({totalProduct})</p>
                </div>
            </div>
            {
                viewListProduct && <ListProductPayment fetchProductCart={fetchProductCart} data={data} setViewListProduct={setViewListProduct} />
            }
            {
                choosePaymentMethod && <ChoosePaymentMethod receive={receive} setChoosePaymentMethod={setChoosePaymentMethod} setSelectedPaymentMethod={setSelectedPaymentMethod} />
            }
            {
                isQrCodePayment && <ModalQRCodePayment
                    setIsQrCodePayment={setIsQrCodePayment}
                    data={data}
                    addressHome={addressHome}
                    addressStore={addressStore}
                    nameReceive={nameReceive}
                    phoneNumberReceive={phoneNumberReceive}
                    user={user}
                    otherNote={otherNote}
                    selectedPaymentMethod={selectedPaymentMethod}
                    totalPrice={totalPrice} />
            }
        </>
    )
}

export default PaymentMethod