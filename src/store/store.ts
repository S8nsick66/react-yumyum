import { configureStore } from "@reduxjs/toolkit";
import { menuReducer } from "../slices/menuSlice";
import { cartReducer } from "../slices/cartSlice";
import { orderReducer } from "../slices/orderSlice";
import { receiptReducer } from "../slices/receiptSlice";

export const store = configureStore({
    reducer: {
        menu: menuReducer,
        cart: cartReducer,
        order: orderReducer,
        receipt: receiptReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
