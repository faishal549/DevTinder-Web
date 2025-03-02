import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addRequest, removeRequest } from "../utils/requestSlice"
import { BASE_URL } from "../utils/constents"

const Requests = () => {
    const dispatch = useDispatch()
    const request = useSelector(store => store.request)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRequest = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${BASE_URL}/user/request/received`, { withCredentials: true })

            dispatch(addRequest(res.data.data))
        } catch (error) {
            console.error("Error fetching requests:", error);
            setError("Failed to fetch requests. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    const reviewRequest = async (status, requestId) => {
        setError(null)
        try {
            const res = await axios.post(`${BASE_URL}/request/review/${status}/${requestId}`, {}, { withCredentials: true })


            dispatch(removeRequest(requestId))


        } catch (err) {
            console.error("Error reviewing request:", err);
            setError("Failed to review request. Please try again.");

        }
    }

    useEffect(() => {
        fetchRequest()
    }, [])
    if (loading) return <p className="text-center text-2xl font-bold text-gray-200">Loading requests...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;
    if (!request) return null
    if (request.length === 0) return <h1 className="text-2xl text-center text-gray-300">No request found</h1>
    return (
        <>
            {request.length !== 0 && <p className="text-2xl text-center text-orange-600  my-4">Interested users in your profile!!</p>}
            {
                request && request.map((user) => {
                    const { _id, firstName, lastName, photoUrl, age, about, skills, gender } = user.fromUserId
                    return (
                        <div key={user._id} className="flex justify-center items-center my-4">

                            <div className="bg-base-200 rounded-lg shadow-md p-3 w-full max-w-xl flex items-center">

                                <div className="w-1/3 pr-2">
                                    <img
                                        src={photoUrl}
                                        alt="User Profile"
                                        className="rounded-full w-32 h-32 object-cover mx-auto"
                                    />
                                </div>


                                <div className="w-2/3">
                                    <h2 className="text-2xl font-semibold mb-2">{firstName.toUpperCase() + " " + lastName.toUpperCase()}</h2>
                                    {age && gender && <p className="text-gray-600 mb-1">{age} {gender}</p>}
                                    <p className="text-gray-700">{about}</p>
                                </div>
                                <div>



                                    <button className="btn btn-outline btn-accent  my-2" onClick={() => reviewRequest("accepted", user._id)}>Accept</button>
                                    <button className="btn btn-outline btn-primary" onClick={() => reviewRequest("rejected", user._id)}>Reject</button>
                                </div>
                            </div>
                            {/* <p className="text-red-500">{error}</p> */}
                        </div>

                    )
                })
            }



        </>
    )
}

export default Requests 