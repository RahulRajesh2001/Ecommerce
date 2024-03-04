import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    Products: [],
    varients:[],
    productVarientId:''
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
        },
        setProductVarientId:(state,action)=>{
            state.productVarientId=action.payload
        }
    }
});

export const {setProducts,setVarients,setProductVarientId } = ProductsSlice.actions; 
export default ProductsSlice.reducer;
