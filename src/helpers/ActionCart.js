import { addCart } from "../services/apiServices"
import { toast } from 'react-toastify'

const AddToCart = async (e, id) => {
    e?.stopPropagation()
    e.preventDefault()
    const res = await addCart(id, 'addToCart')
    if (res && res.success) {
        toast.dismiss()
        toast.success(res.message)
    } else {
        toast.dismiss()
        toast.error(res.message)
    }
}
const BuyNow = async (id) => {
    const res = await addCart(id, 'buyNow')
    if (res && res.success) {
        toast.dismiss()
        toast.success(res.message)
    } else {
        toast.dismiss()
        toast.error(res.message)
    }
}
export {
    AddToCart,
    BuyNow
}