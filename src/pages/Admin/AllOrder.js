import React, { useCallback, useEffect, useState } from 'react'
import { getAllOrder } from '../../services/apiServices'
import { toast } from 'react-toastify'
import moment from 'moment'
import ModalOrderDetail from '../../components/ModalOrderDetail'

const AllOrder = () => {
    const [data, setData] = useState([])
    const [isOrderDetail, setIsOrderDetail] = useState(false)
    const [orderId, setOrderId] = useState('')
    const fetchAllOrder = useCallback(async () => {
        const res = await getAllOrder()
        if (res && res.success) {
            setData(res.data)
        } else {
            toast.error(res.message)
        }
    }, [])
    useEffect(() => {
        fetchAllOrder()
    }, [fetchAllOrder])
    return (
        <div className='overflow-hidden'>
            <div className='p-4 bg-slate-200 relative max-h-[calc(100vh-130px)] overflow-y-auto'>
                <table className='w-full userTable'>
                    <thead>
                        <tr className='bg-green-300'>
                            <th>Order ID</th>
                            <th>Name</th>
                            <th>Phone number</th>
                            <th className='w-[550px]'>Address</th>
                            <th>Total</th>
                            <th>State</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.length > 0 ? data.map((item, index) => {
                                return (
                                    <tr key={index} className='pb-2 hover:bg-green-50 cursor-pointer' onClick={() => { setIsOrderDetail(true); setOrderId(item?._id); }}>
                                        <td>{item?._id}</td>
                                        <td>{item?.name}</td>
                                        <td>{item?.phoneNumber}</td>
                                        <td>{item?.address}</td>
                                        <td>${Number(item?.total).toFixed(2)}</td>
                                        <td>{item?.state}</td>
                                        <td>{moment(item?.createdAt).format('L')}</td>
                                    </tr>
                                )
                            }) :
                                <tr>
                                    <td colSpan={7} className='p-5 font-semibold'><span className='text-xl text-red-600'>Don't have any data !</span></td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
            {
                isOrderDetail && <ModalOrderDetail setIsOrderDetail={setIsOrderDetail} orderId={orderId} fetchAllOrder={fetchAllOrder} />
            }
        </div>
    )
}

export default AllOrder