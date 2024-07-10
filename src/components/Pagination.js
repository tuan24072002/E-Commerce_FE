import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/context'

const Pagination = (props) => {
    const { totalPage, currentPage } = props
    const { setPageProductByCat, setPageSearchProduct } = useContext(Context)
    const arrPage = new Array(totalPage).fill(null)
    const [actived, setActived] = useState(currentPage || 1)
    const handleChoosePage = (page) => {
        setActived(page)
    }
    const handleChangePage = (state) => {
        if (state === 'prev' && actived - 1 > 0) {
            setActived(prev => prev - 1)
        } else if (state === 'next' && actived + 1 <= totalPage) {
            setActived(prev => prev + 1)
        }
    }
    useEffect(() => {
        setPageProductByCat(actived)
        setPageSearchProduct(actived)
    }, [setPageProductByCat, setPageSearchProduct, actived])
    return (
        arrPage.length > 0 &&
        <div className="w-full h-fit mt-2 flex flex-wrap justify-center gap-2">
            <button className={`px-3 py-2 w-16 text-center bg-blue-200 rounded`} onClick={() => handleChangePage('prev')}>Prev</button>
            {
                arrPage.map((value, index) => {
                    return (
                        <button className={`px-3 py-2 w-10 text-center text-xs rounded ${actived === index + 1 ? 'bg-slate-400 text-white text-base font-bold' : 'bg-slate-200'}`} key={index} onClick={() => handleChoosePage(index + 1)}>{index + 1}</button>
                    )
                })
            }
            <button className="px-3 py-2 w-16 text-center bg-blue-200 rounded" onClick={() => handleChangePage('next')}>Next</button>
        </div>

    )
}

export default Pagination