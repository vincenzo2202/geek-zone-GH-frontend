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

export const getCommentsByFeedID = async (token,key) => {    
    return await axios.get(`http://localhost:8000/api/comments/${key}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}