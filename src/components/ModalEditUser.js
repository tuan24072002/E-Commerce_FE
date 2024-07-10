import React, { useContext, useState } from 'react'
import { SlClose } from "react-icons/sl";
import { updateUser } from '../services/apiServices';
import { toast } from 'react-toastify';
import { Context } from '../context/context';
import ModalLoading from './ModalLoading';
const ChangeUserRole = (props) => {
    const { fetchUserDetail, isLoading, setIsLoading } = useContext(Context)
    const { infoUser, setModalRole, fetchDataAllUser } = props
    const role = [
        { value: "ADMIN", display: "ADMIN" },
        { value: "USER", display: "USER" },
    ]
    const block = [
        { value: true, display: "TRUE" },
        { value: false, display: "FALSE" },
    ]
    const [userRole, setUserRole] = useState(infoUser.role)
    const [userBlock, setUserBlock] = useState(infoUser.block)
    const handleUpdateUser = async () => {
        setIsLoading(true)
        const res = await updateUser(infoUser._id, infoUser.name, infoUser.email, infoUser.password, userRole, infoUser.profilePic, userBlock)
        if (res && res.success) {
            toast.dismiss()
            fetchDataAllUser()
            fetchUserDetail()
            toast.success(res.message)
            setModalRole(false)
            setIsLoading(false)
        } else {
            toast.dismiss()
            toast.error(res.message)
            setIsLoading(false)
        }
    }
    if (isLoading) {
        return <ModalLoading />
    }
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-[rgba(0,0,0,0.8)]'>
            <div className='relative mx-auto bg-white shadow-md p-4 w-full max-w-sm flex flex-col gap-3'>
                <h1 className='text-lg font-semibold text-center border bg-slate-600 text-white p-2'>Edit User</h1>
                <p>Name: {infoUser.name}</p>
                <p>Email: {infoUser.email}</p>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <p>Role</p>
                        <select className='border px-4 py-1' value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                            {
                                role.map((value, index) => {
                                    return (
                                        <option value={value.value} key={index}>{value.display}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='flex items-center gap-4'>
                        <p>Block</p>
                        <select className='border px-4 py-1' value={userBlock} onChange={(e) => setUserBlock(e.target.value)}>
                            {
                                block.map((value, index) => {
                                    return (
                                        <option value={value.value} key={index}>{value.display}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <button className='border w-fit mx-auto block px-4 py-1 rounded-full bg-red-600 text-white hover:bg-red-500' onClick={() => handleUpdateUser()}>Save</button>
                <div className='absolute -right-4 -top-4 bg-white rounded-full cursor-pointer' onClick={() => setModalRole(false)}><SlClose size='2em' /></div>
            </div>
        </div>
    )
}

export default ChangeUserRole