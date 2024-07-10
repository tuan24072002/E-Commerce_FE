import React, { useContext, useState } from 'react'
import { imageToBase64 } from '../helpers/imageToBase64'
import { Context } from '../context/context'
import { toast } from 'react-toastify'
import { changeInformation } from '../services/apiServices'
import avatar from '../assets/avatar.png'
const ChangeAvatar = (props) => {
    const { user, setIsModalSetting } = props
    const { fetchUserDetail } = useContext(Context)
    const [urlAvatar, setUrlAvatar] = useState(user?.profilePic)
    const handleChangeAvatar = async (e) => {
        if (e?.target?.files[0]) {
            const imageBase64 = await imageToBase64(e?.target?.files[0])
            setUrlAvatar(imageBase64)
        }
    }
    const handleSaveChangeAvatar = async () => {
        const res = await changeInformation(user?.name, user?.email, user?.phoneNumber, user?.address, urlAvatar, user?.password, '')
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
        <div className='w-full h-full grid justify-center items-center'>
            <label htmlFor='avatar' className='w-72 h-72 border-2 border-black rounded-lg'>
                <img src={urlAvatar || avatar} alt='' className='rounded-full w-full h-full object-cover mix-blend-multiply cursor-pointer' />
            </label>
            <input type='file' name='file' id='avatar' hidden onChange={(e) => handleChangeAvatar(e)} />
            <button className='border w-fit mx-auto block px-4 py-1 rounded-full bg-red-600 text-white hover:bg-red-500' onClick={handleSaveChangeAvatar}>Save</button>
        </div>
    )
}

export default ChangeAvatar