import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { TiTick } from "react-icons/ti";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createNewOrder, getResultPaymentStripe } from '../services/apiServices';
import { toast } from 'react-toastify';
import { Context } from '../context/context';
import { useSelector } from 'react-redux';
const PaymentSuccess = () => {
    const [timeout, setTimeout] = useState(5)
    const hasFetchedRef = useRef(false);
    const navigate = useNavigate()
    const location = useLocation()
    const { fetchCountCartProduct,
        nameReceive,
        setNameReceive,
        phoneNumberReceive,
        setPhoneNumberReceive,
        addressHome,
        setAddressHome,
        addressStore,
        setAddressStore,
        otherNote,
        setOtherNote } = useContext(Context)
    const user = useSelector(state => state?.user?.user)

    const fetchGetResultPayment = useCallback(async () => {
        if (hasFetchedRef.current) return;
        hasFetchedRef.current = true;
        if (location?.search !== '') {
            const rs = await getResultPaymentStripe(location?.search)
            if (rs && rs.success && rs.message === 'Payment successfully!') {
                const res = await createNewOrder(rs.session.metadata.nameReceive,
                    rs.session.metadata.phoneNumberReceive,
                    rs.session.metadata.address,
                    rs.session.metadata.otherNote,
                    'Via Visa / Master / JCB / Napas card', true,
                    'Wait for confirmation')
                if (res && res.success) {
                    await fetchCountCartProduct()
                }
                else {
                    toast.dismiss()
                    toast.error(res.message)
                }
            }
        } else if ((nameReceive !== '' || user?.name !== '') &&
            (phoneNumberReceive !== '' || user?.phoneNumber !== '') &&
            (addressHome !== '' || addressStore !== '')) {
            const res = await createNewOrder(nameReceive || user?.name,
                phoneNumberReceive || user?.phoneNumber,
                addressHome || addressStore,
                otherNote,
                addressStore !== '' ? 'Pay at the store' : 'Pay on delivery', false,
                'Wait for confirmation')
            if (res && res.success) {
                setNameReceive(``)
                setPhoneNumberReceive(``)
                setAddressHome(``)
                setAddressStore(``)
                setOtherNote(``)
                await fetchCountCartProduct()
            }
            else {
                toast.dismiss()
                toast.error(res.message)
            }
        }
    }, [location,
        fetchCountCartProduct,
        nameReceive,
        phoneNumberReceive,
        addressHome,
        addressStore,
        otherNote,
        setNameReceive,
        setPhoneNumberReceive,
        setAddressHome,
        setAddressStore,
        setOtherNote,
        user])

    useEffect(() => {
        fetchGetResultPayment()
    }, [fetchGetResultPayment])
    useEffect(() => {
        if (timeout > 0) {
            const interval = setInterval(() => {
                setTimeout(prev => prev - 1)
            }, 1000)
            return () => clearInterval(interval);
        } else {
            navigate('/')
        }
    }, [timeout, navigate])

    return (
        <div className='fixed top-0  bottom-[7%] left-0 right-0 bg-[rgba(0,0,0,0.1)] flex justify-center items-center'>
            <div className='lg:w-[30%] md:w-[50%] w-[70%] h-[40%] bg-white flex flex-col justify-center items-center rounded-lg relative'>
                <div className='flex flex-col justify-center items-center gap-4'>
                    <TiTick className='text-white border animate-bounce rounded-full w-fit h-fit mx-auto bg-green-600' size={'5em'} />
                    <p className='text-3xl font-bold text-green-600'>Payment success</p>
                </div>
                <p className='font-bold text-slate-500 mt-2 text-lg'>Thank you for your payment !️ 🎉️🎉️🎉</p>
                <Link to={'/'} className='mt-1 absolute bottom-0'>Return to index after <span className='text-red-600 font-medium'>{timeout}</span> seconds</Link>
            </div>
        </div>
    )
}

export default PaymentSuccess