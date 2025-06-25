import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "../services/data";
import type { ReceiptState } from "../types/types";

export const fetchReceipt = createAsyncThunk(
    'receipt/fetch',
    async (orderId: string) => {
        return await data.getReceipt(orderId);
    }
);

const initialState: ReceiptState = {
    receipt: null,
    isLoading: false,
    isError: false
};

export const receiptSlice = createSlice({
    name: "order",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchReceipt.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchReceipt.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                // Save order in state so we can use it on CartPage to redirect to /order/:id
                state.receipt = action.payload;
            })
            .addCase(fetchReceipt.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.receipt = null;
            })
    },
    reducers: {
    },
});

export const receiptReducer = receiptSlice.reducer;
