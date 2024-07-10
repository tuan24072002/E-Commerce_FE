import { useCallback, useContext, useEffect, useState } from "react"
import PaymentInfo from "../components/PaymentInfo"
import PaymentMethod from "../components/PaymentMethod"
import { toast } from "react-toastify"
import { getCartProStateTrue } from "../services/apiServices"
import { IoMdSad } from "react-icons/io"
import { Link } from "react-router-dom"
import { Context } from "../context/context"
const Payment = () => {
    const { nameReceive,
        setNameReceive,
        phoneNumberReceive,
        setPhoneNumberReceive,
        addressHome,
        setAddressHome,
        addressStore,
        setAddressStore,
        otherNote,
        setOtherNote } = useContext(Context)
    const [statePayment, setStatePayment] = useState('payment-info')
    const [receive, setReceive] = useState('AtStore')
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const fetchProductCart = useCallback(async () => {
        setIsLoading(true)
        const res = await getCartProStateTrue()
        if (res && res.success) {
            setData(res.data)
            setIsLoading(false)
        } else {
            toast.dismiss()
            toast.error(res.message)
            setIsLoading(false)
        }
    }, [])
    useEffect(() => {
        fetchProductCart()
    }, [fetchProductCart])
    const totalPrice = data.filter(curr => curr.state === true).reduce((prev, curr) => prev + (curr?.quantity * curr?.productId?.sellingPrice), 0)
    const totalProduct = data.filter(curr => curr.state === true).reduce((prev, curr) => prev + curr?.quantity, 0)

    return (
        data && data.length > 0 ?
            statePayment === 'payment-info' ? <PaymentInfo
                setStatePayment={setStatePayment}
                addressHome={addressHome}
                setAddressHome={setAddressHome}
                addressStore={addressStore}
                setAddressStore={setAddressStore}
                nameReceive={nameReceive}
                setNameReceive={setNameReceive}
                phoneNumberReceive={phoneNumberReceive}
                setPhoneNumberReceive={setPhoneNumberReceive}
                data={data}
                isLoading={isLoading}
                totalPrice={totalPrice}
                receive={receive}
                setReceive={setReceive}
                otherNote={otherNote}
                setOtherNote={setOtherNote} />
                : statePayment === 'payment-method' &&
                <PaymentMethod
                    statePayment={statePayment}
                    setStatePayment={setStatePayment}
                    addressHome={addressHome}
                    addressStore={addressStore}
                    nameReceive={nameReceive}
                    phoneNumberReceive={phoneNumberReceive}
                    totalPrice={totalPrice}
                    totalProduct={totalProduct}
                    data={data}
                    fetchProductCart={fetchProductCart}
                    receive={receive}
                    otherNote={otherNote} />
            : <div className=' gap-2 flex flex-col justify-center items-center w-full min-h-[calc(100vh-162px)]'>
                <div className='flex justify-center items-center lg:text-3xl 2xl'>
                    <p>Don't have any product</p>
                    <IoMdSad size={'1.5em'} />
                </div>
                <Link to={'/'} className='px-3 py-1 bg-slate-600 text-white hover:bg-slate-400 hover:text-black rounded-lg'>Go back</Link>
            </div>
    )
}

export default Payment