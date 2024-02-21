import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../reducers/userSlice.js'


export const store=configureStore({
    reducer:{
        user:userReducer
    },
})