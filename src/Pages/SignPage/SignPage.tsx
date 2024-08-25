import { useState } from "react"
import SignUpForm from "../../Components/SignUpForm/SignUpForm"
import SignInForm from "../../Components/SignInForm/SigninForm"
import "./signPage.css"
function SignPage() {
    const [isSignIn, setIsSignIn] = useState<boolean>(true)


    return (
        <div className="bg-img h-screen w-screen flex justify-center items-center">
            {isSignIn ?
                <SignUpForm onLink={() => { setIsSignIn(prev => !prev) }} /> :
                <SignInForm onLink={() => { setIsSignIn(prev => !prev) }} />}
        </div>
    )
}

export default SignPage