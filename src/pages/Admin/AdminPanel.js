import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaUserCircle } from "react-icons/fa";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { IoMdArrowDropright } from "react-icons/io";
import { getAllOrder } from '../../services/apiServices';
import { toast } from 'react-toastify';
import ModalOrderUnconfirmed from '../../components/ModalOrderUnconfirmed';
const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const [state, setState] = useState('Dashboard')
    const [dataOrder, setDataOrder] = useState([])
    const [isOrderIncomplete, setIsOrderIncomplete] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        if (!user || user?.role !== 'ADMIN') {
            navigate(`/`)
        }
    }, [navigate, user])
    const fetchAllOrder = useCallback(async () => {
        const res = await getAllOrder()
        if (res && res.success) {
            setDataOrder(res.data)
        } else {
            toast.error(res.message)
        }
    }, [])
    useEffect(() => {
        fetchAllOrder()
    }, [fetchAllOrder])
    const totalOrderIncomplete = dataOrder.filter(curr => curr.state === 'Wait for confirmation').length
    useEffect(() => {
        if (dataOrder.length > 0 && totalOrderIncomplete > 0) {
            setIsOrderIncomplete(true)
        }
    }, [dataOrder, totalOrderIncomplete])


    return (
        <>
            <div className='min-h-[calc(100vh-130px)] lg:flex hidden'>
                <aside className='bg-white max-h-[calc(100vh-130px)] w-full max-w-60 customShadow'>
                    <div className='h-40 bg-red-50 flex flex-col justify-center items-center'>
                        <div className='text-5xl cursor-pointer flex justify-center'>
                            {
                                user?.profilePic ? <img src={user?.profilePic} alt={user?.name} className='w-20 h-20 rounded-full object-cover' /> : <FaUserCircle />
                            }
                        </div>
                        <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                        <p className='text-sm'>{user?.role}</p>
                    </div>

                    <div>
                        <nav className='grid'>
                            <Link to={``} className={`p-4 hover:bg-slate-100 border-t border-b border-slate-200 flex items-center justify-between ${state === 'Dashboard' && 'text-red-600 font-medium'}`} onClick={() => setState('Dashboard')}><span>Dashboard</span><IoMdArrowDropright /></Link>
                            <Link to={`all-users`} className={`p-4 hover:bg-slate-100 border-b border-slate-200 flex items-center justify-between ${state === 'All Users' && 'text-red-600 font-medium'}`} onClick={() => setState('All Users')}><span>Users</span><IoMdArrowDropright /></Link>
                            <Link to={`all-products`} className={`p-4 hover:bg-slate-100 border-b border-slate-200 flex items-center justify-between ${state === 'All Products' && 'text-red-600 font-medium'}`} onClick={() => setState('All Products')}><span>Products</span><IoMdArrowDropright /></Link>
                            <Link to={`all-orders`} className={`p-4 hover:bg-slate-100 border-b border-slate-200 flex items-center justify-between ${state === 'All Orders' && 'text-red-600 font-medium'}`} onClick={() => setState('All Orders')}><span>Orders</span><IoMdArrowDropright /></Link>
                        </nav>
                    </div>
                </aside >
                <main className='w-full min-h-full'>
                    <Outlet />
                </main>
            </div >
            <div className='min-h-[calc(100vh-130px)] lg:hidden flex flex-col gap-4 p-4'>
                <div className='bg-red-600 p-4 text-white font-semibold rounded-lg'>
                    <h2>Please use a desktop device to use administrator features !</h2>
                </div>
                <Link to={'/'} className='border border-slate-600 w-fit px-4 py-2'>Go back to home page</Link>
            </div>
            {
                isOrderIncomplete && <ModalOrderUnconfirmed dataOrder={dataOrder} totalOrderIncomplete={totalOrderIncomplete} setIsOrderIncomplete={setIsOrderIncomplete} fetchAllOrder={fetchAllOrder} />
            }
        </>
    )
}

export default AdminPanel