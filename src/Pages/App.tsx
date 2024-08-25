import SignPage from "./SignPage/SignPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {base_url} from "../constant"
import TodoPage from "./TodoPage/TodoPage";
import Footer from "../Components/footer/Footer";
import ContactMe from "../Components/contactMe/ContactMe";

function App() {
console.log(base_url)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignPage />,
    },
    {
      path: "/todos",
      element: <TodoPage />,
    },
  ]);

  return (
    <div className="h-screen w-screen bg-gray-100">
      <RouterProvider router={router} />
      <Footer/>
      <ContactMe/>
      <ToastContainer />
    </div>
  )
}

export default App
