import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    Products: [],
    varients:[]
};



const ProductsSlice = createSlice({
    name: "Products",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.Products = action.payload;
        },
        setVarients:(state,action)=>{
            state.varients=action.payload
        }
    }
});

export const {setProducts,setVarients } = ProductsSlice.actions; 
export default ProductsSlice.reducer;
