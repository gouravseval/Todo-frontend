import { X } from "lucide-react"
import { FC } from "react"

const AddComponent:FC<any> = ({onClose, onChange, value, dateChange, onClick}) => {
    return (
        <div className='h-10 border rounded-md gap-3 bg-white flex items-center justify-between px-4 w-[90vw] xl:w-[80vw]'>
            <input value={value} onChange={onChange} className=" outline-none border h-8 w-[76%] px-2 rounded-md" type="text" />
            <input onChange={dateChange} className="border px-2 rounded-md h-8" type="date" />
            <button
            onClick={onClick}
                className="hover:bg-cyan-500 outline-none border bg-customcyan h-8 text-white flex rounded-md items-center justify-center px-3 ">Add
            </button>
            <button  onClick={onClose} className="border rounded-[50%] ml-2 hover:bg-gray-100 text-gray-400"><X/></button>
        </div>
    )
}

export default AddComponent