import instance from '../utils/axiosCustomize'

//Auth
const signUp = (name, email, phoneNumber, password, profilePic) => {
    return instance.post(`signup`, { name, email, phoneNumber, password, profilePic })
}
const signIn = (email, password) => {
    return instance.post(`signin`, { email, password })
}
const logout = () => {
    return instance.post(`logout`)
}
const userDetail = () => {
    return instance.get(`user-detail`)
}

////Admin
//Users
const fetchAllUser = () => {
    return instance.get(`all-users`)
}
const updateUser = (_id, name, email, password, role, profilePic, block) => {
    return instance.put('update-user', { _id, name, email, password, role, profilePic, block })
}
const deleteUser = (_id) => {
    return instance.delete('delete-user', { _id })
}
//Products
const getAllPro = () => {
    return instance.get(`all-product`)
}
const getCategoryProduct = () => {
    return instance.get(`category-product`)
}
const getProductByCat = (cat) => {
    return instance.get(`getProByCat/${cat}`)
}
const getProductByCatPaginate = (cat, page) => {
    return instance.get(`getProByCatPaginate/${cat}${page ? `?page=${page}` : ''}`)
}
const getProductDetail = (productId) => {
    return instance.get(`product-detail/${productId}`)
}
const uploadProduct = (productName, brandName, category, productImage, description, price, sellingPrice) => {
    return instance.post(`upload-product`, { productName, brandName, category, productImage, description, price, sellingPrice })
}
const updateProduct = (_id, productName, brandName, category, productImage, description, price, sellingPrice) => {
    return instance.put(`update-product`, { _id, productName, brandName, category, productImage, description, price, sellingPrice })
}
const deleteProduct = (_id) => {
    return instance.delete(`delete-product`, { _id })
}
const searchProduct = (query, page) => {
    return instance.get(`search-product${page ? `?page=${page}` : ''}${query ? `&${query.replace('?', '')}` : ''}`)
}
const filterProduct = (category, state, page) => {
    return instance.post(`filter-product${page ? `?page=${page}` : ''}`, { category, state })
}
//Orders
const getAllOrder = () => {
    return instance.get('get-all-order')
}
const updateStateOrder = (orderId, state) => {
    return instance.post(`update-state-order`, { orderId, state })
}
//Cloundinary
const uploadImageCloundinary = (img) => {
    const formData = new FormData()
    formData.append('image', img)
    return instance.post(`upload-image`, formData)
}
const deleteImageCloundinary = (public_id) => {
    return instance.delete(`delete-image`, { data: { public_id } })
}

//Cart
const addCart = (productId, state) => {
    return instance.post(`add-to-cart`, { productId, state })
}
const plusOrMinusProductCart = (productId, state) => {
    return instance.put(`plus-minus-product-cart`, { productId, state })
}
const countCartPro = () => {
    return instance.get(`count-cart-product`)
}
const getCartPro = () => {
    return instance.get(`get-cart-product`)
}
const getCartProStateTrue = () => {
    return instance.get(`get-cart-product-state-true`)
}
const deleteCartPro = (productId) => {
    return instance.delete(`delete-product-cart`, { data: { productId } })
}
const updateStateProductCart = (state, productId) => {
    return instance.post(`update-state-product-cart`, { state, productId })
}
const updateCheckAllStateProductCart = (checkAll) => {
    return instance.post(`update-state-product-cart`, { checkAll })
}
const deleteAllCArt = () => {
    return instance.delete(`delete-cart`)
}

//Order
const createNewOrder = (name, phoneNumber, address, note, paymentMethod, paymentState, state) => {
    return instance.post(`create-order`, { name, phoneNumber, address, note, paymentMethod, paymentState, state })
}
const getOrderById = (orderId) => {
    return instance.get(`get-order-by-id/${orderId}`)
}
const getOrderByUserId = () => {
    return instance.get(`get-order-by-userId`)
}
const updateOrderById = (orderId, state, reason) => {
    return instance.post(`update-order-by-id`, { orderId, state, reason })
}

//api province
const getProvince = () => {
    return instance.get(`province`)
}
const getDistrict = (province_id) => {
    return instance.get(`province/district/${province_id}`)
}
const getWard = (district_id) => {
    return instance.get(`province/ward/${district_id}`)
}

//Dashboard
const dashBoardOverview = () => {
    return instance.get(`dashboard`)
}

//Stripe payment
const createPaymentStripe = (cart, nameReceive, phoneNumberReceive, address, otherNote) => {
    return instance.post(`create-payment-stripe`, { cart, nameReceive, phoneNumberReceive, address, otherNote })
}
const getResultPaymentStripe = (session_id) => {
    return instance.get(`webhook${session_id}`)
}

//Settings
const changeInformation = (name, email, phoneNumber, address, profilePic, oldPass, newPass) => {
    return instance.post(`change-information`, { name, email, phoneNumber, address, profilePic, oldPass, newPass })
}

//Rate
const createRate = (productId, star, comment, image) => {
    return instance.post(`create-rate`, { productId, star, comment, image })
}
const getRateByProId = (productId) => {
    return instance.get(`get-rate-by-proId/${productId}`)
}

export {
    signUp,
    signIn,
    userDetail,
    logout,
    fetchAllUser,
    updateUser,
    deleteUser,
    uploadProduct,
    getAllPro,
    getCategoryProduct,
    getProductByCat,
    getProductByCatPaginate,
    getProductDetail,
    updateProduct,
    deleteProduct,
    uploadImageCloundinary,
    deleteImageCloundinary,
    addCart,
    plusOrMinusProductCart,
    countCartPro,
    getCartPro,
    getCartProStateTrue,
    deleteCartPro,
    deleteAllCArt,
    searchProduct,
    filterProduct,
    dashBoardOverview,
    updateStateProductCart,
    updateCheckAllStateProductCart,
    getProvince,
    getDistrict,
    getWard,
    createPaymentStripe,
    getResultPaymentStripe,
    createNewOrder,
    changeInformation,
    getAllOrder,
    getOrderById,
    getOrderByUserId,
    updateStateOrder,
    updateOrderById,
    createRate,
    getRateByProId
}