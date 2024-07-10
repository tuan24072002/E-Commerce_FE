import React, { useEffect, useRef, useState } from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { BsQrCodeScan } from "react-icons/bs"
import { FaHome } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import vnpay from '../assets/payment/vnpay.webp'
import onepay from '../assets/payment/onepay.webp'
import kredivo from '../assets/payment/kredivo.webp'
import zalopay from '../assets/payment/zalopay.webp'
import shopeepay from '../assets/payment/shopeepay.webp'
import { toast } from 'react-toastify';

const ChoosePaymentMethod = (props) => {
    const { setChoosePaymentMethod, receive, setSelectedPaymentMethod } = props
    const [paymentMethod, setPaymentMethod] = useState('')
    const handleConfirmSelectedPaymentMethod = () => {
        setSelectedPaymentMethod(paymentMethod)
        setChoosePaymentMethod(false)
        toast.dismiss()
        toast.success(`Add payment method successfully !`)
    }
    const inputRef1 = useRef(null)
    const inputRef2 = useRef(null)
    const inputRef3 = useRef(null)
    const inputRef4 = useRef(null)
    const inputRef5 = useRef(null)
    const inputRef6 = useRef(null)
    const inputRef7 = useRef(null)
    useEffect(() => {
        const inputRefs = [inputRef1, inputRef2, inputRef3, inputRef4, inputRef5, inputRef6, inputRef7];
        inputRefs.forEach((ref) => {
            if (ref.current && ref.current.disabled) {
                ref.current.parentElement.classList.add('bg-slate-200', 'hover:cursor-not-allowed', 'hover:bg-slate-200');
            }
        });
    }, [inputRef1, inputRef2, inputRef3, inputRef4, inputRef5, inputRef6, inputRef7]);
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.8)] flex justify-center items-center'>
            <div className='lg:w-[30%] md:w-[50%] w-[70%] min-h-fit max-h-[70%] overflow-hidden flex flex-col shadow rounded-lg bg-white'>
                <div className='bg-slate-200 p-4 rounded-tl-lg rounded-tr-lg relative'>
                    <h2 className='lg:text-lg font-medium text-slate-600'>Payment method</h2>
                    <IoIosCloseCircleOutline className='absolute top-2 right-2 text-slate-600 hover:text-red-600 cursor-pointer' size={'2em'} onClick={() => setChoosePaymentMethod(false)} />
                </div>
                <div className='grid gap-4 overflow-y-auto items-center p-2'>
                    {
                        receive === 'AtStore' ?
                            <label htmlFor='radio' className={`flex items-center justify-between p-4 border-2 ${inputRef1 !== null && inputRef1.current !== null && inputRef1?.current?.disabled && 'bg-slate-200 hover:cursor-not-allowed'} ${paymentMethod === 'Pay at the store' ? 'border-red-600' : 'border-slate-200'} hover:bg-red-200 hover:border-red-200 rounded-lg cursor-pointer`} title='Pay at the store'>
                                <div className='flex items-center gap-4'>
                                    <FaHome size={'2em'} />
                                    <p>Pay at the store</p>
                                </div>
                                <input type='radio' ref={inputRef1} id='radio' onChange={() => setPaymentMethod('Pay at the store')} checked={paymentMethod === 'Pay at the store'} className=' w-4 h-4 rounded-full appearance-none bg-slate-400  checked:bg-red-600' />
                            </label> : receive === 'AtHome' &&
                            <label htmlFor='radio2' className={`flex items-center justify-between p-4 border-2 ${inputRef1 !== null && inputRef1.current !== null && inputRef1?.current?.disabled && 'bg-slate-200 hover:cursor-not-allowed'} ${paymentMethod === 'Pay on delivery' ? 'border-red-600' : 'border-slate-200'} hover:bg-red-200 hover:border-red-200 rounded-lg cursor-pointer`} title='Pay on delivery'>
                                <div className='flex items-center gap-4'>
                                    <GiReceiveMoney size={'2em'} />
                                    <p>Pay on delivery</p>
                                </div>
                                <input type='radio' ref={inputRef1} id='radio2' onChange={() => setPaymentMethod('Pay on delivery')} checked={paymentMethod === 'Pay on delivery'} className=' w-4 h-4 rounded-full appearance-none bg-slate-400 checked:bg-red-600' />
                            </label>
                    }
                    <label htmlFor='radio3' className={`flex items-center justify-between p-4 border-2 ${inputRef2 !== null && inputRef2.current !== null && inputRef2?.current?.disabled && 'bg-slate-200 hover:cursor-not-allowed hover:bg-slate-200'} ${paymentMethod === 'Bank transfer via QR code' ? 'border-red-600' : 'border-slate-200'} hover:bg-red-200 hover:border-red-200 rounded-lg cursor-pointer`} title='Bank transfer via QR code'>
                        <div className='flex items-center gap-4'>
                            <BsQrCodeScan size={'2em'} />
                            <p>Bank transfer via QR code</p>
                        </div>
                        <input type='radio' ref={inputRef2} id='radio3' onChange={() => setPaymentMethod('Bank transfer via QR code')} checked={paymentMethod === 'Bank transfer via QR code'} className=' w-4 h-4 rounded-full appearance-none bg-slate-400  checked:bg-red-600' />
                    </label>
                    <label htmlFor='radio5' className={`flex items-center justify-between p-4 border-2 ${inputRef4 !== null && inputRef4.current !== null && inputRef4?.current?.disabled && 'bg-slate-200 hover:cursor-not-allowed hover:bg-slate-200'} ${paymentMethod === 'Via Visa / Master / JCB / Napas card' ? 'border-red-600' : 'border-slate-200'} hover:bg-red-200 hover:border-red-200 rounded-lg cursor-pointer`} title='Via Visa / Master / JCB / Napas card'>
                        <div className='flex items-center gap-4'>
                            <div className='w-[2em] h-[2em] flex justify-center items-center'>
                                <img src={onepay} alt='Via Visa / Master / JCB / Napas card' className='w-full h-full object-contain scale-125 mix-blend-multiply' />
                            </div>
                            <p>Via Visa / Master / JCB / Napas card</p>
                        </div>
                        <input type='radio' ref={inputRef4} id='radio5' value={'Via Visa / Master / JCB / Napas card'} onChange={(e) => setPaymentMethod(e.target.value)} checked={paymentMethod === 'Via Visa / Master / JCB / Napas card'} className=' w-4 h-4 rounded-full appearance-none bg-slate-400  checked:bg-red-600' />
                    </label>
                    <label htmlFor='radio4' className={`flex items-center justify-between p-4 border-2 ${inputRef3 !== null && inputRef3.current !== null && inputRef3?.current?.disabled && 'bg-slate-200 hover:cursor-not-allowed hover:bg-slate-200'} ${paymentMethod === 'VN PAY' ? 'border-red-600' : 'border-slate-200'} hover:bg-red-200 hover:border-red-200 rounded-lg cursor-pointer`} title='VN PAY'>
                        <div className='flex items-center gap-4'>
                            <div className='w-[2em] h-[2em] flex justify-center items-center'>
                                <img src={vnpay} alt='VN PAY' className='w-full h-full object-contain scale-125 mix-blend-multiply' />
                            </div>
                            <p>VN PAY</p>
                        </div>
                        <input type='radio' ref={inputRef3} disabled id='radio4' onChange={() => setPaymentMethod('VN PAY')} checked={paymentMethod === 'VN PAY'} className=' w-4 h-4 rounded-full appearance-none bg-slate-400  checked:bg-red-600' />
                    </label>
                    <label htmlFor='radio6' className={`flex items-center justify-between p-4 border-2 ${inputRef5 !== null && inputRef5.current !== null && inputRef5?.current?.disabled && 'bg-slate-200 hover:cursor-not-allowed hover:bg-slate-200'} ${paymentMethod === 'Kredivo' ? 'border-red-600' : 'border-slate-200'} hover:bg-red-200 hover:border-red-200 rounded-lg cursor-pointer`} title='Kredivo'>
                        <div className='flex items-center gap-4'>
                            <div className='w-[2em] h-[2em] flex justify-center items-center'>
                                <img src={kredivo} alt='Kredivo' className='w-full h-full object-contain scale-125 mix-blend-multiply' />
                            </div>
                            <p>Kredivo</p>
                        </div>
                        <input type='radio' ref={inputRef5} disabled id='radio6' onChange={() => setPaymentMethod('Kredivo')} checked={paymentMethod === 'Kredivo'} className=' w-4 h-4 rounded-full appearance-none bg-slate-400  checked:bg-red-600' />
                    </label>
                    <label htmlFor='radio7' className={`flex items-center justify-between p-4 border-2 ${inputRef6 !== null && inputRef6.current !== null && inputRef6?.current?.disabled && 'bg-slate-200 hover:cursor-not-allowed hover:bg-slate-200'} ${paymentMethod === 'ZaloPay' ? 'border-red-600' : 'border-slate-200'} hover:bg-red-200 hover:border-red-200 rounded-lg cursor-pointer`} title='ZaloPay'>
                        <div className='flex items-center gap-4'>
                            <div className='w-[2em] h-[2em] flex justify-center items-center'>
                                <img src={zalopay} alt='ZaloPay' className='w-full h-full object-contain scale-125 mix-blend-multiply' />
                            </div>
                            <p>ZaloPay</p>
                        </div>
                        <input type='radio' ref={inputRef6} disabled id='radio7' onChange={() => setPaymentMethod('ZaloPay')} checked={paymentMethod === 'ZaloPay'} className=' w-4 h-4 rounded-full appearance-none bg-slate-400 checked:bg-red-600' />
                    </label>
                    <label htmlFor='radio8' className={`flex items-center justify-between p-4 border-2 ${inputRef7 !== null && inputRef7.current !== null && inputRef7?.current?.disabled && 'bg-slate-200 hover:cursor-not-allowed hover:bg-slate-200'} ${paymentMethod === 'ShopeePay' ? 'border-red-600' : 'border-slate-200'} hover:bg-red-200 hover:border-red-200 rounded-lg cursor-pointer`} title='ShopeePay'>
                        <div className='flex items-center gap-4'>
                            <div className='w-[2em] h-[2em] flex justify-center items-center'>
                                <img src={shopeepay} alt='ShopeePay' className='w-full h-full object-contain scale-125 mix-blend-multiply' />
                            </div>
                            <p>ShopeePay</p>
                        </div>
                        <input type='radio' ref={inputRef7} disabled id='radio8' onChange={() => setPaymentMethod('ShopeePay')} checked={paymentMethod === 'ShopeePay'} className=' w-4 h-4 rounded-full appearance-none bg-slate-400 checked:bg-red-600' />
                    </label>
                    <button onClick={handleConfirmSelectedPaymentMethod} disabled={paymentMethod === ''} className='py-2 bg-red-600 hover:bg-red-500 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-medium rounded-lg'>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default ChoosePaymentMethod