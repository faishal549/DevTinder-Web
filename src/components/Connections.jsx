import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addConnection } from "../utils/connectionSlice"

const Connections = () => {
    const dispatch = useDispatch()
    const connections = useSelector(store => store.connection)

    const fetchConnection = async () => {
        try {
            const res = await axios.get("http://localhost:7777/user/connections", { withCredentials: true })

            dispatch(addConnection(res.data.data))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchConnection()
    }, [])
    if (!connections) return
    if (connections.length === 0) return <h1 className="text-2xl text-center text-gray-300">No connections found</h1>
    return (
        <>
            <p className="text-2xl text-center text-orange-600 font-bold my-4 underline underline-offset-1">Your Connections</p>
            {
                connections && connections.map((user) => {
                    const { firstName, lastName, photoUrl, age, about, skills, gender } = user
                    return (
                        <div key={user._id} className="flex justify-center items-center my-4">

                            <div className="bg-base-200 rounded-lg shadow-md p-3 w-1/2 max-w-xl flex items-center">

                                <div className="w-1/3 pr-2">
                                    <img
                                        src={photoUrl}
                                        alt="User Profile"
                                        className="rounded-full w-32 h-32 object-cover mx-auto"
                                    />
                                </div>


                                <div className="w-2/3">
                                    <h2 className="text-xl font-semibold mb-2">{firstName.toUpperCase() + " " + lastName.toUpperCase()}</h2>
                                    {age && gender && <p className="text-gray-600 mb-1">{age} {gender}</p>}
                                    <p className="text-gray-700">{about}</p>
                                </div>
                            </div>
                        </div>

                    )
                })
            }



        </>
    )
}

export default Connections 