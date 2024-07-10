import React, { useEffect, useState } from 'react'
import { SlClose } from 'react-icons/sl'
import QrReader from 'react-qr-scanner'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
const ModalScanMyQrCode = (props) => {
    const { setIsModalScanQrCode } = props
    const [scanned, setScanned] = useState(false)
    const [timeScan, setTimeScan] = useState(10)
    const [data, setData] = useState('')
    const previewStyle = {
        height: '100%',
        width: '100%',
    }
    const handleScanQrCode = (result) => {
        if (scanned) {
            setData(result)
        }
    }
    const handleScanError = () => {
        toast.error(`This QR Code has expired, please log in again !`)
    }
    useEffect(() => {
        if (data?.text) {
            Cookies.set('token', data.text, { expires: 7 })
            window.location.reload()
        }
    }, [data])
    useEffect(() => {
        if (timeScan > 0) {
            const interval = setInterval(() => {
                setTimeScan(prev => prev - 1)
            }, 1000)
            return () => clearInterval(interval);
        } else if (timeScan === 0) {
            setScanned(false)
        }
    }, [timeScan])

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-[rgba(0,0,0,0.8)]'>
            <div className='relative mx-auto bg-white shadow-md p-4 w-96 h-96 flex flex-col rounded-lg'>
                <p className='border text-center my-1 p-2 bg-green-500 font-medium text-white rounded-lg'>Scan your QR code here</p>
                {
                    scanned && <QrReader
                        delay={100}
                        onScan={(e) => handleScanQrCode(e)}
                        onError={handleScanError}
                        style={previewStyle}
                    />
                }
                <button onClick={() => { setScanned(true); setTimeScan(10); }} className={`py-2 px-4 ${scanned ? 'bg-blue-500' : 'bg-red-500'} rounded-lg w-fit mx-auto ${scanned ? 'my-1' : 'my-auto'} text-white`}>{scanned ? `Scanning... ${timeScan}s` : 'Start Scan'}</button>
                <div className='absolute md:-right-4 md:-top-4 right-0 top-0 bg-white rounded-full cursor-pointer' onClick={() => setIsModalScanQrCode(false)}><SlClose size='2em' /></div>
            </div>
        </div>
    )
}

export default ModalScanMyQrCode