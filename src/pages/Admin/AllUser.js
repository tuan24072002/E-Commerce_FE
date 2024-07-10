import React, { useEffect, useState } from 'react'
import { fetchAllUser } from '../../services/apiServices'
import { toast } from 'react-toastify'
import avatar from '../../assets/avatar.png'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import ChangeUserRole from '../../components/ModalEditUser'
import ModalConfirm from '../../components/ModalConfirm'
import { useSelector } from 'react-redux'
const AllUser = () => {
    const user = useSelector(state => state?.user?.user)
    const [allUser, setAllUser] = useState([])
    const [modalRole, setModalRole] = useState(false)
    const [infoUser, setInfoUser] = useState([])
    const [modalConfirm, setModalConfirm] = useState(false)
    const [textConfirm, setTextConfirm] = useState('')
    const [stateModalConfirm, setStateModalConfirm] = useState('')
    const fetchDataAllUser = async () => {
        const res = await fetchAllUser()
        if (res && res.success) {
            setAllUser(res.data)
        } else {
            toast.dismiss()
            toast.error(res.message)
        }
    }
    useEffect(() => {
        fetchDataAllUser()
    }, [])
    const handleChangeRole = (user) => {
        setModalRole(true)
        setInfoUser(user)
    }

    const handleClickRemove = (user) => {
        setInfoUser(user)
        setTextConfirm(`Are you sure delete this user ?`)
        setModalConfirm(true)
        setStateModalConfirm(`delete-user`)
    }

    return (
        <div className='overflow-hidden'>
            <div className='p-4 bg-slate-200 relative max-h-[calc(100vh-130px)] overflow-y-auto'>
                <table className='w-full userTable'>
                    <thead>
                        <tr className='bg-red-300'>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Avatar</th>
                            <th>Role</th>
                            <th>Blocked</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUser && allUser.filter(i => i._id !== user?._id).length > 0 ? allUser.filter(i => i._id !== user?._id).map((item, index) => {
                                return (
                                    <tr key={index} className='pb-2 hover:bg-red-50  cursor-pointer'>
                                        <td>{index + 1}</td>
                                        <td>{item?.name}</td>
                                        <td>{item?.email}</td>
                                        <td>
                                            {
                                                item?.profilePic ? <div className='flex justify-center cursor-pointer'><a download href={item?.profilePic}><img src={item?.profilePic} alt='' className='w-5 h-5 rounded-full object-cover' /></a></div>
                                                    : <div className='flex justify-center cursor-pointer'><img src={avatar} alt='' className='w-5 h-5 rounded-full object-cover' /></div>
                                            }
                                        </td>
                                        <td>{item?.role}</td>
                                        <td className='capitalize'>{String(item.block)}</td>
                                        <td>{moment(item?.createdAt).format('L')}</td>
                                        <td className='flex justify-center items-center gap-2'>
                                            <button className='bg-green-100 p-2 rounded-full hover:bg-green-600 hover:text-white' onClick={() => handleChangeRole(item)}><MdModeEdit className='hover:scale-110' /></button>
                                            <button className='bg-red-100 p-2 rounded-full hover:bg-red-600 hover:text-white' onClick={() => handleClickRemove(item)}><FaTrash className='hover:scale-110' /></button>
                                        </td>
                                    </tr>
                                )
                            }) :
                                <tr>
                                    <td colSpan={7} className='p-5 font-semibold'><span className='text-xl text-red-600'>Don't have any data !</span></td>
                                </tr>
                        }
                    </tbody>
                </table>
                {modalRole && <ChangeUserRole setModalRole={setModalRole} infoUser={infoUser} fetchDataAllUser={fetchDataAllUser} />}
                {modalConfirm && <ModalConfirm infoUser={infoUser} setModalConfirm={setModalConfirm} textConfirm={textConfirm} fetchDataAllUser={fetchDataAllUser} stateModalConfirm={stateModalConfirm} />}
            </div>
        </div>
    )
}

export default AllUser