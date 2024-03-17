import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    offers: []
};

const offersSlice = createSlice({
    name: "offers",
    initialState,
    reducers: {
        setOffers: (state, action) => {
            state.offers = action.payload;
        }
    }
});

export const { setOffers } = offersSlice.actions; 
export default offersSlice.reducer;
