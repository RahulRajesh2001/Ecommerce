import {createSlice} from '@reduxjs/toolkit'

const initialState={
    productDetails:null,
    featuredProducts:[]
}

export const productDetailsSlice=createSlice({
    name:"productDetails",
    initialState,
    reducers:{
        setProductDetails:(state,action)=>{
            state.productDetails=action.payload
        },
        setFeaturedProduct:(state,action)=>{
            state.featuredProducts=action.payload
        }
    }
})

export const {setProductDetails,setFeaturedProduct}=productDetailsSlice.actions
export default productDetailsSlice.reducer;