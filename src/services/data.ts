// Will fetch/save data from/to cache or API

import { cache } from './cache';
import { api } from './api';
import type { MenuType, CartState, OrderType, ReceiptType } from "../types/types";

// Run only once to get an API key and save it in api.API_KEY
//async function getKey() {
//    return await api.getKey();
//}

// Run only once to get a tenant id and save it in api.FOODTRUCK_ID
//async function createTenant(name: string) {
//    return await api.createTenant(name);
//}

async function getMenu(): Promise<MenuType[]> {
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

function clearCart() {
    cache.clearCart();
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

function saveOrder(order: OrderType) {
    cache.saveOrder(order);
}

function clearOrder(orderId: string) {
    cache.clearOrder(orderId);
}

async function getReceipt(id: string): Promise<ReceiptType|null> {
    let receipt = cache.getReceipt(id);
    if (!receipt) {
        receipt = await api.getReceipt(id);
    }
    return receipt;
}

function saveReceipt(receipt: ReceiptType) {
    cache.saveReceipt(receipt);
}

function clearReceipt(orderId: string) {
    cache.clearReceipt(orderId);
}

export const data = {
    //getKey,
    //createTenant,
    getMenu,
    getCart,
    saveCart,
    clearCart,
    getOrder,
    sendOrder,
    saveOrder,
    clearOrder,
    getReceipt,
    saveReceipt,
    clearReceipt
}
