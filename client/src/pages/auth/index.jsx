import Victory from "@/assets/victory.svg"
import Background from "@/assets/login2.png"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { apiClient } from "@/lib/api-client"
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants"
import { useNavigate } from "react-router-dom"
import { useAppStore } from "@/store"


const Auth = () => {
    const navigate = useNavigate()

    const { setUserInfo } = useAppStore()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")

    function validateSignup() {
        if (!email.length) {
            toast.error("Email is required")
            return false
        }
        if (!password.length) {
            toast.error("Password is required")
            return false
        }
        if (password !== confirmPassword) {
            toast.error("Password and confirm password should be same.")
            return false
        }
        return true
    }

    function validateLogin() {
        if (!email.length) {
            toast.error("Email is required")
            return false
        }
        if (!password.length) {
            toast.error("Password is required")
            return false
        }
        return true
    }


    const handleLogin = async () => {
        try {
            if (validateLogin()) {
                const response = await apiClient.post(LOGIN_ROUTE, { email, password }, { withCredentials: true })
                if (response.data.user.id) {
                    setUserInfo(response.data.user)
                    if (response.data.user.profileSetup) navigate("/chat")
                    else navigate("/profile")
                }
                toast.message("User Login Successfull")
            }
        } catch (error) {
            const errMsg = error?.response?.data || "Something went wrong";
            toast.error(errMsg);

        }
    }

    const handleSignup = async () => {
        try {
            if (validateSignup()) {
                const response = await apiClient.post(SIGNUP_ROUTE, { email, password }, { withCredentials: true })
                if (response.status === 201) {
                    setUserInfo(response.data.user)
                    navigate("/profile")
                }
                toast.message("User Created Successfully")
            }
        } catch (error) {
            const errMsg = error?.response?.data || "Something went wrong"
            toast.error(errMsg)
        }


    }
    return (
        <div className="h-[100vh] w-[100vw] flex items-center justify-center">
            <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
                <div className="flex flex-col gap-10 items-center justify-center">

                    <div className="flex flex-col items-center justify-center gap-7">
                        <div className="flex justify-center items-center">
                            <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
                            <img src={Victory} alt="Victory Emoji" className="h-[100px]" />
                        </div>
                        <p className="font-medium text-center">Fill in the details to get started with the best chat app!</p>
                    </div>

                    <div className="flex items-center justify-center w-full">
                        <Tabs defaultValue="login" className="w-3/4">
                            <TabsList className="bg-transparent rounded-none w-full">
                                <TabsTrigger value="login" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">Login</TabsTrigger>

                                <TabsTrigger value="signup" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">SignUp</TabsTrigger>
                            </TabsList>
                            <TabsContent value="login" className="flex flex-col gap-5 mt-10">
                                <Input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="rounded-full p-6" />
                                <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="rounded-full p-6" />
                                <Button className="rounded-full p-6" onClick={handleLogin}>Login</Button>
                            </TabsContent>

                            <TabsContent value="signup" className="flex flex-col gap-5 mt-1">
                                <Input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="rounded-full p-6" />
                                <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="rounded-full p-6" />
                                <Input placeholder="Confirm Password" type="password" onChange={(e) => setconfirmPassword(e.target.value)} value={confirmPassword} className="rounded-full p-6" />
                                <Button className="rounded-full p-6" onClick={handleSignup}>Sign Up</Button>
                            </TabsContent>
                        </Tabs>

                    </div>
                </div>

                <div className="hidden xl:flex justify-center items-center">
                    <img src={Background} alt="background login" className="h-[500px]" />
                </div>
            </div>
        </div>
    )
}

export default Auth