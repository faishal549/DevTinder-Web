import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice"
import FeedCard from "./FeedCard"

const Feed = () => {
    const dispatch = useDispatch()
    const feed = useSelector(store => store.feed)

    const getFeed = async () => {
        if (feed) return
        try {
            const res = await axios.get("http://localhost:7777/feed", { withCredentials: true })


            dispatch(addFeed(res.data))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getFeed()
    }, [])
    if (!feed) return
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