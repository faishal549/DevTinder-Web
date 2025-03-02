import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import validator from '../utils/validator';
import { BASE_URL } from '../utils/constents';
const Login = () => {

    const [emailId, setEmailId] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/login`, {
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

    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            const message = validator(firstName, lastName, emailId, password)
            setErrorMessage(message)
            if (message) return

            const res = await axios.post(`${BASE_URL}/signup`, { firstName, lastName, emailId, password }, { withCredentials: true })
            dispatch(addUser(res.data.data))
            navigate("/profile")


        } catch (error) {
            console.log(error)
            setError()
        }
    }
    //** error part pending here */
    return (
        <>
            <div className="flex items-center justify-center mt-10 bg-base-100">
                <div className="flex flex-col px-10 ">
                    <h1 className="text-center text-4xl font-bold text-orange-500 underline underline-offset-2 ">Find your dev tribe on DevTinder.</h1>
                    <p className="py-2 text-xl text-orange-300">Connect. Code. Collaborate.</p>

                </div>
                <div className="bg-base-300 p-8 rounded-lg shadow-md w-96">
                    <h2 className="text-2xl font-semibold mb-6 text-center">{isLogin ? "Login" : "Signup"}</h2>
                    <form onSubmit={isLogin ? handleSubmit : handleSignup}>
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

                        <p className="text-red-400">{errorMessage}</p>
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