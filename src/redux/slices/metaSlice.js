import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { apiUrl } from "../../utils/config";

// API Endpoints
const CATEGORY_API = `${apiUrl}/category`;
const BRAND_API = `${apiUrl}/brand`;
const MODEL_API = `${apiUrl}/model`; // updated endpoint

/* =================================
   ✅ FETCH ALL METADATA (CATEGORIES, BRANDS, MODELS)
================================= */
export const fetchMetaData = createAsyncThunk("meta/fetchMetaData", async () => {
  const [categoriesRes, brandsRes, modelsRes] = await Promise.all([
    axiosInstance.get(CATEGORY_API),
    axiosInstance.get(BRAND_API),
    axiosInstance.get(MODEL_API),
  ]);
  return {
    categories: categoriesRes.data.data,
    brands: brandsRes.data.data,
    models: modelsRes.data.data,
  };
});

/* =================================
   ✅ ADD NEW CATEGORY, BRAND, MODEL
================================= */
export const addCategory = createAsyncThunk("meta/addCategory", async (category) => {
  const response = await axiosInstance.post(CATEGORY_API, category);
  return response.data;
});

export const addBrand = createAsyncThunk("meta/addBrand", async (brand) => {
  // Expecting brand to contain { name, categoryId }
  const response = await axiosInstance.post(BRAND_API, brand);
  return response.data;
});

export const addModel = createAsyncThunk("meta/addModel", async (model) => {
  // model contains: { name, categoryId, brandId }
  const response = await axiosInstance.post(MODEL_API, model);
  return response.data;
});

/* =================================
   ✅ UPDATE CATEGORY, BRAND, MODEL
================================= */
export const updateCategory = createAsyncThunk("meta/updateCategory", async ({ id, name }) => {
  const response = await axiosInstance.put(`${CATEGORY_API}/${id}`, { name });
  return response.data;
});

export const updateBrand = createAsyncThunk("meta/updateBrand", async ({ id, name, categoryId }) => {
  const response = await axiosInstance.put(`${BRAND_API}/${id}`, { name, categoryId });
  return response.data;
});

export const updateModel = createAsyncThunk("meta/updateModel", async ({ id, name, categoryId, brandId }) => {
  const response = await axiosInstance.put(`${MODEL_API}/${id}`, { name, categoryId, brandId });
  return response.data;
});

/* =================================
   ✅ DELETE CATEGORY, BRAND, MODEL
================================= */
export const deleteCategory = createAsyncThunk("meta/deleteCategory", async (id) => {
  await axiosInstance.delete(`${CATEGORY_API}/${id}`);
  return id;
});

export const deleteBrand = createAsyncThunk("meta/deleteBrand", async (id) => {
  await axiosInstance.delete(`${BRAND_API}/${id}`);
  return id;
});

export const deleteModel = createAsyncThunk("meta/deleteModel", async (id) => {
  await axiosInstance.delete(`${MODEL_API}/${id}`);
  return id;
});

/* =================================
   ✅ REDUX SLICE
================================= */
const metaSlice = createSlice({
  name: "meta",
  initialState: {
    categories: [],
    brands: [],
    models: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Data
      .addCase(fetchMetaData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMetaData.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
        state.brands = action.payload.brands;
        state.models = action.payload.models;
      })
      .addCase(fetchMetaData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add Category
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      // Add Brand
      .addCase(addBrand.fulfilled, (state, action) => {
        state.brands.push(action.payload);
      })
      // Add Model
      .addCase(addModel.fulfilled, (state, action) => {
        state.models.push(action.payload);
      })
      // Update Category
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex((cat) => cat.id === action.payload.id);
        if (index !== -1) state.categories[index] = action.payload;
      })
      // Update Brand
      .addCase(updateBrand.fulfilled, (state, action) => {
        const index = state.brands.findIndex((brand) => brand.id === action.payload.id);
        if (index !== -1) state.brands[index] = action.payload;
      })
      // Update Model
      .addCase(updateModel.fulfilled, (state, action) => {
        const index = state.models.findIndex((model) => model.id === action.payload.id);
        if (index !== -1) state.models[index] = action.payload;
      })
      // Delete Category
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((cat) => cat.id !== action.payload);
      })
      // Delete Brand
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.brands = state.brands.filter((brand) => brand.id !== action.payload);
      })
      // Delete Model
      .addCase(deleteModel.fulfilled, (state, action) => {
        state.models = state.models.filter((model) => model.id !== action.payload);
      });
  },
});

export default metaSlice.reducer;
