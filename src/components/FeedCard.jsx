import { useDispatch } from "react-redux"
import { removeFeed } from "../utils/feedSlice"
import axios from "axios"

const FeedCard = ({ user }) => {
    const dispatch = useDispatch()
    const { _id, firstName, lastName, age, gender, skills, about, photoUrl } = user

    const getFeed = async (status, _id) => {
        try {
            const res = await axios.post("http://localhost:7777/request/send/" + status + "/" + _id, {}, { withCredentials: true })
            dispatch(removeFeed(_id))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="card bg-base-300 w-96 h-[32rem] shadow-xl">
                <figure>
                    <img
                        src={photoUrl}
                        alt="userAvatar" />
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

