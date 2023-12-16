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

export const updateProfile = async ( body,token) => {    
    return await axios.put(`http://localhost:8000/api/profile`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const createComment = async (token, body) => {    
    return await axios.post(`http://localhost:8000/api/comments`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const deleteComment = async (token, id) => {    
    return await axios.delete(`http://localhost:8000/api/comments/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const deleteFeed = async (token, id) => {    
    return await axios.delete(`http://localhost:8000/api/deleteFeed/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const createFeed = async (token, body) => {    
    return await axios.post(`http://localhost:8000/api/createFeed`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const createEvent = async (token, body) => {    
    return await axios.post(`http://localhost:8000/api/events/create`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getUserProfile = async (token,id) => {
    return await axios.get(`http://localhost:8000/api/user/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const follow = async (token, body) => {    
    return await axios.post(`http://localhost:8000/api/followers`,{ following_id: body}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const unfollow = async (token, body) => {    
    return await axios.delete(`http://localhost:8000/api/followers/${body}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getFollowersById = async (token,id) => {
    return await axios.get(`http://localhost:8000/api/followers/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const likeFeed = async (token, body) => {    
    return await axios.post(`http://localhost:8000/api/like`,{feed_id: body}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const unlikedFeed = async (token, body) => {    
    return await axios.delete(`http://localhost:8000/api/like/${body}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getFeedsByUserId = async (token,id) => {
    return await axios.get(`http://localhost:8000/api/feeds/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
 
 
 