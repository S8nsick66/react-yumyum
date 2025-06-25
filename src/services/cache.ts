// will read/write to/from localStorage

import type { MenuType, OrderType, CartState } from '../types/types';
//import type { ListingListType } from '../types/ListingListType';
//import type { OrderKey } from "../types/OrderOptions";
//import type { PageType } from "../types/PageType";

function getMenu(): MenuType[]|false {
    const menu = localStorage.getItem('menu');
    return menu ? JSON.parse(menu) : false;
}

function saveMenu(menu: MenuType[]) {
    localStorage.setItem('menu', JSON.stringify(menu));
}

/*
unction getListing(listingId: number) {
    const listings = localStorage.getItem('listing:' + listingId);
    return listings ? JSON.parse(listings) : false;
}

function saveListing(listing: ListingType) {
    localStorage.setItem('listing:' + listing.id, JSON.stringify(listing));
}

function getOrder(): string|null {
    const order = localStorage.getItem('order');
    if (order) {
        return order;
    }
    return null;
}

function saveOrder(order: OrderKey) {
    localStorage.setItem('order', order);
}

function getFilter(): string|null {
    const filter = localStorage.getItem('filter');
    return filter ? filter : null;
}

function saveFilter(filter: string) {
    localStorage.setItem('filter', filter);
}

function getPage(pageSlug: string): PageType | 'NOT_FOUND' | null {
    const page = localStorage.getItem('page:' + pageSlug);
    return page ? JSON.parse(page) : null;
}

function savePage(pageSlug: string, page: PageType | 'NOT_FOUND') {
    localStorage.setItem('page:' + pageSlug, JSON.stringify(page));
}
*/

function getCart(): CartState|null {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : null;
}

function saveCart(cart: CartState) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getOrder(id: string): OrderType|null {
    const order = localStorage.getItem('order:' + id);
    return order ? JSON.parse(order) : null;
}

function saveOrder(order: OrderType) {
    localStorage.setItem('order:' + order.id, JSON.stringify(order));
}

export const cache = {
    getMenu,
    saveMenu,
    //getListing,
    //saveListing,
    //getOrder,
    //saveOrder,
    //getFilter,
    //saveFilter,
    //getPage,
    //savePage,
    getCart,
    saveCart,
    getOrder,
    saveOrder
}
