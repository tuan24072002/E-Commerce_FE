import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import Select from 'react-select';
import { getDistrict, getProvince, getWard } from "../services/apiServices";
const SelectedDeliveryAtHome = (props) => {
    const { addressHome, setAddressHome, setAddressStore, nameReceive, setNameReceive, phoneNumberReceive, setPhoneNumberReceive, otherNote, setOtherNote } = props
    const user = useSelector(state => state?.user?.user)
    const [selectedProvince, setSelectedProvince] = useState([]);
    const defaultProvince = {
        value: '', label: 'Choose province'
    }
    const [province, setProvince] = useState(defaultProvince)
    const defaultDistrict = {
        value: '', label: 'Choose district ...'
    }
    const [district, setDistrict] = useState(defaultDistrict)
    const [selectedDistrict, setSelectedDistrict] = useState([]);
    const defaultWard = {
        value: '', label: 'Choose ward ...'
    }
    const [ward, setWard] = useState(defaultWard)
    const [selectedWard, setSelectedWard] = useState([]);

    const [houseNumber, setHouseNumber] = useState('')
    const fetchApiProvince = useCallback(async () => {
        const res = await getProvince()
        if (res) {
            setSelectedProvince(prev => [...prev, ...res?.results?.map(data => (
                {
                    value: data.province_id,
                    label: data.province_name
                }
            ))])
        }

    }, [])

    const fetchApiDistrict = useCallback(async () => {
        if (province.value) {
            const res = await getDistrict(province?.value)
            setSelectedDistrict(prev => [...prev, ...res?.results?.map(data => (
                {
                    value: data.district_id,
                    label: data.district_name
                }
            ))])
        }
    }, [province?.value])
    const fetchApiWard = useCallback(async () => {
        if (district.value) {
            const res = await getWard(district.value)
            setSelectedWard(prev => [...prev, ...res?.results?.map(data => (
                {
                    value: data.ward_id,
                    label: data.ward_name
                }
            ))])
        }
    }, [district.value])
    useEffect(() => {
        if (houseNumber !== '' && district.value !== '' && province.value !== '') {
            setAddressHome('Home: ' + houseNumber + (ward.label !== 'Choose ward ...' ? ', ' + ward.label : '') + ', ' + district.label + ', ' + province.label)
            setAddressStore('')
        }
    }, [setAddressStore, houseNumber, ward, district, province, setAddressHome])
    useEffect(() => {
        fetchApiProvince()
        fetchApiDistrict()
        fetchApiWard()
    }, [fetchApiProvince, fetchApiDistrict, fetchApiWard])
    const handleOnChangePhoneNumber = (e) => {
        const inputValue = e.target.value
        if (/^\d{0,10}$/.test(inputValue)) {
            setPhoneNumberReceive(inputValue);
        }
    }
    return (
        <div className='p-4 grid gap-4'>
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                <div className=" grid items-center">
                    <label>Name (*)</label>
                    <div className="grid relative group items-center">
                        <input type="text" value={nameReceive || ''} onChange={(e) => setNameReceive(e.target.value)} className="p-2 border bg-slate-100 focus-within:bg-slate-200 outline-none rounded" placeholder="David Ngo" />
                        {nameReceive !== '' && <IoMdClose className='absolute cursor-pointer right-2 top-50% group-hover:block group-focus-within:block hidden' onClick={() => setNameReceive('')} />}
                    </div>
                </div>
                <div className="grid items-center">
                    <label>Phone number (*)</label>
                    <input type="number" value={phoneNumberReceive || ''} onChange={(e) => handleOnChangePhoneNumber(e)} className="p-2 border bg-slate-100 focus-within:bg-slate-200 outline-none rounded" placeholder="(+84) 0123456789" />
                </div>
            </div>
            {
                user?.address === '' && <p className="font-medium text-sm text-red-600">(*) You don't have a default address yet</p>
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                {/* Province */}
                <Select
                    defaultValue={province}
                    onChange={setProvince}
                    options={selectedProvince || []}
                    isOptionSelected={province}
                />
                {/* District */}
                <Select
                    defaultValue={district}
                    onChange={setDistrict}
                    options={selectedDistrict}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                {/* Ward */}
                <Select
                    defaultValue={ward}
                    onChange={setWard}
                    options={selectedWard}
                />
                <div className="grid relative group items-center">
                    <input type="text"
                        placeholder="House number & street name"
                        value={houseNumber || ''}
                        onChange={(e) => setHouseNumber(e.target.value)}
                        className="p-2 outline-none rounded bg-slate-100 focus-within:bg-slate-200" />
                    {houseNumber !== '' && <IoMdClose className='absolute cursor-pointer right-2 top-50% group-hover:block group-focus-within:block hidden' onClick={() => {
                        setAddressHome('')
                        setProvince(defaultProvince)
                        setWard(defaultWard)
                        setDistrict(defaultDistrict)
                        setHouseNumber('')
                    }} />}
                </div>
            </div>
            <div className="grid relative group items-center">
                <input type="text" value={addressHome?.slice(6) || ''} disabled className="p-2 disabled:bg-slate-200 border bg-slate-100 rounded outline-none" placeholder="Current address" />
                {addressHome !== '' && <IoMdClose className='absolute cursor-pointer right-2 top-50%'
                    onClick={() => {
                        setAddressHome('')
                        setProvince(defaultProvince)
                        setWard(defaultWard)
                        setDistrict(defaultDistrict)
                        setHouseNumber('')
                    }} />}
            </div>
            <div className="grid relative group items-center">
                <input type="text" value={otherNote || ''} onChange={(e) => setOtherNote(e.target.value)} className="p-2 focus-within:bg-slate-200 border bg-slate-100 rounded outline-none" placeholder="Other notes" />
                {otherNote !== '' && <IoMdClose className='absolute cursor-pointer right-2 top-50% group-hover:block group-focus-within:block hidden' onClick={() => setOtherNote('')} />}
            </div>
        </div>
    )
}

export default SelectedDeliveryAtHome