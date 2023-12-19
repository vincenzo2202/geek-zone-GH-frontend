import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chat: {} 
    },
    reducers: { 
        chat: (state, action) => {
            state.chat = action.payload
        }
    }

});

export const { chat } = chatSlice.actions;
export const selectChat = (state) => state.chat.chat;
export const userData = (state) => state.chat;
export default chatSlice.reducer;