import React, { useContext, useState } from 'react'
import { changeInformation } from '../services/apiServices'
import { toast } from 'react-toastify'
import { Context } from '../context/context'
const ChangeInformation = (props) => {
    const { user, setIsModalSetting } = props
    const { fetchUserDetail } = useContext(Context)
    const [name, setName] = useState(user?.name)
    const [email, setEmail] = useState(user?.email)
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber)
    const [address, setAddress] = useState(user?.address)
    const handleSaveChangeInformation = async () => {
        const res = await changeInformation(name, email, phoneNumber, address, user?.profilePic, user?.password, '')
        if (res && res.success) {
            await fetchUserDetail()
            toast.dismiss()
            toast.success(res.message)
            setIsModalSetting(false)
        } else {
            toast.error(res.message)
        }
    }
    return (
        <>
            <div className='my-3 grid'>
                <div className='flex flex-col'>
                    <label className='font-medium'>Name (*)</label>
                    <input type='text' name='name' value={name || ''} onChange={(e) => setName(e.target.value)} placeholder='...' className='p-2 border' />
                </div>
            </div>
            <div className='my-3 grid grid-cols-2 gap-2'>
                <div className='flex flex-col'>
                    <label className='font-medium'>Email (*)</label>
                    <input type='text' name='name' value={email || ''} onChange={(e) => setEmail(e.target.value)} placeholder='...' className='p-2 border' />
                </div>
                <div className='flex flex-col'>
                    <label className='font-medium'>Phone number (*)</label>
                    <input type='number' name='name' value={phoneNumber || ''} onChange={(e) => setPhoneNumber(e.target.value)} placeholder='...' className='p-2 border' />
                </div>
            </div>
            <div className='my-3 grid'>
                <div className='flex flex-col'>
                    <label className='font-medium'>Address (*)</label>
                    <input type='text' name='name' value={address || ''} onChange={(e) => setAddress(e.target.value)} placeholder='...' className='p-2 border' />
                </div>
            </div>
            <button className='border w-fit mx-auto block px-4 py-1 rounded-full bg-red-600 text-white hover:bg-red-500' onClick={handleSaveChangeInformation}>Save</button>
        </>
    )
}

export default ChangeInformation