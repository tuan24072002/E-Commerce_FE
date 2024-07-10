import React, { useCallback, useContext, useEffect, useState } from 'react'
import QRCode from 'qrcode'
import Cookie from 'js-cookie'
import { useSelector } from 'react-redux'
import { Context } from '../context/context'
import avatar from '../assets/avatar.png'
const MyQrCode = () => {
    const [urlQr, setUrlQr] = useState(``)
    const user = useSelector(state => state?.user?.user)
    const { token } = useContext(Context)
    const createMyQrCode = useCallback(async () => {
        try {
            const url = await QRCode.toDataURL(Cookie.get('token') || token);
            setUrlQr(url);
        } catch (error) {
            console.error('Lỗi khi tạo QR code:', error);
        }
    }, [token])

    useEffect(() => {
        createMyQrCode();
    }, [createMyQrCode]);
    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <div className='w-72 h-72 border-2 border-black rounded-lg relative'>
                {
                    urlQr !== '' && <img src={urlQr} alt='' className='w-full h-full object-cover mix-blend-multiply' />
                }
                <div className='absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] overflow-hidden'>
                    <img src={user?.profilePic || avatar} alt='' className='h-16 w-16 rounded-full object-cover' />
                </div>
            </div>
            <div className='text-wrap line-clamp-1 border w-full mt-4 p-2 rounded-lg bg-green-400'>
                <p className='text-center font-semibold text-white'>Use this qr code to login on another device</p>
            </div>
        </div>
    )
}

export default MyQrCode