import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../pages/userSlice'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist' 
import { thunk } from 'redux-thunk'
import profileSlice from '../pages/profileSlice'

const reducers = combineReducers({
    user: userSlice, 
    profile: profileSlice
})

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['register2']
}

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(thunk),
});