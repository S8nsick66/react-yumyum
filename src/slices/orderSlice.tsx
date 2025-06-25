import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "../services/data";
import type { CartItem, OrderState } from "../types/types";

export const getOrderItems = (cart: CartItem[]): number[]  => {
    const orderItems: number[] = [];
    cart.forEach(cartItem => {
        for (let i = 0; i < cartItem.quantity; i++) {
            orderItems.push(cartItem.id);
        }
    });
    return orderItems;
};

export const sendOrder = createAsyncThunk(
    'order/send',
    async (cart: CartItem[]) => {
        return await data.sendOrder(getOrderItems(cart));
    }
);

export const fetchOrder = createAsyncThunk(
    'order/fetch',
    async (orderId: string) => {
        return await data.getOrder(orderId);
    }
);

export const getTimeRemaining = (eta: string) => {
    const now = Date.now(); // Current time in UTC
    const etaDate = new Date(eta).getTime(); // eta is in UTC
    return Math.ceil((etaDate - now) / 60000);
};

const initialState: OrderState = {
    order: null,
    isLoading: false,
    isError: false
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(sendOrder.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(sendOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                // Save order in state so we can use it on CartPage to redirect to /order/:id
                state.order = action.payload;
            })
            .addCase(sendOrder.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.order = null;
            })

            .addCase(fetchOrder.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.order = action.payload;
            })
            .addCase(fetchOrder.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.order = null;
            });
    },
    reducers: {
    },
});

export const orderReducer = orderSlice.reducer;
