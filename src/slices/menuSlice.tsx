import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { data } from "../services/data";
import type { MenuType, MenuGroup, MenuState } from "../types/types";
import { MENU_TYPES } from "../types/types";

export const fetchMenu = createAsyncThunk(
    "menu/fetch",
    async () => await data.getMenu()
);

const initialState: MenuState = {
    menu: [],
    menuGrouped: Object.fromEntries(
        MENU_TYPES.map(type => [type, []])
    ) as unknown as MenuGroup,
    isLoading: false,
    isError: false
};

function groupItemsByType(menuitems: MenuType[]): MenuGroup {
    const menuGrouped: MenuGroup = Object.fromEntries(
        MENU_TYPES.map(type => [type, []])
    ) as unknown as MenuGroup;
    menuitems.forEach((item) => {
        switch (item.type) {
            case 'wonton':
                menuGrouped.wonton.push(item);
                break;
            case 'dip':
                menuGrouped.dip.push(item);
                break;
            case 'drink':
                menuGrouped.drink.push(item);
                break;
            default:
                console.warn(`Unknown item type: ${item.type}`);
        }
    })
    return menuGrouped;
}

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenu.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchMenu.fulfilled, (state, action) => {
                state.isLoading = false;
                state.menu = action.payload;
                state.menuGrouped = groupItemsByType(state.menu);
            })
            .addCase(fetchMenu.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const menuReducer = menuSlice.reducer;
