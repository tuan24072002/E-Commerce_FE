import React, { useState } from 'react'
import { SlClose } from "react-icons/sl";
import { FaInfo, FaQrcode } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import ChangeInformation from './ChangeInformation';
import ChangeAvatar from './ChangeAvatar';
import ChangePassword from './ChangePassword';
import MyQrCode from './MyQrCode';
const ModalSettings = (props) => {
    const { setIsModalSetting, user } = props
    const [stateSetting, setStateSetting] = useState('Information')
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-[rgba(0,0,0,0.8)]'>
            <div className='relative mx-auto bg-white shadow-md p-4 w-full max-w-md h-[460px] flex flex-col gap-3'>
                <div className='flex items-center justify-start gap-4 p-2 bg-slate-100 rounded-lg'>
                    <h1 className={`border-b-2 px-4 py-2 cursor-pointer hover:text-red-600 hover:border-red-600 ${stateSetting === 'Information' && 'text-red-600 border-red-600'}`} onClick={() => setStateSetting(`Information`)}><FaInfo size={'1.5em'} /></h1>
                    <h1 className={`border-b-2 px-4 py-2 cursor-pointer hover:text-red-600 hover:border-red-600 ${stateSetting === 'Avatar' && 'text-red-600 border-red-600'}`} onClick={() => setStateSetting(`Avatar`)}><RxAvatar size={'1.5em'} /></h1>
                    <h1 className={`border-b-2 px-4 py-2 cursor-pointer hover:text-red-600 hover:border-red-600 ${stateSetting === 'Password' && 'text-red-600 border-red-600'}`} onClick={() => setStateSetting(`Password`)}><MdOutlinePassword size={'1.5em'} /></h1>
                    <h1 className={`border-b-2 px-4 py-2 cursor-pointer hover:text-red-600 hover:border-red-600 ${stateSetting === 'QrCode' && 'text-red-600 border-red-600'}`} onClick={() => setStateSetting(`QrCode`)}><FaQrcode size={'1.5em'} /></h1>
                </div>
                {
                    stateSetting === 'Information' ?
                        <ChangeInformation user={user} setIsModalSetting={setIsModalSetting} />
                        : stateSetting === 'Avatar' ?
                            <ChangeAvatar user={user} setIsModalSetting={setIsModalSetting} />
                            : stateSetting === 'Password' ?
                                <ChangePassword user={user} setIsModalSetting={setIsModalSetting} />
                                : stateSetting === 'QrCode' ?
                                    <MyQrCode user={user} setIsModalSetting={setIsModalSetting} /> : <></>
                }
                <div className='absolute md:-right-4 md:-top-4 right-0 top-0 bg-white rounded-full cursor-pointer' onClick={() => setIsModalSetting(false)}><SlClose size='2em' /></div>
            </div>
        </div>
    )
}

export default ModalSettings