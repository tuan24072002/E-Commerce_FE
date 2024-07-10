import React, { useContext, useEffect, useState } from 'react'
import login from '../assets/signin.gif'
import { FaEye, FaEyeSlash, FaQrcode } from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom'
import { signIn } from '../services/apiServices'
import { toast } from 'react-toastify'
import { Context } from '../context/context'
import { useSelector } from 'react-redux'
import ModalLoading from '../components/ModalLoading'
import ModalScanMyQrCode from '../components/ModalScanMyQrCode'
const Login = () => {
    const { fetchUserDetail, fetchCountCartProduct } = useContext(Context)
    const [isModalScanQrCode, setIsModalScanQrCode] = useState(false)
    const navigate = useNavigate()
    const user = useSelector(state => state?.user?.user)
    const [showPass, setShowPass] = useState(false)
    const { isLoading, setIsLoading } = useContext(Context)
    const [data, setData] = useState({
        email: "",
        password: ""
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
    const handleSubmitLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const res = await signIn(data.email, data.password)
        if (res && res.success) {
            toast.dismiss()
            setIsLoading(false)
            toast.success(res.message)
            navigate(`/`)
            fetchUserDetail()
            fetchCountCartProduct()
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
        <>
            <section id='login'>
                <div className='mx-auto container p-4'>
                    <div className='bg-white p-5 w-full max-w-md mx-auto rounded'>
                        <div className='w-20 h-20 mx-auto overflow-hidden  rounded-full'>
                            <img src={login} alt='login icon' />
                        </div>
                        <form className='pt-6 flex flex-col gap-2' onSubmit={(e) => handleSubmitLogin(e)}>
                            <div className='grid'>
                                <label>Email:</label>
                                <div className='bg-slate-100 p-2 rounded-md'>
                                    <input
                                        type='email'
                                        placeholder='Enter your Email'
                                        className='w-full h-full outline-none bg-transparent'
                                        name='email'
                                        value={data.email}
                                        onChange={(e) => handleOnChange(e)} />
                                </div>
                            </div>
                            <div>
                                <label>Password:</label>
                                <div className='bg-slate-100 p-2 rounded-md relative'>
                                    <input
                                        type={showPass ? 'text' : 'password'}
                                        placeholder='Enter your Password'
                                        className='w-full h-full outline-none bg-transparent'
                                        name='password'
                                        value={data.password}
                                        onChange={(e) => handleOnChange(e)} />
                                    <div className='absolute right-[10px] top-[50%] translate-y-[-50%] cursor-pointer text-xl' onClick={() => setShowPass(prev => !prev)}>
                                        {
                                            showPass ? <FaEyeSlash /> : <FaEye />
                                        }
                                    </div>
                                </div>
                                <div className='flex justify-end'>
                                    <Link to={`/forgot-password`} className='w-fit hover:underline hover:text-red-600'>
                                        Forgot password
                                    </Link>
                                </div>
                            </div>
                            <div className='flex md:flex-row flex-col'>
                                <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:bg-red-500 hover:scale-110 transition duration-300 mx-auto mt-4 block'>Login</button>
                                <div onClick={() => setIsModalScanQrCode(true)} className='bg-green-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:bg-green-500 hover:scale-110 transition duration-300 mx-auto mt-4 flex items-center gap-2 cursor-pointer'><span>QR Code</span><FaQrcode /></div>
                            </div>
                        </form>
                        <p className='my-2'>Don't have an account? <Link to={'/register'} className='text-red-600 hover:underline hover:text-blue-600'>Sign up</Link></p>
                    </div>
                </div>
            </section>
            {
                isModalScanQrCode && <ModalScanMyQrCode setIsModalScanQrCode={setIsModalScanQrCode} />
            }
        </>
    )
}

export default Login