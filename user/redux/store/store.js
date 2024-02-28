import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../reducers/userSlice.js'
import emailReducer from '../reducers/otpSlice.js'
import productDetailsReducer from '../reducers/productSlice.js'


export const store=configureStore({
    reducer:{
        user:userReducer,
        email:emailReducer,
        productDetails:productDetailsReducer
    },
})