// Will fetch data to slices
// will check cache first, then api, and save to cache

import {cache} from './cache';
import {api} from './api';
import type { CartState, OrderType, ReceiptType } from "../types/types";

// Run only once to get an API key and save it in api.API_KEY
async function getKey() {
    return await api.getKey();
}

// Run only once to get a tenant id and save it in api.FOODTRUCK_ID
async function createTenant(name: string) {
    return await api.createTenant(name);
}

async function getMenu() {
    let menu = cache.getMenu();
    if (menu === false) {
        menu = await api.getMenu();
        cache.saveMenu(menu);
    }
    return menu;
}

function getCart(): CartState|null {
    const cart = cache.getCart();
    if (!cart) {
        return null;
    }
    return cart;
}

function saveCart(cart: CartState) {
    cache.saveCart(cart);
}

async function getOrder(id: string): Promise<OrderType|null> {
    let order = cache.getOrder(id);
    if (!order) {
        order = await api.getOrder(id);
    }
    return order;
}

async function sendOrder(order: number[]): Promise<OrderType> {
    return await api.sendOrder(order);
}

async function getReceipt(id: string): Promise<ReceiptType|null> {
    let receipt = cache.getReceipt(id);
    if (!receipt) {
        receipt = await api.getReceipt(id);
    }
    return receipt;
}

export const data = {
    //getKey,
    //createTenant,
    getMenu,
    getCart,
    saveCart,
    getOrder,
    sendOrder,
    getReceipt
}
