import { Navigate, Route, Routes, } from "react-router-dom"
import { Home } from "../Home/Home"
import { Register } from "../Register/Register"
import { Login } from "../Login/Login"
import { Profile } from "../Profile/Profile" 
import { Feed } from "../Feed/Feed"
import { Event } from "../Event/Event"

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
            </Routes>
        </>
    )
}