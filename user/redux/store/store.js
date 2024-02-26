import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../reducers/userSlice.js'
import emailReducer from '../reducers/otpSlice.js'


export const store=configureStore({
    reducer:{
        user:userReducer,
        email:emailReducer
    },
})