import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUrl } from "../../utils/config";
import axiosInstance from "../../utils/axiosInstance";

export const fetchTaxes = createAsyncThunk("taxes/fetch", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/taxes`);
    console.log("Tax Fetch Response:", response.data.data);
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Error fetching tax");
  }
});

export const createTax = createAsyncThunk("taxes/create", async (taxData, thunkAPI) => {
  try {
    const response = await axiosInstance.post(`${apiUrl}/taxes`, taxData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Error creating tax");
  }
});

export const updateTax = createAsyncThunk("taxes/update", async ({ id, taxData }, thunkAPI) => {
  try {
    const response = await axiosInstance.put(`${apiUrl}/taxes/${id}`, taxData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Error updating tax");
  }
});

export const deleteTax = createAsyncThunk("taxes/delete", async (id, thunkAPI) => {
  try {
    const response = await axiosInstance.delete(`${apiUrl}/taxes/${id}`);
    return { _id: id }; // Return the ID of the deleted tax
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Error deleting tax");
  }
});

const initialState = {
  taxes: [],
  loading: false,
  error: null,
};

const taxSlice = createSlice({
  name: "tax",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaxes.fulfilled, (state, action) => {
        state.loading = false;
        state.taxes = action.payload;
      })
      .addCase(fetchTaxes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTaxes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTax.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTax.fulfilled, (state, action) => {
        state.loading = false;
        state.taxes.push(action.payload);
      })
      .addCase(createTax.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTax.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTax.fulfilled, (state, action) => {
        state.loading = false;
        state.taxes = state.taxes.filter((tax) => tax._id !== action.payload._id);
      })
      .addCase(deleteTax.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTax.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTax.fulfilled, (state, action) => {
        state.loading = false;
        state.taxes = state.taxes.map((tax) => (tax._id === action.payload._id ? action.payload : tax));
      })
      .addCase(updateTax.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taxSlice.reducer;