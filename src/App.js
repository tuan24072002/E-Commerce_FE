import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify'
import { useContext, useEffect } from 'react';
import { Context } from './context/context';
function App() {
  const { fetchUserDetail, fetchCountCartProduct } = useContext(Context)
  useEffect(() => {
    fetchUserDetail()
    fetchCountCartProduct()
  }, [fetchUserDetail, fetchCountCartProduct])
  return (
    <>
      <Header />
      <main className='min-h-[calc(100vh-66px)] pt-16'>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
