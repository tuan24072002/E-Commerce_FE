import React, { useContext, useEffect, useState } from 'react'
import login from '../assets/signin.gif'
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom'
import { imageToBase64 } from '../helpers/imageToBase64'
import { signUp } from '../services/apiServices'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Context } from '../context/context'
import ModalLoading from '../components/ModalLoading'
const SignUp = () => {
    const navigate = useNavigate()
    const [showPass, setShowPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)
    const user = useSelector(state => state?.user?.user)
    const { isLoading, setIsLoading } = useContext(Context)
    const [data, setData] = useState({
        name: "",
        email: "",
        phoneNumber: '',
        password: "",
        confirmpassword: "",
        profilePic: ""
    })
    useEffect(() => {
        if (user) {
            navigate(`/`)
        }
    }, [user, navigate])
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleSubmitSignup = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (data.confirmpassword !== data.password) {
            toast.dismiss()
            toast.error(`Confirm password does not match !`)
            return
        }
        const res = await signUp(data.name, data.email, data.phoneNumber, data.password, data.profilePic)
        if (res && res.success && !res.error) {
            toast.dismiss()
            setIsLoading(false)
            toast.success(`Registered successfully !`)
            navigate(`/login`)
        } else if (res.message === 'User already exists !') {
            toast.dismiss()
            toast.warning(res.message)
            setIsLoading(false)
        } else {
            toast.dismiss()
            toast.error(res.message)
            setIsLoading(false)
        }
    }
    const handleUploadPic = async (e) => {
        const file = e.target.files[0]

        const imagePic = await imageToBase64(file)

        setData((prev) => {
            return {
                ...prev,
                profilePic: imagePic
            }
        })
    }
    if (isLoading) {
        return <ModalLoading />
    }
    return (
        <section id='signup'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 w-full max-w-2xl mx-auto rounded '>
                    <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                        <div>
                            <img src={data.profilePic || login} alt='login icon' className='w-full h-full' />
                        </div>
                        <div className='text-xs bg-opacity-80 hover:bg-opacity-95 cursor-pointer bg-slate-200 pb-4 pt-2 text-center absolute bottom-0 w-full'>
                            <label htmlFor='profilePic' className='cursor-pointer'>Upload Avatar</label>
                            <input type='file' id='profilePic' name='profilePic' onChange={handleUploadPic} hidden />
                        </div>
                    </div>
                    <form className='pt-6' onSubmit={(e) => handleSubmitSignup(e)}>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div className='p-1'>
                                <label>Name:</label>
                                <div className='bg-slate-100 p-2 rounded-md'>
                                    <input
                                        type='text'
                                        placeholder='Enter your Name'
                                        className='w-full h-full outline-none bg-transparent'
                                        name='name'
                                        value={data.name}
                                        onChange={(e) => handleOnChange(e)}
                                        required />
                                </div>
                            </div>
                            <div className='p-1'>
                                <label>Email:</label>
                                <div className='bg-slate-100 p-2 rounded-md'>
                                    <input
                                        type='email'
                                        placeholder='Enter your Email'
                                        className='w-full h-full outline-none bg-transparent'
                                        name='email'
                                        value={data.email}
                                        onChange={(e) => handleOnChange(e)}
                                        required />
                                </div>
                            </div>
                            <div className='p-1'>
                                <label>Password:</label>
                                <div className='bg-slate-100 p-2 rounded-md relative'>
                                    <input
                                        type={showPass ? 'text' : 'password'}
                                        placeholder='Enter your Password'
                                        className='w-full h-full outline-none bg-transparent'
                                        name='password'
                                        value={data.password}
                                        onChange={(e) => handleOnChange(e)}
                                        required />
                                    <div className='absolute right-[10px] top-[50%] translate-y-[-50%] cursor-pointer text-xl' onClick={() => setShowPass(prev => !prev)}>
                                        {
                                            showPass ? <FaEyeSlash /> : <FaEye />
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='p-1'>
                                <label>Confirm Password:</label>
                                <div className='bg-slate-100 p-2 rounded-md relative'>
                                    <input
                                        type={showConfirmPass ? 'text' : 'password'}
                                        placeholder='Enter your Password'
                                        className='w-full h-full outline-none bg-transparent'
                                        name='confirmpassword'
                                        value={data.confirmpassword}
                                        onChange={(e) => handleOnChange(e)}
                                        required />
                                    <div className='absolute right-[10px] top-[50%] translate-y-[-50%] cursor-pointer text-xl' onClick={() => setShowConfirmPass(prev => !prev)}>
                                        {
                                            showConfirmPass ? <FaEyeSlash /> : <FaEye />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='pt-4'>
                            <label>Phone number:</label>
                            <div className='bg-slate-100 p-2 rounded-md'>
                                <input
                                    type='number'
                                    placeholder='(+84) 0123456789'
                                    className='w-full h-full outline-none bg-transparent'
                                    name='phoneNumber'
                                    value={data.phoneNumber}
                                    onChange={(e) => handleOnChange(e)}
                                    required />
                            </div>
                        </div>
                        <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:bg-red-500 hover:scale-110 transition duration-300 mx-auto mt-4 block'>
                            Sign up
                        </button>
                    </form>
                    <p className='my-2'>Already have an account? <Link to={'/login'} className='text-red-600 hover:underline hover:text-blue-600'>Login</Link></p>
                </div>
            </div>
        </section>
    )
}

export default SignUp