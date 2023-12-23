import axios from "axios";

let route = "http://localhost:8000/api";

export const registerUser = async (body) => {
    return await axios.post(`${route}/register`, body);
}

export const logUser = async (body) => {
    return await axios.post(`${route}/login`, body);
}

export const getProfile = async (token) => {
    return await axios.get(`${route}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const logout = async (token, body) => {    
    return await axios.post(`${route}/logout`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getAllFeeds = async (token) => {    
    return await axios.get(`${route}/feeds`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getMyFeed = async (token) => {    
    return await axios.get(`${route}/feeds/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getCommentsByFeedID = async (token,key) => {    
    return await axios.get(`${route}/comments/${key}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getAllEvents = async (token ) => {    
    return await axios.get(`${route}/events`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getAllUsers = async (token ) => {    
    return await axios.get(`${route}/allUsers`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getMyFollowers= async (token ) => {    
    return await axios.get(`${route}/followers`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getMyFollowings= async (token ) => {    
    return await axios.get(`${route}/followings`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const updateProfile = async ( body,token) => {    
    return await axios.put(`${route}/profile`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const createComment = async (token, body) => {    
    return await axios.post(`${route}/comments`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const deleteComment = async (token, id) => {    
    return await axios.delete(`${route}/comments/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const deleteFeed = async (token, id) => {    
    return await axios.delete(`${route}/deleteFeed/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const createFeed = async (token, body) => {    
    return await axios.post(`${route}/createFeed`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const createEvent = async (token, body) => {    
    return await axios.post(`${route}/events/create`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getUserProfile = async (token,id) => {
    return await axios.get(`${route}/user/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const follow = async (token, body) => {    
    return await axios.post(`${route}/followers`,{ following_id: body}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const unfollow = async (token, body) => {    
    return await axios.delete(`${route}/followers/${body}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getFollowersById = async (token,id) => {
    return await axios.get(`${route}/followers/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const likeFeed = async (token, body) => {    
    return await axios.post(`${route}/like`,{feed_id: body}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const unlikedFeed = async (token, body) => {    
    return await axios.delete(`${route}/like/${body}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getFeedsByUserId = async (token,id) => {
    return await axios.get(`${route}/feeds/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const deleteEvent = async (token, id) => {    
    return await axios.delete(`${route}/events/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
  

export const changeRoleCall = async (token, body) => {    
    return await axios.put(`${route}/changeRole`,body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const joinEvent = async (token, body) => {
    return await axios.post(`${route}/event_user`,{event_id: body}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const unjoinEvent = async (token, id) => {    
    return await axios.delete(`${route}/event_user/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getAllJoinedEvents = async (token,id) => {
    return await axios.get(`${route}/event_user/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const deleteProfileBySuperAdmin = async (token,id) => { 
    return await axios.delete(`${route}/deleteOneBySuper/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });  

}

export const getMyChats = async (token) => {    
    return await axios.get(`${route}/mychats`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const createChat = async (token, body) => {
    return await axios.post(`${route}/newchat`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getChatById = async (token,id) => {
    return await axios.get(`${route}/chats/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const sendMessage = async (token, body) => {
    return await axios.post(`${route}/messages`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}