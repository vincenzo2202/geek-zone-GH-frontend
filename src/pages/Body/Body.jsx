import { Navigate, Route, Routes, } from "react-router-dom"
import { Home } from "../Home/Home"
import { Register } from "../Register/Register"
import { Login } from "../Login/Login"
import { Profile } from "../Profile/Profile" 
import { Feed } from "../Feed/Feed"
import { Event } from "../Event/Event"
import { Users } from "../GetAllUser/GetAllUser"
import { Follow } from "../Follow/Follow"
import { UpdateProfile } from "../UpdateProfile/UpdateProfile"
import { UserProfile } from "../UserProfile/UserProfile"

export const Body = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/event" element={<Event />} />
                <Route path="/users" element={<Users />} />
                <Route path="/follow" element={<Follow />} />
                <Route path="/updateProfile" element={<UpdateProfile />} />
                <Route path="/userProfile" element={<UserProfile />} />
            </Routes>
        </>
    )
}