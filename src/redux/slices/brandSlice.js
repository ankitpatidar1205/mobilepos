import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../utils/config";
import axiosInstance from "../../utils/axiosInstance";

// Fetch brands
export const fetchBrands = createAsyncThunk(
  "brand/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/brand`);
      console.log(response.data.data)
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error fetching brands");
    }
  }
);

// Create a new brand
export const createBrand = createAsyncThunk(
  "brand/create",
  async (brandData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`${apiUrl}/brand`, brandData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error creating brand");
    }
  }
);

// Delete a brand
export const deleteBrand = createAsyncThunk(
  "brand/delete",
  async (brandId, thunkAPI) => {
    try {
      await axiosInstance.delete(`${apiUrl}/brand/${brandId}`);
      return brandId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error deleting brand");
    }
  }
);

const initialState = {
  brands: [],
  loading: false,
  error: null,
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brands.push(action.payload);
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = state.brands.filter((brand) => brand._id !== action.payload);
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default brandSlice.reducer;
