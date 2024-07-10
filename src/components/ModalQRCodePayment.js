import React, { useCallback, useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { SlClose } from 'react-icons/sl'
import { createPaymentStripe } from '../services/apiServices'
import { MdOutlineQrCodeScanner } from "react-icons/md";
const ModalQRCodePayment = (props) => {
    const { setIsQrCodePayment, data, totalPrice } = props
    const [urlQr, setUrlQr] = useState(``)
    const fetchCreateQrCodePayment = useCallback(async () => {
        const res = await createPaymentStripe(data)
        QRCode.toDataURL(res.session.url).then(setUrlQr)
    }, [data])
    useEffect(() => {
        fetchCreateQrCodePayment()
    }, [fetchCreateQrCodePayment])

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-[rgba(0,0,0,0.8)]'>
            <div className='relative mx-auto bg-white shadow-md p-4 w-96 h-fit flex flex-col rounded-lg'>
                <div className='w-full h-[80%] flex justify-center'>
                    <img src={urlQr} alt='' className='h-full object-contain' />
                </div>
                <p className='bg-green-500 rounded-lg text-white p-3 font-semibold'>Please scan the QR code to pay for this order</p>
                <h2 className='flex items-center gap-2 justify-center text-lg my-3'><span>Total: <span className='font-semibold text-red-600'>${Number(totalPrice - totalPrice * 10 / 100).toFixed(2)}</span></span><MdOutlineQrCodeScanner /></h2>
                <div className='absolute right-0 top-0 bg-white rounded-full cursor-pointer' onClick={() => setIsQrCodePayment(false)}><SlClose size='2em' /></div>
            </div>
        </div>
    )
}

export default ModalQRCodePayment