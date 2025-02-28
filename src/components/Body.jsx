import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchUser = async () => {
        try {
            const res = await axios.get("http://localhost:7777/profile", { withCredentials: true })


            dispatch(addUser(res?.data?.data))
        } catch (error) {
            console.log(error)
            navigate("/login")
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])
    return (
        <>
            <Navbar />
            <Outlet />

        </>
    )
}

export default Body;