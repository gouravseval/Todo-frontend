import { FC, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { base_url } from "../../constant";

interface SignUpData {
    email: string;
    username: string;
    password: string;
}

const SignUpForm: FC<{ onLink: () => void }> = ({ onLink }) => {
    const [data, setData] = useState<SignUpData>({
        email: "",
        username: "",
        password: ""
    });

    const signUp = async (data: SignUpData) => {
        try {
            const response = await axios.post(`${base_url}/register`, {
                email: data.email,
                username: data.username,
                password: data.password
            });
            toast.success("User Created Successfully");
            return response;
        } catch (error: any) {
            toast.error("Something went wrong");
            throw new error
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
        signUp(data).then(()=>{
            setData({
                email: "",
                username: "",
                password: ""
            })
        })
    };

    return (
        <div className="bg-white rounded-lg flex flex-col h-[550px] gap-4 items-center w-[500px]">
            <h1 className="text-[32px] my-8 font-medium">Sign Up</h1>
            <form className="flex flex-col gap-4 items-center w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1 w-[90%]">
                    <label className="text-[16px]" htmlFor="username">Username</label>
                    <input
                        value={data.username}
                        onChange={handleInputChange}
                        className="text-[14px] h-9 outline-none rounded-lg px-2 border"
                        name="username"
                        type="text"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1 w-[90%]">
                    <label className="text-[16px]" htmlFor="email">Email</label>
                    <input
                        value={data.email}
                        onChange={handleInputChange}
                        className="text-[14px] h-9 outline-none rounded-lg px-2 border"
                        name="email"
                        type="email"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1 w-[90%]">
                    <label className="text-[16px]" htmlFor="password">Password</label>
                    <input
                        value={data.password}
                        onChange={handleInputChange}
                        className="text-[14px] h-9 outline-none rounded-lg px-2 border"
                        name="password"
                        type="password"
                        required
                    />
                </div>
                <p>
                    Already have an account?{" "}
                    <span onClick={onLink} className="underline text-[#09A5D6] cursor-pointer">Sign In</span>
                </p>
                <button type="submit" className="text-white px-3 mt-5 py-1 rounded-md outline-none bg-[#09A5D6]">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUpForm;
