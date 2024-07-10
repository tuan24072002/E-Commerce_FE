import React from 'react'
import { useNavigate } from 'react-router-dom'
import { GrSearch } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { RiCloseCircleLine } from "react-icons/ri";
const SearchMobile = (props) => {
    const { handleClickSearch, searchInput, setSearchInput, setIsSearchMobile } = props
    const navigate = useNavigate()
    return (
        <div className='z-50 fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-[rgba(0,0,0,0.8)]'>
            <div className='w-full h-[20%] bg-[rgba(255,255,255,0.4)] relative flex justify-center items-center'>
                <div className='flex items-center w-[90%] justify-between max-w-sm border pl-2 h-14 rounded-full focus-within:shadow focus-within:border-red-600 bg-white'>
                    <div className='w-full relative'>
                        <input type='text' placeholder='Search...' className='border-none w-full outline-none' value={searchInput || ''} onChange={(e) => {
                            setSearchInput(e.target.value)
                            navigate(`/search?rs=${e.target.value}`)
                        }} />
                        {
                            searchInput !== '' && <IoMdClose className='absolute right-2 top-[50%] transform translate-y-[-50%] cursor-pointer hover:text-red-600' onClick={() => setSearchInput('')} />
                        }
                    </div>
                    <div className='text-lg min-w-[50px] flex items-center justify-center bg-red-600 hover:bg-red-500 h-full rounded-r-full text-white cursor-pointer' onClick={handleClickSearch}><GrSearch /></div>
                </div>
                <div className='absolute top-2 right-2 bg-white rounded-full' onClick={() => setIsSearchMobile(false)}><RiCloseCircleLine size={'1.5em'} /></div>
            </div>
        </div>
    )
}

export default SearchMobile