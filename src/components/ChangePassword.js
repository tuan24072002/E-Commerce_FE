import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { changeInformation } from '../services/apiServices'
import { Context } from '../context/context'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const ChangePassword = (props) => {
    const { user, setIsModalSetting } = props
    const { fetchUserDetail } = useContext(Context)
    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirmNewPass, setConfirmNewPass] = useState('')
    const [showOldPass, setShowOldPass] = useState(false)
    const [showNewPass, setShowNewPass] = useState(false)
    const [showConfirmNewPass, setShowConfirmNewPass] = useState(false)
    const [valid, setValid] = useState(false)
    const handleSaveChangePassword = async () => {
        setValid(true)
        if (oldPass !== '' && newPass !== '' && confirmNewPass !== '') {
            if (newPass !== confirmNewPass) {
                toast.warning(`Confirm password does not match !`);
            } else {
                const res = await changeInformation(user?.name, user?.email, user?.phoneNumber, user?.address, user?.profilePic, oldPass, newPass)
                if (res && res.success) {
                    await fetchUserDetail()
                    setOldPass('')
                    setNewPass('')
                    setConfirmNewPass('')
                    toast.dismiss()
                    toast.success(res.message)
                    setIsModalSetting(false)
                } else {
                    toast.error(res.message)
                }
            }
        }
    }
    return (
        <>
            <div className=' grid'>
                <div className='flex flex-col gap-2'>
                    <label className='font-medium'>Old Password (*)</label>
                    <div className='relative'>
                        <input type={showOldPass ? 'text' : 'password'} name='name' onChange={(e) => setOldPass(e.target.value)} placeholder='...' className={`p-2 rounded-lg border w-full ${valid && oldPass === '' && 'border-red-600'}`} />
                        <div className='absolute right-[10px] top-[50%] translate-y-[-50%] cursor-pointer text-xl' onClick={() => setShowOldPass(prev => !prev)}>
                            {
                                showOldPass ? <FaEyeSlash /> : <FaEye />
                            }
                        </div>
                    </div>
                    <div className='h-4'>
                        {
                            valid && oldPass === '' && <p className='text-red-600 font-semibold text-xs'>Old Password is empty !</p>
                        }
                    </div>
                </div>
            </div>
            <div className=' grid'>
                <div className='flex flex-col gap-2'>
                    <label className='font-medium'>New Password (*)</label>
                    <div className='relative'>
                        <input type={showNewPass ? 'text' : 'password'} name='name' onChange={(e) => setNewPass(e.target.value)} placeholder='...' className={`p-2 rounded-lg border w-full ${valid && newPass === '' && 'border-red-600'}`} />
                        <div className='absolute right-[10px] top-[50%] translate-y-[-50%] cursor-pointer text-xl' onClick={() => setShowNewPass(prev => !prev)}>
                            {
                                showNewPass ? <FaEyeSlash /> : <FaEye />
                            }
                        </div>
                    </div>
                    <div className='h-4'>
                        {
                            valid && newPass === '' && <p className='text-red-600 font-semibold text-xs'>New Password is empty !</p>
                        }
                    </div>
                </div>
            </div>
            <div className=' grid'>
                <div className='flex flex-col gap-2'>
                    <label className='font-medium'>Confirm New Password (*)</label>
                    <div className='relative'>
                        <input type={showConfirmNewPass ? 'text' : 'password'} name='name' onChange={(e) => setConfirmNewPass(e.target.value)} placeholder='...' className={`p-2 rounded-lg border w-full ${valid && confirmNewPass === '' && 'border-red-600'}`} />
                        <div className='absolute right-[10px] top-[50%] translate-y-[-50%] cursor-pointer text-xl' onClick={() => setShowConfirmNewPass(prev => !prev)}>
                            {
                                showConfirmNewPass ? <FaEyeSlash /> : <FaEye />
                            }
                        </div>
                    </div>
                    <div className='h-4'>
                        {
                            valid && confirmNewPass === '' && <p className='text-red-600 font-semibold text-xs'>Confirm New Password is empty !</p>
                        }
                    </div>
                </div>
            </div>
            <button className='border w-fit mx-auto block px-4 py-1 rounded-full bg-red-600 text-white hover:bg-red-500' onClick={handleSaveChangePassword}>Save</button>
        </>
    )
}

export default ChangePassword