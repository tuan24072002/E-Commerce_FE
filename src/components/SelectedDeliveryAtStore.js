import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Select from 'react-select';
const SelectedDeliveryAtStore = (props) => {
    const { addressStore, setAddressStore, setAddressHome, otherNote, setOtherNote } = props
    const [selectedStore, setSelectedStore] = useState({
        value: '', label: 'Choose store ...'
    });
    const options = [
        { value: '140 Le Trong Tan Street, Tay Thanh Ward, Tan Phu District, Ho Chi Minh City', label: '140 Le Trong Tan Street, Tay Thanh Ward, Tan Phu District, Ho Chi Minh City' },
        { value: '148/12/50/18A Ton Dan Street, Ward 8, District 4, Ho Chi Minh City', label: '148/12/50/18A Ton Dan Street, Ward 8, District 4, Ho Chi Minh City' }
    ];
    useEffect(() => {
        if (selectedStore.value !== '') {
            setAddressStore('Store: ' + selectedStore.value)
        }
    }, [selectedStore, setAddressStore])

    return (
        <div className='p-4 grid gap-4'>
            <Select
                defaultValue={addressStore !== '' ? { value: addressStore?.slice(7), label: addressStore?.slice(7) } : selectedStore}
                onChange={(e) => {
                    setSelectedStore({ value: e.value, label: e.label })
                    setAddressHome('')
                }}
                options={options}

            />
            <div className="grid relative group items-center">
                <input type="text" value={otherNote || ''} onChange={(e) => setOtherNote(e.target.value)} className="p-2 focus-within:bg-slate-200 border bg-slate-100 rounded outline-none" placeholder="Other notes" />
                {otherNote !== '' && <IoMdClose className='absolute cursor-pointer right-2 top-50% group-hover:block group-focus-within:block hidden' onClick={() => setOtherNote('')} />}
            </div>
        </div>
    )
}

export default SelectedDeliveryAtStore