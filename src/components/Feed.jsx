import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice"
import FeedCard from "./FeedCard"
import { BASE_URL } from "../utils/constents"

const Feed = () => {
    const dispatch = useDispatch()
    const feed = useSelector(store => store.feed)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const getFeed = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await axios.get(`${BASE_URL}/feed`, { withCredentials: true })


            dispatch(addFeed(res.data))
        } catch (error) {
            console.error("Error fetching connections:", error);
            setError("Failed to fetch connections. Please try again later.");
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getFeed()
    }, [])
    if (error) return <p className="text-red-500 text-center">{error}</p>;
    if (loading) return <h1 className="text-2xl text-center text-gray-300">Loading****</h1>
    if (feed.length === 0) return <h1 className="text-2xl text-center text-gray-300">No feed exists</h1>
    return (
        <>
            {feed &&
                <div className="flex justify-center mt-3">
                    <FeedCard user={feed[0]} />
                </div>
            }
        </>
    )
}


export default Feed