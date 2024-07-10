import React, { useEffect, useState } from 'react'
import banner1 from '../assets/banner/img1.webp'
import banner1Mobile from '../assets/banner/img1_mobile.jpg'
import banner2 from '../assets/banner/img2.webp'
import banner2Mobile from '../assets/banner/img2_mobile.jpg'
import banner3 from '../assets/banner/img3.webp'
import banner3Mobile from '../assets/banner/img3_mobile.jpg'
import banner4 from '../assets/banner/img4.webp'
import banner4Mobile from '../assets/banner/img4_mobile.jpg'
import banner5 from '../assets/banner/img5.webp'
import banner5Mobile from '../assets/banner/img5_mobile.jpg'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0)
    const desktopBanner = [
        banner1,
        banner2,
        banner3,
        banner4,
        banner5,
    ]
    const mobileBanner = [
        banner1Mobile,
        banner2Mobile,
        banner3Mobile,
        banner4Mobile,
        banner5Mobile,
    ]
    const handleClickBackImage = () => {
        if (currentImage < 1) {
            setCurrentImage(desktopBanner.length - 1)
        } else {
            setCurrentImage(prev => prev - 1)
        }
    }
    const handleClickNextImage = () => {
        if (desktopBanner.length - 1 <= currentImage) {
            setCurrentImage(0)
        } else {
            setCurrentImage(prev => prev + 1)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (desktopBanner.length - 1 <= currentImage) {
                setCurrentImage(0)
            } else {
                setCurrentImage(prev => prev + 1)
            }
        }, 5000)
        return () => clearInterval(interval)
    })
    return (
        <div className='container mx-auto px-4 rounded overflow-hidden'>
            <div className='h-80 w-full relative'>
                <div className='md:flex hidden w-full justify-between absolute z-20 top-[50%] transform translate-y-[-50%] px-4'>
                    <i className=' hover:bg-white hover:rounded-full hover:text-black bg-black rounded-full flex justify-center items-center p-0 md:p-2 text-white cursor-pointer' onClick={() => handleClickBackImage()}><IoIosArrowBack size={'1.5em'} /></i>
                    <i className=' hover:bg-white hover:rounded-full hover:text-black bg-black rounded-full flex justify-center items-center p-0 md:p-2 text-white cursor-pointer' onClick={() => handleClickNextImage()}><IoIosArrowForward size={'1.5em'} /></i>
                </div>
                <div className='h-full w-full overflow-hidden z-10 bg-slate-200 hidden md:flex'>
                    {
                        desktopBanner.map((img, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full' key={index} style={{ transform: `translateX(-${currentImage * 100}%)`, transition: '1s' }}>
                                    <img src={img} alt='' className='w-[90%] h-full object-fill mx-auto' />
                                </div>
                            )
                        })
                    }
                </div>
                <div className='h-full w-full overflow-x-scroll z-10 bg-slate-200 flex md:hidden scrollbar-none'>
                    {
                        mobileBanner.map((img, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full' key={index} style={{ transform: `translateX(-${currentImage * 100}%)`, transition: '1s' }}>
                                    <img src={img} alt='' className='w-full h-full object-cover mx-auto' />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default BannerProduct