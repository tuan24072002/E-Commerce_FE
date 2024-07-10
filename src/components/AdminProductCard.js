import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import { GoTrash } from "react-icons/go";
import ModalAdminProduct from './ModalAdminProduct';
import ModalConfirm from './ModalConfirm'
const AdminProductCard = (props) => {
    const { data, fetchAllProduct } = props
    const [modalProduct, setModalProduct] = useState(false)
    const [stateModalProduct, setStateModalProduct] = useState('')
    const [infoProduct, setInfoProduct] = useState([])
    const [modalConfirm, setModalConfirm] = useState(false)
    const [textConfirm, setTextConfirm] = useState('')
    const [stateModalConfirm, setStateModalConfirm] = useState('')
    const handleClickRemove = (product) => {
        setInfoProduct(product)
        setTextConfirm(`Are you sure delete this product ?`)
        setModalConfirm(true)
        setStateModalConfirm(`delete-product`)
    }
    return (
        <div className='bg-white p-4 rounded cursor-pointer'>
            <div className='w-40'>
                <div className='w-32 h-32 mx-auto'>
                    <img src={data?.productImage[0]?.url} alt='' className='w-full h-full object-fill' />
                </div>
                <h1 className='text-ellipsis line-clamp-1'>{data.productName}</h1>
                <div className='flex gap-10'>
                    <p className='font-semibold text-red-600'>{`${data.sellingPrice}$`}</p>
                </div>
                <div className=' flex justify-end gap-4'>
                    <div onClick={() => { setModalProduct(true); setStateModalProduct('UPDATE'); }} className='w-fit p-2 bg-green-500 hover:bg-green-600 rounded-full text-white cursor-pointer'>
                        <MdEdit />
                    </div>
                    <div onClick={() => handleClickRemove(data)} className='w-fit p-2 bg-red-500 hover:bg-red-600 rounded-full text-white cursor-pointer'>
                        <GoTrash />
                    </div>
                </div>
            </div>
            {
                modalProduct && <ModalAdminProduct product={data} setModalProduct={setModalProduct} stateModalProduct={stateModalProduct} fetchAllProduct={fetchAllProduct} />
            }
            {modalConfirm && <ModalConfirm infoProduct={infoProduct} setModalConfirm={setModalConfirm} textConfirm={textConfirm} fetchAllProduct={fetchAllProduct} stateModalConfirm={stateModalConfirm} />}
        </div>
    )
}

export default AdminProductCard