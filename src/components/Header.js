import React, { useCallback, useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../services/apiServices';
import { toast } from 'react-toastify';
import { setUserDetail } from '../store/userSlice';
import avatar from '../assets/avatar.png'
import { Context } from '../context/context';
import { IoMdClose } from "react-icons/io";
import SearchMobile from './SearchMobile';
import ModalSettings from './ModalSettings';
const Header = () => {
    const navigate = useNavigate();
    const params = useLocation()
    const user = useSelector(state => state?.user?.user)
    const dispatch = useDispatch()
    const [showDropDown, setShowDropDown] = useState(false)
    const [isSearchMobile, setIsSearchMobile] = useState(false)
    const [isModalSetting, setIsModalSetting] = useState(false)
    const [searchInput, setSearchInput] = useState(params?.search?.split('?rs=')[1])
    const { countCart } = useContext(Context)
    const handleLogout = async () => {
        const res = await logout()
        if (res && res.success) {
            toast.dismiss()
            setShowDropDown(false)
            setIsModalSetting(false)
            dispatch(setUserDetail(null))
            toast.success(res.message)
        } else {
            toast.dismiss()
            toast.error(res.message)
        }
    }
    const handleClickSearch = useCallback(() => {
        if (searchInput !== '') {
            navigate(`/search?rs=${searchInput?.trim()}`)
        } else {
            navigate(`/search`)
        }
    }, [searchInput, navigate])

    return (
        <>
            <header className='h-16 shadow-md bg-white w-full fixed z-40'>
                <div className='container mx-auto flex items-center justify-between h-full px-4'>
                    <div className='cursor-pointer' onClick={() => navigate('/')}>
                        <Logo w={90} h={50} />
                    </div>

                    <div className='hidden sm:flex items-center w-[50%] md:w-full justify-between max-w-sm border pl-4 h-8 rounded-full focus-within:shadow focus-within:border-red-600'>
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
                    <div className='text-lg flex sm:hidden items-center justify-center bg-red-600 hover:bg-red-500 h-8 w-8 rounded-full text-white cursor-pointer' onClick={() => setIsSearchMobile(prev => !prev)}><GrSearch /></div>

                    <div className='flex items-center gap-7'>
                        <div className=' relative flex justify-center'>
                            <div className='text-2xl cursor-pointer flex justify-center' onClick={() => {
                                if (user) {
                                    setShowDropDown(prev => !prev)
                                } else {
                                    navigate('/login')
                                }
                            }}>
                                {
                                    user ? <img src={user?.profilePic || avatar} alt={user?.name} className='w-8 h-8 rounded-full object-cover' /> : <FaUserCircle />
                                }
                            </div>
                            {
                                showDropDown && user &&
                                <div className='absolute bg-slate-50 right-0 bottom-0 top-11 h-fit w-40 p-2 shadow-lg rounded border border-slate-600'>
                                    <h2 className='text-center py-2 font-semibold bg-slate-300 rounded-lg'>Hello ! <span className='text-red-600'>{user?.name.trim().split(' ')[user?.name.trim().split(' ').length - 1]}</span></h2>
                                    <nav className='flex flex-col'>
                                        {
                                            user?.role === 'ADMIN' && <button onClick={() => { navigate(`/admin`); setShowDropDown(prev => !prev); }} className='whitespace-nowrap hover:bg-slate-200 rounded px-4 py-2'>Admin Panel</button>
                                        }
                                        <button onClick={() => { setShowDropDown(prev => !prev); navigate('/history'); }} className='whitespace-nowrap hover:bg-slate-200 rounded px-4 py-2'>History</button>
                                        <button onClick={() => { setShowDropDown(prev => !prev); setIsModalSetting(true) }} className='whitespace-nowrap hover:bg-slate-200 rounded px-4 py-2'>Settings</button>
                                    </nav>
                                </div>
                            }
                        </div>
                        {
                            user?._id &&
                            <div className='text-2xl cursor-pointer relative' onClick={() => navigate('/cart')}>
                                <span><FaShoppingCart /></span>
                                <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                                    <p className='text-xs'>{countCart}</p>
                                </div>

                            </div>
                        }
                        <div>
                            {
                                user ? <button onClick={() => handleLogout()} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-500'>Logout</button> : <button onClick={() => navigate('/login')} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-500'>Login</button>
                            }
                        </div>
                    </div>
                </div>
            </header >
            {
                isSearchMobile && <SearchMobile searchInput={searchInput} setSearchInput={setSearchInput} handleClickSearch={handleClickSearch} setIsSearchMobile={setIsSearchMobile} />
            }
            {
                isModalSetting && <ModalSettings setIsModalSetting={setIsModalSetting} user={user} />
            }
        </>
    )
}

export default Header