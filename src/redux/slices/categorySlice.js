import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../utils/config";
import axiosInstance from "../../utils/axiosInstance";

// Fetch categories from API
export const fetchCategories = createAsyncThunk(
  "category/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/category`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error fetching categories");
    }
  }
);

// Create a new category
export const createCategory = createAsyncThunk(
  "category/create",
  async (categoryData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`${apiUrl}/category`, categoryData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error creating category");
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (categoryId, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`${apiUrl}/category/${categoryId}`);
      console.log(response.data.data)
      return response.data.data._id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error deleting category");
    }
  }
);


// Update a category
export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ categoryId, updatedData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`${apiUrl}/category/${categoryId}`, updatedData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error updating category");
    }
  }
);

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create category
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(cat => cat._id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.map(cat => 
          cat.id === action.payload.id ? action.payload : cat
        );
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
