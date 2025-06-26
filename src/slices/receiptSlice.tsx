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
    name: "receipt",
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
                if (state.receipt) {
                    data.saveReceipt(state.receipt);
                }
            })
            .addCase(fetchReceipt.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.receipt = null;
            })
    },
    reducers: {
        clearReceiptState: (state) => {
            // Resets the state to initial values
            state.receipt = null;
            state.isLoading = false;
            state.isError = false;
        }
    },
});

export const { clearReceiptState } = receiptSlice.actions;

export const receiptReducer = receiptSlice.reducer;
