import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: {} 
    },
    reducers: { 
        profile: (state, action) => {
            state.profile = action.payload
        }
    }

});

export const { profile } = profileSlice.actions;
export const selectProfile = (state) => state.profile.profile;
export const userData = (state) => state.profile;
export default profileSlice.reducer;