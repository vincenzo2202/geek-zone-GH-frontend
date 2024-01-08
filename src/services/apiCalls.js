import axios from "axios";

let route = "http://localhost:8000";

export const registerUser = async (body) => {
    return   axios.post(`${route}/api/register`, body);
}

export const logUser = async (body) => {
    return   axios.post(`${route}/api/login`, body);
}

export const getProfile = async (token) => {
    return   axios.get(`${route}/api/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const logout = async (token, body) => {    
    return   axios.post(`${route}/api/logout`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getAllFeeds = async (token) => {    
    return   axios.get(`${route}/api/feeds`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getMyFeed = async (token) => {    
    return   axios.get(`${route}/api/feeds/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getCommentsByFeedID = async (token,key) => {    
    return   axios.get(`${route}/api/comments/${key}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getAllEvents = async (token ) => {    
    return   axios.get(`${route}/api/events`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getAllUsers = async (token ) => {    
    return   axios.get(`${route}/api/allUsers`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getMyFollowers= async (token ) => {    
    return   axios.get(`${route}/api/followers`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getMyFollowings= async (token ) => {    
    return   axios.get(`${route}/api/followings`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const updateProfile = async ( body,token) => {    
    return   axios.put(`${route}/api/profile`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const createComment = async (token, body) => {    
    return   axios.post(`${route}/api/comments`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const deleteComment = async (token, id) => {    
    return   axios.delete(`${route}/api/comments/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const deleteFeed = async (token, id) => {    
    return   axios.delete(`${route}/api/deleteFeed/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const createFeed = async (token, body) => {    
    return   axios.post(`${route}/api/createFeed`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const createEvent = async (token, body) => {    
    return   axios.post(`${route}/api/events/create`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getUserProfile = async (token,id) => {
    return   axios.get(`${route}/api/user/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const follow = async (token, body) => {    
    return   axios.post(`${route}/api/followers`,{ following_id: body}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const unfollow = async (token, body) => {    
    return   axios.delete(`${route}/api/followers/${body}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getFollowersById = async (token,id) => {
    return   axios.get(`${route}/api/followers/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const likeFeed = async (token, body) => {    
    return   axios.post(`${route}/api/like`,{feed_id: body}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const unlikedFeed = async (token, body) => {    
    return   axios.delete(`${route}/api/like/${body}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getFeedsByUserId = async (token,id) => {
    return   axios.get(`${route}/api/feeds/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const deleteEvent = async (token, id) => {    
    return   axios.delete(`${route}/api/events/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
  

export const changeRoleCall = async (token, body) => {    
    return   axios.put(`${route}/api/changeRole`,body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const joinEvent = async (token, body) => {
    return   axios.post(`${route}/api/event_user`,{event_id: body}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const unjoinEvent = async (token, id) => {    
    return   axios.delete(`${route}/api/event_user/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getAllJoinedEvents = async (token,id) => {
    return   axios.get(`${route}/api/event_user/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const deleteProfileBySuperAdmin = async (token,id) => { 
    return   axios.delete(`${route}/api/deleteOneBySuper/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });  

}

export const getMyChats = async (token) => {    
    return   axios.get(`${route}/api/mychats`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const createChat = async (token, body) => {
    return   axios.post(`${route}/api/newchat`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getChatById = async (token,id) => {
    return   axios.get(`${route}/api/chats/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const sendMessage = async (token, body) => {
    return   axios.post(`${route}/api/messages`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const deleteChat = async (token, id) => {    
    return   axios.delete(`${route}/api/chats/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}