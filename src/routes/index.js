import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/Admin/AdminPanel'
import AllUser from '../pages/Admin/AllUser'
import AllProduct from '../pages/Admin/AllProduct'
import Dashboard from '../pages/Admin/Dashboard'
import ProductByCategory from '../pages/ProductByCategory'
import ProductDetail from '../pages/ProductDetail'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import Payment from '../pages/Payment'
import PaymentSuccess from '../pages/PaymentSuccess'
import PaymentFail from '../pages/PaymentFail'
import PageNotFound from '../pages/PageNotFound'
import AllOrder from '../pages/Admin/AllOrder'
import History from '../pages/History'
import OrderDetail from '../pages/OrderDetail'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'forgot-password',
                element: <ForgotPassword />
            },
            {
                path: 'register',
                element: <SignUp />
            },
            {
                path: 'product-category/:category',
                element: <ProductByCategory />
            },
            {
                path: 'product/:productId',
                element: <ProductDetail />
            },
            {
                path: 'cart',
                element: <Cart />
            },
            {
                path: 'search',
                element: <SearchProduct />
            },
            {
                path: 'history',
                element: <History />
            },
            {
                path: 'order-detail/:orderId',
                element: <OrderDetail />
            },
            {
                path: 'payment',
                element: <Payment />
            },
            {
                path: 'payment-success',
                element: <PaymentSuccess />
            },
            {
                path: 'payment-failed',
                element: <PaymentFail />
            },
            {
                path: 'admin',
                element: <AdminPanel />,
                children: [
                    {
                        path: '',
                        element: <Dashboard />
                    },
                    {
                        path: 'all-users',
                        element: <AllUser />
                    },
                    {
                        path: 'all-products',
                        element: <AllProduct />
                    },
                    {
                        path: 'all-orders',
                        element: <AllOrder />
                    }
                ]
            },
            {
                path: '*',
                element: <PageNotFound />
            }
        ]
    },

])

export default router