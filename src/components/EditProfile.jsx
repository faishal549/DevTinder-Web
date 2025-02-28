import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeedCard from "./FeedCard";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
    const userFromStore = useSelector((state) => state.user);

    const [firstName, setFirstName] = useState(userFromStore?.firstName || "");
    const [lastName, setLastName] = useState(userFromStore?.lastName || "");
    const [age, setAge] = useState(userFromStore?.age || "");
    const [gender, setGender] = useState(userFromStore?.gender || "");
    const [photoUrl, setPhotoUrl] = useState(userFromStore?.photoUrl || "");
    const [skills, setSkills] = useState(userFromStore?.skills || "");
    const [about, setAbout] = useState(userFromStore?.about || "");
    const [showToast, setShowToast] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();


    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setAge(user.age);
            setGender(user.gender);
            setPhotoUrl(user.photoUrl);
            setSkills(user.skills);
            setAbout(user.about);
        }
    }, [user]);

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const updateProfile = async () => {
        setError("")
        try {

            const res = await axios.patch("http://localhost:7777/profile/edit", {
                firstName, lastName, age, gender, about, skills, photoUrl
            }, { withCredentials: true })


            dispatch(addUser(res.data.UpdatedDetails))
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 3000)
        } catch (error) {
            console.log(error)
            setError(error)
        }

    }
    return (

        <>

            <div className="max-w-xl   p-8 rounded-lg shadow-lg bg-base-200">
                <h2 className="text-3xl font-semibold mb-6 text-center text-gray-300">Your Profile</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">First Name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">Age</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">Gender</label>
                        <select
                            value={gender}
                            onChange={handleGenderChange}
                            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-900 focus:border-indigo-300"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300">Photo URL</label>
                        <input
                            type="url"
                            value={photoUrl}
                            onChange={(e) => setPhotoUrl(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300">Skills</label>
                        <input
                            type="text"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300">About</label>
                        <textarea
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                            rows="4"
                        />
                    </div>
                    <p className="text-red-500">{error}</p>
                    <div className="card-actions">

                        <button className="btn btn-primary" onClick={updateProfile}>Save Profile</button>
                    </div>
                </div>
            </div>

            <div>
                <p className="text-orange-300 p-2">Preview</p>
                <FeedCard user={{ firstName, lastName, photoUrl, age, about, skills, gender }} />

            </div>

            {showToast && <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile saved successfully.</span>
                </div>
            </div>}

        </>

    )

}

export default EditProfile