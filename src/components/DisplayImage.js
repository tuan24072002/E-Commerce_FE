import React from 'react'
import { SlClose } from "react-icons/sl";
const DisplayImage = (props) => {
    const { imgUrl, setDisplayImg } = props
    return (
        <div className='relative flex justify-center items-center h-full w-full bg-slate-600  max-w-[40%] max-h-[80%] top-0 left-0 right-0 bottom-0'>
            <img src={imgUrl} className=' w-full h-full object-contain' alt='' />
            <div className='absolute top-0 right-0 bg-white rounded-full cursor-pointer' onClick={() => setDisplayImg(false)}><SlClose size={'2em'} /></div>
        </div>
    )
}

export default DisplayImage