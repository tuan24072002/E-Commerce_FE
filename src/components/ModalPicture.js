import React from 'react'
import { SlClose } from 'react-icons/sl'

const ModalPicture = (props) => {
    const { urlPicture, setIsModalPicture } = props
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-[rgba(0,0,0,0.8)]'>
            <div className='relative bg-slate-200 mx-auto shadow-md rounded-lg mt-20 lg:w-[40%] md:w-[60%] w-[80%] h-[550px] flex flex-col overflow-y-auto'>
                <img src={urlPicture} alt='' className='w-full h-full object-contain' />
                <div className='absolute right-0 top-0 bg-white rounded-full cursor-pointer' onClick={() => setIsModalPicture(false)}><SlClose size='2em' /></div>
            </div>
        </div>
    )
}

export default ModalPicture