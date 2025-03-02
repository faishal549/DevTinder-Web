import { useDispatch } from "react-redux"
import { removeFeed } from "../utils/feedSlice"
import axios from "axios"
import { useState } from "react"
import { BASE_URL } from "../utils/constents"

const FeedCard = ({ user }) => {
    const dispatch = useDispatch()
    const [error, setError] = useState(null)
    const { _id, firstName, lastName, age, gender, skills, about, photoUrl } = user

    const getFeed = async (status, _id) => {
        setError(null)
        try {
            const res = await axios.post(`${BASE_URL}/request/send/${status}/${_id}`, {}, { withCredentials: true })
            dispatch(removeFeed(_id))
        } catch (err) {
            console.error("Error fetching connections:", err);

        }
    }

    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <>
            <div className="card bg-base-300 w-96 h-[32rem] shadow-xl">
                <figure>
                    {photoUrl && <img
                        src={photoUrl}
                        alt="userAvatar" />}
                </figure>
                <div className="card-body mt-0">
                    <h2 className="card-title">{firstName.toUpperCase() + " " + lastName.toUpperCase()}</h2>
                    {age && gender && < p > {age} {gender}</p>}
                    <p>{about}</p>
                    {skills && <p>{skills}</p>}
                    <div className="card-actions grid grid-cols-2">
                        <button className="btn btn-active btn-primary" onClick={() => getFeed("ignored", _id)}>Ignored</button>
                        <button className="btn btn-active btn-accent" onClick={() => getFeed("interested", _id)}>Interested</button>
                    </div>
                </div>
            </div >
        </>

    )
}

export default FeedCard

