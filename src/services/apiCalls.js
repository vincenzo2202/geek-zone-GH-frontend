import axios from "axios";

export const registerUser = async (body) => {
    return await axios.post(`http://localhost:8000/api/register`, body);
}

export const logUser = async (body) => {
    return await axios.post(`http://localhost:8000/api/login`, body);
}