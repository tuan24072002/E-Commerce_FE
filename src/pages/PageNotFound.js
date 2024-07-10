import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";

const PageNotFound = () => {
    return (
        <div className='container mx-auto mt-10 grid'>
            <div className='p-4 h-16 w-full bg-red-600 rounded-lg text-white font-bold text-xl'>
                404 - Page Not Found
            </div>
            <Link to={'/'} className='p-4 text-slate-600 text-lg font-semibold hover:underline w-fit flex justify-center items-center gap-2'><IoMdArrowBack /><span>Go back to home page</span></Link>
        </div>
    )
}

export default PageNotFound