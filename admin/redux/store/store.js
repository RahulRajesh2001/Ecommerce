import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../reducers/CategorySlice.js'

export const store = configureStore({
  reducer: {
    category:categoryReducer
  },
})