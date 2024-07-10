import React, { useEffect, useState } from 'react'
import { SlClose } from 'react-icons/sl';
import moment from 'moment'
import ModalOrderDetail from './ModalOrderDetail';
const ModalOrderUnconfirmed = (props) => {
    const { dataOrder, totalOrderIncomplete, setIsOrderIncomplete, fetchAllOrder } = props
    const [isOrderDetail, setIsOrderDetail] = useState(false)
    const [orderId, setOrderId] = useState('')
    useEffect(() => {
        if (totalOrderIncomplete === 0) {
            setIsOrderIncomplete(false)
        }
    }, [totalOrderIncomplete, setIsOrderIncomplete])
    return (
        <>
            <div className='fixed hidden top-0 bottom-0 left-0 right-0 w-full h-full z-10 lg:flex justify-between items-center bg-[rgba(0,0,0,0.8)]'>
                <div className='relative mx-auto bg-white shadow-md p-4 w-[40%] h-[480px] flex flex-col overflow-hidden'>
                    <h2 className='p-4 bg-slate-400 text-white font-semibold items-center rounded-lg'>You have {totalOrderIncomplete} incomplete orders that need to be processed !!!</h2>
                    <div className='grid gap-4 my-2 overflow-y-auto'>
                        {
                            dataOrder.length > 0 && dataOrder.map((value, index) => {
                                if (value?.state !== 'Canceled order' && value?.state === 'Wait for confirmation') {
                                    return (
                                        <div className='w-full h-28 grid grid-cols-2 bg-slate-200 rounded-lg p-2 relative cursor-pointer hover:bg-slate-300' onClick={() => { setIsOrderDetail(true); setOrderId(value?._id); }} key={index}>
                                            <div className='flex flex-col'>
                                                <div className='flex gap-2'>
                                                    <h2>OrderId :</h2>
                                                    <p className='font-semibold'>{value?._id}</p>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <h2>Name :</h2>
                                                    <p className='font-semibold'>{value?.name}</p>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <h2>Phone number :</h2>
                                                    <p className='font-semibold'>{value?.phoneNumber}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col'>
                                                <div className='flex gap-2'>
                                                    <h2 className='w-[30%]'>Address :</h2>
                                                    <p className='font-semibold'>{value?.address?.split(`: `)[1]}</p>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <h2>Create at :</h2>
                                                    <p className='font-semibold'>{moment(value?.createdAt).format(`L`)}</p>
                                                </div>
                                            </div>
                                            <div className='flex gap-2 absolute bottom-2 right-2'>
                                                <h2>Total :</h2>
                                                <p className='font-semibold text-red-600'>${Number(value?.total).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return <></>
                                }
                            })
                        }
                    </div>
                    <div className='absolute right-0 top-0 bg-white rounded-full cursor-pointer' onClick={() => setIsOrderIncomplete(false)}><SlClose size='2em' /></div>
                </div>
            </div>
            {
                isOrderDetail && <ModalOrderDetail setIsOrderDetail={setIsOrderDetail} orderId={orderId} fetchAllOrder={fetchAllOrder} />
            }
        </>
    )
}

export default ModalOrderUnconfirmed