import { FC, useEffect, useState } from "react"
import Todo from "../../Components/Todo/Todo"
import axios from "axios";
import { Plus } from "lucide-react";
import { base_url } from "../../constant";
import { toast } from "react-toastify";
import AddComponent from "../../Components/AddComponent/AddComponent";
import ConfirmationModal from "../../Components/Modal/ConfirmationModal";
const TodoPage: FC<any> = () => {

  const [todos, setTodos] = useState<any[]>([])
  const [editTodo, setEditTodo] = useState("")
  const [editDate, setEditDate] = useState("")
  const [addTodo, setAddTodo] = useState<boolean>(false)
  const [isConfirmDelete, setIsConfirmDelete] = useState<boolean>(false)
  const [delId, setDelId] = useState<string>("")
  const [newTodo, setNewTodo] = useState({
    todo: "",
    date: ""
  })

  const token = sessionStorage.getItem("token")
  const todosFetch = async () => {
    try {
      const response = await axios.get(`${base_url}/todo`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTodos(response.data)
      return response;
    } catch (error: any) {
      throw new error
    }
  };



  const createTodo = async () => {
    const token = sessionStorage.getItem("token")
    try {
      const response = await axios.post(`${base_url}/todo`,
        {
          todo: newTodo.todo,
          date: newTodo.date
        }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      todosFetch()
      toast.success("Todo Created Successfully")
      return response;
    } catch (error: any) {
      toast.error("Something went wrong")
      throw new error
    }
  }



  const deleteTodo = async (id: any) => {
    const token = sessionStorage.getItem("token")
    try {
      const response = await axios.delete(`${base_url}/todo/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
      todosFetch()
      toast.success("Todo Deleted Successfully")
      return response;
    } catch (error: any) {
      toast.error("Something went wrong")
      throw new error
    }
  }




  const updateTodo = async (data: any) => {
    const token = sessionStorage.getItem("token")
    try {
      const response = await axios.put(`${base_url}/todo/${data._id}`,
        {
          todo: editTodo,
          date: editDate
        }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      todosFetch()
      toast.success("Updated")
      return response;
    } catch (error: any) {
      toast.error("Something went wrong")
      throw new error
    }
  }

  useEffect(() => {
    todosFetch()
  }, [])


  const checkTodo = async (id: string, isCompleted: boolean) => {
    const token = sessionStorage.getItem("token")
    try {
      const response = await axios.put(`${base_url}/todo/${id}/status`,
        {
          isCompleted: !isCompleted
        }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      todosFetch()
      toast.success("Updated")
      return response;
    } catch (error: any) {
      toast.error("Something went wrong")
      throw new error
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center gap-2">
      <h1 className="mt-8 font-medium text-[24px] mb-4">Todo List</h1>
      {
        todos?.map((data) => (
          <Todo
            onDelete={() => {
              setIsConfirmDelete(true)
              setDelId(data._id)
            }}
            onCompleteChange={() => {
              checkTodo(data._id, data.isCompleted)
            }}
            onUpdate={() => {
              setEditTodo(data.todo)
              setEditDate(data.date)
            }}
            value={editTodo}
            onChange={(e: any) => {
              setEditTodo(e.target.value)
            }}
            onSave={() => {
              updateTodo(data)
            }}
            isCompleted={data.isCompleted}
            todo={data.todo}
            key={data._id}
            date={data.date}
            dateChange={(e: any) => {
              setEditDate(e.target.value)
            }}
          />
        ))
      }
      {addTodo ?
        <AddComponent
          onChange={(e: any) => {
            setNewTodo({ ...newTodo, todo: e.target.value })
          }}
          dateChange={(e: any) => {
            setNewTodo({ ...newTodo, date: e.target.value })
          }}
          onClose={() => setAddTodo(false)}
          onClick={() => {
            createTodo()
            setAddTodo(false)
          }}
        /> :
        <div className="h-10 w-[90vw] xl:w-[80vw] border rounded-md flex items-center justify-between px-3 bg-white">
          <p>Add Todo</p>
          <button
            onClick={() => {
              setAddTodo(true)
            }}
            className="border rounded-[50%] ml-2 hover:bg-gray-100 text-gray-400"><Plus /></button>
        </div>}

      {isConfirmDelete && <ConfirmationModal onClick={() => {
        deleteTodo(delId)
        setIsConfirmDelete(false)
      }} onCancel={() => {
        setIsConfirmDelete(false)
      }} />}
    </div>
  )
}

export default TodoPage