import React, { useEffect, useState } from 'react'
import ModalAdminProduct from '../../components/ModalAdminProduct'
import { getAllPro } from '../../services/apiServices'
import { toast } from 'react-toastify'
import AdminProductCard from '../../components/AdminProductCard'

const AllProduct = () => {
    const [modalProduct, setModalProduct] = useState(false)
    const [allProduct, setAllProduct] = useState([])
    const [stateModalProduct, setStateModalProduct] = useState('')
    const fetchAllProduct = async () => {
        const res = await getAllPro()
        if (res && res.success) {
            setAllProduct(res.data)
        } else {
            toast.dismiss()
            toast.error(res.message)
        }
    }
    useEffect(() => {
        fetchAllProduct()
    }, [])
    return (
        <div className='overflow-hidden'>
            <div className='p-4 my-2 mx-4 bg-white min-h-20 flex justify-between items-center'>
                <h2 className='font-bold'>All Products</h2>
                <button className='py-2 px-4 rounded-full border border-red-600 text-red-600 hover:bg-red-600 hover:text-white' onClick={() => { setModalProduct(true); setStateModalProduct(`POST`); }}>Upload Product</button>
            </div>

            <div className='flex items-center flex-wrap gap-5 p-4 max-h-[calc(100vh-230px)] lg:justify-normal md:justify-center overflow-y-auto'>
                {
                    allProduct && allProduct.length > 0 && allProduct.map((pro, index) => {
                        return (
                            <AdminProductCard data={pro} key={index} fetchAllProduct={fetchAllProduct} />
                        )
                    })
                }
            </div>

            {modalProduct && <ModalAdminProduct setModalProduct={setModalProduct} stateModalProduct={stateModalProduct} fetchAllProduct={fetchAllProduct} />}
        </div>
    )
}

export default AllProduct