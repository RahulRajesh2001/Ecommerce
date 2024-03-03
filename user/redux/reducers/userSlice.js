import {createSlice} from '@reduxjs/toolkit'

const initialState={
    user:{},
    isAuthenticated:false
}

export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
            state.token=action.payload.token
            state.isAuthenticated=true

        }
    }
})

export const {setUser}=userSlice.actions
export default userSlice.reducer;