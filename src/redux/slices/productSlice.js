import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiUrl } from '../../utils/config';
import axiosInstance from '../../utils/axiosInstance';


// Fetch products
export const fetchProducts = createAsyncThunk(
  'product/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/products`);
      console.log("Product Fetch Response:", response);
      return response.data;
    } catch (error) {
      console.error("Fetch Products Error:", error.response);
      return thunkAPI.rejectWithValue(error.response?.data || "Unauthorized access");
    }
  }
);

// Create product
export const createProduct = createAsyncThunk(
  'product/create',
  async (productData, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.keys(productData).forEach((key) => {
        if (key === "images") {
          productData.images.forEach((image) => {
            formData.append(`images`, image); // Ensure images are correctly formatted
          });
        } else {
          formData.append(key, productData[key]);
        }
      });

      const response = await axiosInstance.post(`${apiUrl}/products`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log("Response from API:", response);
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || "Unknown error occurred");
    }
  }
);

export const updateProduct = createAsyncThunk(
  'product/update',
  async ({ id, productData }, thunkAPI) => {
    console.log("show formdata ", productData)
    try {
      const formData = new FormData();
      Object.keys(productData).forEach((key) => {
        if (key === "images") {
          productData.images.forEach((image) => {
            formData.append(`images`, image); // Ensure images are correctly formatted
          });
        } else {
          formData.append(key, productData[key]);
        }
      });
      const response = await axiosInstance.patch(`${apiUrl}/products/${id}`, formData);
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      return thunkAPI.rejectWithValue(error.response?.data || "Update failed");
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  'product/delete',
  async (productId, thunkAPI) => {
    try {
    await axiosInstance.delete(`${apiUrl}/products/${productId}`);
  //  console.log("**********",res)
      return productId; 
    } catch (error) {
      console.error("error:",error)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        if (Array.isArray(state.products)) {
          state.products.push(action.payload);  // Safe to push
        } else {
          state.products = [action.payload];  // Fix if products is not an array
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
