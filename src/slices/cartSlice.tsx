import { createSelector, createSlice } from "@reduxjs/toolkit";
import { data } from "../services/data";
import type { CartItem, CartState, CartExpanded } from "../types/types";
import { MENU_TYPES } from "../types/types";
import type { RootState } from "../store/store";

const initialState: CartState = data.getCart() ?? {
    cart: [],
    totalQuantity: 0,
    totalCost: 0,
};

export const isInCart = (cart: CartItem[], itemId: number): boolean => {
    return cart.findIndex(item => item.id === itemId) > -1;
};

export const quantityInCart = (cart: CartItem[], itemId: number): number => {
    const existingIndex = cart.findIndex(item => item.id === itemId);
    if (existingIndex > -1) {
        return cart[existingIndex].quantity;
    }
    return 0;
};

export const getCartExpanded = createSelector(
    [
        (state: RootState) => state.cart.cart,
        (state: RootState) => state.menu
    ],
    (cart, menu) => {
        if (menu.isLoading || menu.menu.length === 0) return [];

        // To sort the cart items by type, we create an object with keys for each menu type
        const cartExpanded = Object.fromEntries(
            MENU_TYPES.map(type => [type, []])
        ) as unknown as CartExpanded;

        // Take each item in the cart and find its corresponding menu item.
        // Since the cart only contains item IDs and quantities,
        // but we need the show name, price, and total cost,
        // on the cart page.
        // We also group them by type here.
        cart.forEach(cartItem => {
            const menuItem = menu.menu.find(item => item.id === cartItem.id);
            if (menuItem) {
                cartExpanded[menuItem.type].push({
                    ...cartItem,
                    name: menuItem.name,
                    price: menuItem.price ?? 0,
                    total: (menuItem.price ?? 0) * cartItem.quantity
                });
            }
        });

        // flatMap combines the arrays from each type into a single array
        // in the order they have in MENU_TYPES
        // This ensures the order of items in the cart matches the menu types
        // because it's nice with 1. foods 2. dips 3. drinks and not random
        return MENU_TYPES.flatMap(category => cartExpanded[category]);
    }
);

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            console.log('Adding to cart:', action.payload);
            const existingIndex = state.cart.findIndex(item => item.id === action.payload.id);
            if (existingIndex > -1) {
                state.cart[existingIndex].quantity += 1;
            } else {
                state.cart.push({
                    id: action.payload.id,
                    quantity: 1,
                });
            }
            state.totalQuantity++;
            state.totalCost += action.payload.price;
        },
        removeFromCart: (state, action) => {
            const existingIndex = state.cart.findIndex(item => item.id === action.payload.id);
            state.cart[existingIndex].quantity -= 1;
            if (state.cart[existingIndex].quantity === 0) {
                // No more of this item in the cart, remove it
                state.cart.splice(existingIndex, 1);
            }
            state.totalQuantity--;
            state.totalCost -= action.payload.price;
        }
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
