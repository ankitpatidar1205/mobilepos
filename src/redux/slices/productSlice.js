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
            formData.append(`images`, image);
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

// Update product
export const updateProduct = createAsyncThunk(
  'product/update',
  async ({ id, productData }, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.keys(productData).forEach((key) => {
        if (key === "images") {
          productData.images.forEach((image) => {
            formData.append(`images`, image);
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
  "product/delete",
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`${apiUrl}/products/${productId}`);

      if (response.status === 200 && response.data?.data?._id) {
        console.log("Product Deleted Successfully:", response.data);
        return response.data.data._id; // Return only the deleted product ID
      } else {
        return thunkAPI.rejectWithValue("Failed to delete product. Unexpected response.");
      }
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong");
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
        state.loading = false;
        if (Array.isArray(state.products)) {
          state.products.push(action.payload);
        } else {
          state.products = [action.payload];
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        state.products = state.products.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.products)) {
          state.products = state.products.filter((product) => product._id !== action.payload);
          console.log("Product Deleted Successfully!");
        } else {
          state.products = [];
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Error Deleting Product:", action.payload);
      });
  },
});

export default productSlice.reducer;
