import { useSelector } from "react-redux"
import EditProfile from "./EditProfile"


const Profile = () => {
    const user = useSelector((store) => store.user)

    return (
        <>
            <div className="grid md:flex justify-around mt-2">
                <EditProfile user={user} />
            </div>


        </>
    )
}

export default Profile