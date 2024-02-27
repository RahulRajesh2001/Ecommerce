import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../reducers/CategorySlice.js'
import BaseProductReducer from '../reducers/BaseProductSlice.js';
import ProductSlice from '../reducers/ProductSlice.js';

export const store = configureStore({
  reducer: {
    category:categoryReducer,
    baseProducts:BaseProductReducer,
    products:ProductSlice
  },
})