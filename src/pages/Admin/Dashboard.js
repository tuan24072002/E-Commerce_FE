import React, { useEffect, useState } from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { dashBoardOverview } from '../../services/apiServices';
import { toast } from 'react-toastify';
const Dashboard = () => {
    const [data, setData] = useState([])
    const fetchDataDashboard = async () => {
        const res = await dashBoardOverview()
        if (res && res.success) {
            setData(res.data)
        } else {
            toast.dismiss()
            toast.error(res.message)
        }
    }
    useEffect(() => {
        fetchDataDashboard()
    }, [])

    const dataDashBoard = [
        {
            "name": data[0]?.name,
            "AD": data[0]?.value
        },
        {
            "name": data[1]?.name,
            "US": data[1]?.value
        },
        {
            "name": data[2]?.name,
            "PD": data[2]?.value
        },
        {
            "name": data[3]?.name,
            "OCP": data[3]?.value
        },
        {
            "name": data[4]?.name,
            "OC": data[4]?.value
        }
    ]
    return (
        <div className='grid'>
            <div className='p-4 my-2 mx-4 min-h-20 bg-white flex items-center'>
                <h2 className='font-bold'>Dashboard</h2>
            </div>
            <div className='flex mx-4 my-2 justify-center items-center bg-white'>
                <div className=' max-w-[50%] max-h-[400px] min-w-[50%] min-h-[400px] grid grid-cols-2'>
                    <div title={`Total Admins: ${data[0]?.value}`} className='w-full h-full border-r-2 border-b-2 border-white bg-slate-200 hover:shadow-lg hover:text-red-600 cursor-pointer flex flex-col justify-center items-center text-black'>
                        <span className='text-xl'>Total Admins: </span>
                        <span className='font-semibold text-2xl'>{data[0]?.value}</span>
                    </div>
                    <div title={`Total Users: ${data[1]?.value}`} className='w-full h-full border-b-2 border-l-2 border-white bg-slate-200 hover:shadow-lg hover:text-red-600 cursor-pointer flex flex-col justify-center items-center text-black'>
                        <span className='text-xl'>Total Users: </span>
                        <span className='font-semibold text-2xl'>{data[1]?.value}</span>
                    </div>
                    <div title={`Total Products: ${data[2]?.value}`} className='w-full h-full border-r-2 border-t-2 border-white bg-slate-200 hover:shadow-lg hover:text-red-600 cursor-pointer flex flex-col justify-center items-center text-black'>
                        <span className='text-xl'>Total Products: </span>
                        <span className='font-semibold text-2xl'>{data[2]?.value}</span>
                    </div>
                    <div title={`Total Products: ${data[5]?.value}`} className='w-full h-full border-r-2 border-t-2 border-white bg-slate-200 hover:shadow-lg hover:text-red-600 cursor-pointer flex flex-col justify-center items-center text-black'>
                        <span className='text-xl'>Total Revenue: </span>
                        <span className='font-semibold text-2xl text-red-600'>${Number(data[5]?.value).toFixed(2)}</span>
                    </div>
                    <div title={`Total Orders: ${data[3]?.value}`} className='w-full h-full border-l-2 border-t-2 border-white bg-slate-200 hover:shadow-lg hover:text-red-600 cursor-pointer flex flex-col justify-center items-center text-black'>
                        <span className='text-xl'>Total Orders Completed:</span>
                        <span className='font-semibold text-2xl'>{data[3]?.value}</span>
                    </div>
                    <div title={`Total Orders: ${data[4]?.value}`} className='w-full h-full border-l-2 border-t-2 border-white bg-slate-200 hover:shadow-lg hover:text-red-600 cursor-pointer flex flex-col justify-center items-center text-black'>
                        <span className='text-xl'>Total Orders Canceled:</span>
                        <span className='font-semibold text-2xl'>{data[4]?.value}</span>
                    </div>
                </div>
                <div className=' w-[50%] h-[400px] flex justify-center items-center '>
                    <ResponsiveContainer width='75%' height='80%'>
                        <BarChart data={dataDashBoard}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="AD" fill="#8884d8" />
                            <Bar dataKey="US" fill="#82ca9d" />
                            <Bar dataKey="PD" fill="#FF6A6A" />
                            <Bar dataKey="US" fill="#1E90FF" />
                            <Bar dataKey="OCP" fill="#1E90FF" />
                            <Bar dataKey="OC" fill="#1E90FF" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default Dashboard