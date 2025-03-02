// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../slices/authSlice';
import customerReducer from '../slices/customerSlice';
import productReducer from '../slices/productSlice';
import metaReducer from '../slices/metaSlice';
import categoryReducer from '../slices/categorySlice';
import brandReducer from '../slices/brandSlice';
import taxReducer from '../slices/taxSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    meta: metaReducer, 
    categories:categoryReducer,
    brands:brandReducer,
     tax:taxReducer
  },
});

export default store;
