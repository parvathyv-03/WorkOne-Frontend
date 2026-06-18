// import "@fontsource/poppins";
import loginImage from "../assets/login-img.jpg";
import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";


export default function Login(){

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const[loading,setLoading] = useState(false)

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);

        try{
            const response = await axios.post(
                "/api/login/",
                {
                    username,
                    password,
                }
            );
            console.log(response.data);

            const role = response.data.role;

            // save token
            localStorage.setItem(
                "accessToken",
                response.data.access
            );

            localStorage.setItem(
                "username",
                response.data.username
            );

            localStorage.setItem("role",role);

            if(role === "employee"){
                // navigate to employee dashboard
                navigate("/employee/dashboard");
            }
            else if(role === "hr"){
                navigate("/hr/dashboard");
            }
            
        }catch(error){
                console.log(error.response?.data || error.message);
        }finally{
            setLoading(false);
        }
    };

    

    return(
        <div className="flex h-screen w-full">
            {/* left image */}
            <div className="relative hidden md:flex w-1/2">
                <img 
                    src={loginImage}
                    alt="office"
                    className="h-full w-full object-cover"
                />

                {/* dark overlay */}

                <div className="absolute inset-0 bg-black/40"></div>

                {/* text-content */}

                <div className="absolute bottom-16 left-12 z-10 max-w-lg text-white">
                    <h1 className="mb-4 text-5xl font-bold leading-tight">
                        Simplify HR.
                    </h1>
                    <h1 className="mb-4 text-5xl font-bold leading-tight">
                       Empower People.
                    </h1>

                    <p className="text-lg leading-8 text-gray-200">
                        WorkOne helps you manage your work smarter,
                        faster and better.
                    </p>
                </div>
            </div>

            {/* right side login */}

            <div className="flex w-full md:w-1/2 items-center justify-center bg-white px-8">
                <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl">
                    <h1 className="mb-2 text-center text-6xl font-extrabold text-gray-900">
                        WorkOne
                    </h1>

                    <p className="mb-10 text-center text-lg font-bold text-gray-500">
                        Welcome Back! Please login to your account.
                    </p>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* username */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Username
                            </label>

                            <input
                                type="text"
                                required
                                placeholder="Enter your Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-blue-600"
                            />
                        </div>
                            {/* Password */}

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    required
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-blue-600"
                                />
                            </div>

                            {/* button */}

                            {/* <button
                                type="submit"
                                className="w-full rounded-full border-none bg-blue-600 py-4 text-white font-semibold outline-none transition duration-300 hover:bg-blue-700"    
                            >
                                Login
                            </button> */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full !rounded-full bg-blue-600 py-4 text-white font-semibold"
                            >
                                {loading ? "Logging in ..." : "Login"}
                            </button>
                                                    
                    </form>
                </div>
            </div>
        </div>
    );
}