import axios from "axios";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import { base_url } from "../../constant";
import { useNavigate } from "react-router-dom";

interface SignInData {
    email: string;
    password: string;
}

const SignInForm: FC<{ onLink: () => void }> = ({ onLink }) => {
    const navigate = useNavigate()
    const [data, setData] = useState<SignInData>({
        email: "",
        password: ""
    });

    const signIn = async (data: SignInData) => {
        try {
            const response = await axios.post(`${base_url}/login`, {
                email: data.email,
                password: data.password
            });

            const token = response.data.data.accessToken
            sessionStorage.setItem("token", token)
            if (response) {
                try {
                    const result = await axios.get(`${base_url}/current`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });  
                    sessionStorage.setItem("user", JSON.stringify(result.data))
                    navigate('/todos')
                } catch (error: any) {
                    throw new error
                }
            }

            toast.success("logged In")
            return response
        } catch (error: any) {
            toast.error("Wrong Credentials")
            console.error('Error:', error);
            throw error;
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signIn(data);
    };

    return (
        <div className="bg-white rounded-lg flex flex-col h-[500px] gap-4 items-center w-[500px]">
            <h1 className="text-[32px] my-8 font-medium">Sign In</h1>
            <form className="flex flex-col gap-4 items-center w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1 w-[90%]">
                    <label className="text-[16px]" htmlFor="email">Email</label>
                    <input
                        name="email"
                        type="email"
                        value={data.email}
                        onChange={handleInputChange}
                        className="text-[14px] h-9 outline-none rounded-lg px-2 border"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1 w-[90%]">
                    <label className="text-[16px]" htmlFor="password">Password</label>
                    <input
                        name="password"
                        type="password"
                        value={data.password}
                        onChange={handleInputChange}
                        className="text-[14px] h-9 outline-none rounded-lg px-2 border"
                        required
                    />
                </div>
                <p>Create an account? <span onClick={onLink} className="underline text-customcyan cursor-pointer">Sign Up</span></p>
                <button
                    type="submit"
                    className="text-white px-3 mt-5 py-1 rounded-md outline-none bg-customcyan">
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default SignInForm;
