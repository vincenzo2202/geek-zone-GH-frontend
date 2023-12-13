import axios from "axios";

export const registerUser = async (body) => {
    return await axios.post(`http://localhost:8000/api/register`, body);
}

export const logUser = async (body) => {
    return await axios.post(`http://localhost:8000/api/login`, body);
}

export const getProfile = async (token) => {
    return await axios.get(`http://localhost:8000/api/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const logout = async (token, body) => {    
    return await axios.post(`http://localhost:8000/api/logout`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getAllFeeds = async (token) => {    
    return await axios.get(`http://localhost:8000/api/feeds`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getMyFeed = async (token) => {    
    return await axios.get(`http://localhost:8000/api/feeds/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getCommentsByFeedID = async (token,key) => {    
    return await axios.get(`http://localhost:8000/api/comments/${key}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getAllEvents = async (token ) => {    
    return await axios.get(`http://localhost:8000/api/events`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getAllUsers = async (token ) => {    
    return await axios.get(`http://localhost:8000/api/allUsers`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getMyFollowers= async (token ) => {    
    return await axios.get(`http://localhost:8000/api/followers`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getMyFollowings= async (token ) => {    
    return await axios.get(`http://localhost:8000/api/followings`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

