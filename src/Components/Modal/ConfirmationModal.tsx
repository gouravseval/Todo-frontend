import { FC } from "react"

const ConfirmationModal:FC<any> = ({onClick, onCancel}) => {
    return (
        <div className='fixed w-screen h-screen flex items-center justify-center bg-black/70'>
            <div className='h-40 w-60 flex flex-col items-center justify-center gap-5 border rounded-lg bg-gray-100'>
                <p className= " text-center px-3 text-[20px] ">Are you sure you want to delete todo ?</p>
                <div className='flex gap-6'>
                    <button onClick={onClick} className="hover:bg-cyan-500 outline-none border bg-customcyan text-white flex rounded-md items-center justify-center w-20 py-1">Yes</button>
                    <button onClick={onCancel} className="text-customcyan outline-none border-customcyan border bg-white  flex rounded-md items-center justify-center w-20 py-1">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal