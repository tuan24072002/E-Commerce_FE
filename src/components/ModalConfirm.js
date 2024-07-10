import React, { useContext } from 'react'
import { SlClose } from "react-icons/sl";
import { deleteUser, deleteProduct } from '../services/apiServices';
import { toast } from 'react-toastify';
import { Context } from '../context/context';
import ModalLoading from './ModalLoading';
const ChangeUserRole = (props) => {
    const { infoUser, infoProduct, setModalConfirm, textConfirm, fetchDataAllUser, fetchAllProduct, stateModalConfirm } = props
    const { isLoading, setIsLoading } = useContext(Context)
    const handleRemove = async () => {
        setIsLoading(true)
        if (stateModalConfirm === 'delete-user') {
            const res = await deleteUser(infoUser._id)
            if (res && res.success) {
                toast.dismiss()
                toast.success(res.message)
                fetchDataAllUser()
                setModalConfirm(false)
                setIsLoading(false)
            } else {
                toast.dismiss()
                toast.error(res.message)
                setIsLoading(false)
            }
        } else if (stateModalConfirm === 'delete-product') {
            const res = await deleteProduct(infoProduct._id)
            if (res && res.success) {
                toast.dismiss()
                toast.success(res.message)
                fetchAllProduct()
                setModalConfirm(false)
                setIsLoading(false)
            } else {
                toast.dismiss()
                toast.error(res.message)
                setIsLoading(false)
            }
        }
    }
    if (isLoading) {
        return <ModalLoading />
    }
    return (
        stateModalConfirm === 'delete-user' ?
            <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-[rgba(0,0,0,0.8)] cursor-default'>
                <div className='relative mx-auto bg-white shadow-md p-4 w-full max-w-sm flex flex-col gap-3'>
                    <h1 className='text-lg font-semibold text-center border bg-slate-600 text-white p-2'>Confirm Delete User</h1>
                    <p>{textConfirm}</p>
                    <p>Name: {infoUser.name}</p>
                    <p>Email: {infoUser.email}</p>
                    <p>Role: {infoUser.role}</p>
                    <div className='flex justify-center w-fit ml-auto gap-4'>
                        <button className='border w-fit mx-auto block px-4 py-1 rounded-full bg-yellow-600 text-white hover:bg-yellow-500' onClick={() => handleRemove()}>Yes</button>
                        <button className='border w-fit mx-auto block px-4 py-1 rounded-full bg-gray-600 text-white hover:bg-gray-500' onClick={() => setModalConfirm(false)}>No</button>
                    </div>
                    <div className='absolute -right-4 -top-4 bg-white rounded-full cursor-pointer' onClick={() => setModalConfirm(false)}><SlClose size='2em' /></div>
                </div>
            </div> :
            <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-[rgba(0,0,0,0.8)] cursor-default'>
                <div className='relative mx-auto bg-white shadow-md p-4 w-full max-w-sm flex flex-col gap-3'>
                    <h1 className='text-lg font-semibold text-center border bg-slate-600 text-white p-2'>Confirm Delete Product</h1>
                    <p>{textConfirm}</p>
                    <p>Product name: {infoProduct.productName}</p>
                    <p>Price: {infoProduct.price}</p>
                    <p>Selling: {infoProduct.sellingPrice}</p>
                    <div className='flex gap-4 w-16 h-16'>
                        {
                            infoProduct.productImage.map((img, index) => {
                                return (
                                    <img src={img.url} alt='' key={index} className='border rounded object-contain' />
                                )
                            })
                        }
                    </div>
                    <div className='flex justify-center w-fit ml-auto gap-4'>
                        <button className='border w-fit mx-auto block px-4 py-1 rounded-full bg-yellow-600 text-white hover:bg-yellow-500' onClick={() => handleRemove()}>Yes</button>
                        <button className='border w-fit mx-auto block px-4 py-1 rounded-full bg-gray-600 text-white hover:bg-gray-500' onClick={() => setModalConfirm(false)}>No</button>
                    </div>
                    <div className='absolute -right-4 -top-4 bg-white rounded-full cursor-pointer' onClick={() => setModalConfirm(false)}><SlClose size='2em' /></div>
                </div>
            </div>
    )
}

export default ChangeUserRole