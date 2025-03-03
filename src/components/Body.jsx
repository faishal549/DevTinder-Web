import { Link, Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constents";

const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const fetchUser = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/profile`, { withCredentials: true })


            dispatch(addUser(res?.data?.data))
        } catch (error) {
            console.error(error)
            navigate("/")
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])
    return (
        <>
            <div>
                <Navbar />
                <Outlet />
            </div>


        </>
    )
}

export default Body;