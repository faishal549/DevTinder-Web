import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
const Login = () => {

    const [emailId, setEmailId] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:7777/login", {
                emailId,
                password,

            }, { withCredentials: true })

            dispatch(addUser(res.data.user))
            if (res.status === 200) {
                return navigate("/feed")
            }

        } catch (error) {

            setError(error?.response?.data?.message || "something went wrong")
        }


    }

    //** error part pending here */
    return (
        <>
            <div className="flex items-center justify-center mt-10 bg-base-100">
                <div className="bg-base-300 p-8 rounded-lg shadow-md w-96">
                    <h2 className="text-2xl font-semibold mb-6 text-center">{isLogin ? "Login" : "Signup"}</h2>
                    <form onSubmit={handleSubmit}>
                        {!isLogin ? (<> <div className="mb-2">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="firstName">
                                Firstname
                            </label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                                id="firstName"
                                type="text"
                                placeholder="Firstname"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                autoComplete='none'
                            />
                        </div>

                            <div className="mb-2">
                                <label className="block text-white text-sm font-bold mb-2" htmlFor="Lastname">
                                    Lastname
                                </label>
                                <input
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                                    id="lastName"
                                    type="text"
                                    placeholder="Lastname"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    autoComplete='none'
                                />
                            </div>
                        </>) : ""}
                        <div className="mb-2">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={emailId}
                                onChange={(e) => setEmailId(e.target.value)}
                                required
                                autoComplete='none'
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete='none'
                            />
                        </div>


                        <p className="text-red-400">{error}</p>
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                {isLogin ? "Login" : "Signup"}
                            </button>
                        </div>
                        <p className="text-center text-orange-400 underline underline-offset-2 cursor-pointer mt-4 " onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? "Don't have a account ? Signup here" : "Existing User? Login now!"}</p>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Login