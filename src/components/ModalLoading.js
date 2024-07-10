import React from 'react'
import { ImSpinner } from "react-icons/im";
const ModalLoading = () => {
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.1)] text-white flex justify-center items-center'><ImSpinner size={'5em'} className='animate-spin' /></div>
    )
}

export default ModalLoading