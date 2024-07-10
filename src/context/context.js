import { createContext, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countCartPro, userDetail } from "../services/apiServices";
import { setUserDetail } from '../store/userSlice';
import { toast } from "react-toastify";
import Cookies from 'js-cookie'
export const Context = createContext();

const ContextProvider = (props) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const [countCart, setCountCart] = useState(0)
    const [isLoadingAddToCart, setIsLoadingAddToCart] = useState(false)
    const [isLoadingPlusOrMinus, setIsLoadingPlusOrMinus] = useState(false)
    const [pageProductByCat, setPageProductByCat] = useState(1)
    const [pageSearchProduct, setPageSearchProduct] = useState(1)
    const [dataRate, setDataRate] = useState([])
    //payment
    const user = useSelector(state => state?.user?.user)
    const [nameReceive, setNameReceive] = useState(user?.name || '')
    const [phoneNumberReceive, setPhoneNumberReceive] = useState(user?.phoneNumber || '')
    const [addressHome, setAddressHome] = useState('')
    const [addressStore, setAddressStore] = useState('')
    const [otherNote, setOtherNote] = useState('')
    const [token, setToken] = useState('')
    const fetchUserDetail = useCallback(async () => {
        try {
            const res = await userDetail();
            if (res && res.success) {
                dispatch(setUserDetail(res.data))
                setToken(res.token.token)
            } else if (res && res.error && res.message === 'jwt expired') {
                toast.dismiss()
                toast.error(res.message)
                Cookies.remove('token')
            }
        } catch (error) {
            console.log(error);
            toast.dismiss()
            toast.error(`Your QR Code is not suitable for login !`)
        }
    }, [dispatch]);
    const fetchCountCartProduct = useCallback(async () => {
        try {
            const res = await countCartPro()
            if (res && res.success) {
                setCountCart(res.data.count)
            }
        } catch (error) {
            console.error(`Error fetching count cart product:`, error)
        }
    }, [])

    const contextValue = {
        fetchUserDetail,
        fetchCountCartProduct,
        isLoading,
        setIsLoading,
        countCart,
        isLoadingAddToCart,
        setIsLoadingAddToCart,
        isLoadingPlusOrMinus,
        setIsLoadingPlusOrMinus,
        pageProductByCat,
        setPageProductByCat,
        pageSearchProduct,
        setPageSearchProduct,
        nameReceive,
        setNameReceive,
        phoneNumberReceive,
        setPhoneNumberReceive,
        addressHome,
        setAddressHome,
        addressStore,
        setAddressStore,
        otherNote,
        setOtherNote,
        token,
        dataRate,
        setDataRate
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
