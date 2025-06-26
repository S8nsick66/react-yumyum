// Will read/write to/from localStorage

import type { MenuType, OrderType, CartState, ReceiptType } from '../types/types';

function getMenu(): MenuType[]|false {
    const menu = localStorage.getItem('menu');
    return menu ? JSON.parse(menu) : false;
}

function saveMenu(menu: MenuType[]) {
    localStorage.setItem('menu', JSON.stringify(menu));
}

function getCart(): CartState|null {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : null;
}

function saveCart(cart: CartState) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function clearCart() {
    localStorage.removeItem('cart');
}

function getOrder(id: string): OrderType|null {
    const order = localStorage.getItem('order:' + id);
    return order ? JSON.parse(order) : null;
}

function saveOrder(order: OrderType) {
    localStorage.setItem('order:' + order.id, JSON.stringify(order));
}

function clearOrder(id: string) {
    localStorage.removeItem('order:' + id);
}

function getReceipt(id: string): ReceiptType|null {
    const receipt = localStorage.getItem('receipt:' + id);
    return receipt ? JSON.parse(receipt) : null;
}
function saveReceipt(receipt: ReceiptType) {
    localStorage.setItem('receipt:' + receipt.id, JSON.stringify(receipt));
}

function clearReceipt(id: string) {
    localStorage.removeItem('receipt:' + id);
}

export const cache = {
    getMenu,
    saveMenu,
    getCart,
    saveCart,
    clearCart,
    getOrder,
    saveOrder,
    clearOrder,
    getReceipt,
    saveReceipt,
    clearReceipt
}
