import { X } from "lucide-react"
import moment from "moment"
import { FC, useState } from "react"

const Todo: FC<any> = ({ todo, onSave, onDelete, onChange, onUpdate, value, isCompleted, onCompleteChange, date, dateChange }) => {
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const dateConverter = (date: string) => {
        return moment(date).format('MMM-DD-YYYY');
    }

    return (
        <div className="flex items-center drop-shadow-sm justify-between px-2 h-10 bg-white rounded-md w-[90vw] xl:w-[80vw]">
            <div className="flex px-5 gap-5 items-center w-full">
                <input onChange={onCompleteChange} checked={isCompleted} className="w-4 h-4" type="checkbox" name="" id="" />
                {isEdit
                    ?
                    <input onChange={onChange} value={value} className=" outline-none border h-8 w-full px-2 rounded-md" type="text" />
                    :
                    <p className={`${isCompleted ? "line-through" : ""}`}>{todo}</p>
                }
            </div>

            <div className="flex gap-2 justify-center items-center">
                {isEdit ?
                    <input onChange={dateChange} className="border px-2 rounded-md h-8" type="date" />
                    :
                    <p className="text-nowrap border rounded-md px-2 py-1 bg-gray-100">
                        {dateConverter(date)}
                    </p>}

                {isEdit
                    ?
                    <>
                        <button onClick={() => {
                            onSave()
                            setIsEdit(false)
                        }}
                            className="hover:bg-cyan-500 outline-none border bg-customcyan text-white flex rounded-md items-center justify-center px-3 py-1">Save</button>
                    </>
                    :
                    <button onClick={() => {
                        setIsEdit(true)
                        onUpdate()
                    }} className="hover:bg-cyan-500 py-1 outline-none border bg-customcyan text-white flex rounded-md items-center justify-center px-3 ">Update</button>
                }
                {isEdit ?
                    <button onClick={() => setIsEdit(false)} className="border rounded-[50%] ml-2 hover:bg-gray-100 text-gray-400"><X /></button>
                    :
                    <button onClick={onDelete} className="outline-none border hover:bg-red-600 bg-red-500 flex rounded-md items-center justify-center px-3 py-1 text-white">Delete</button>}
            </div>
        </div>
    )
}

export default Todo