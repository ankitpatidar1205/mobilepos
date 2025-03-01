import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiUrl } from '../../utils/config';
import axiosInstance from '../../utils/axiosInstance';

// POST request to register a customer
export const registerCustomer = createAsyncThunk(
    'customer/register',
    async (customerData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`${apiUrl}/users`, customerData);
            return response.data;
        } catch (error) {
            console.log("error", error)
            return rejectWithValue(error.response?.data?.message || 'Something went wrong!');
        }
    }
);


// Fetch all customers
export const getCustomers = createAsyncThunk('customer/getCustomers', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${apiUrl}/users`);
        // console.log("customer", response)
        return response.data.data; // Ensure this matches API response format
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch customers');
    }
});

// Fetch customer details
export const getCustomerDetails = createAsyncThunk('customer/getCustomerDetails', async (customerId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${apiUrl}/${customerId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch customer details');
    }
});

// Delete a customer
export const deleteCustomer = createAsyncThunk('customer/deleteCustomer', async (customerId, { rejectWithValue }) => {
    try {
        await axiosInstance.delete(`${apiUrl}/${customerId}`);
        return customerId;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to delete customer');
    }
});

const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        customers: [],
        selectedCustomer: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearCustomerDetails: (state) => {
            state.selectedCustomer = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCustomers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCustomers.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = action.payload;
            })
            .addCase(getCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch customer details
            .addCase(getCustomerDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCustomerDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCustomer = action.payload;
            })
            .addCase(getCustomerDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete customer
            .addCase(deleteCustomer.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = state.customers.filter((customer) => customer.id !== action.payload);
            })
            .addCase(deleteCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearMessages } = customerSlice.actions;
export default customerSlice.reducer;
