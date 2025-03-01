// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../slices/authSlice';
import customerReducer from '../slices/customerSlice';
import productReducer from '../slices/productSlice';
import metaReducer from '../slices/metaSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    meta: metaReducer, 
    // Add other slices as needed
  },
});

export default store;
