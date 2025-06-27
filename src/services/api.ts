const API_BASE_URL = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/";
const API_KEY = "yum-B2mWxADrthdHqd22";
const FOODTRUCK_ID = 'mgd7';

import type {
    MenuType,
    OrderType,
    ReceiptType,
    ApiMenuResponse,
    ApiOrderResponse,
    ApiReceiptResponse
} from "../types/types";

const myHeaders = new Headers();
myHeaders.append("x-zocom", API_KEY);

/*
async function getKey() {
    const response = await fetch(API_BASE_URL + "keys", {
        method: "POST"
    });
    const data = await response.json();
    return data.key;
}

async function createTenant(name: string){
    const response = await fetch(API_BASE_URL + "tenants", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ name: name }),
    });
    const data = await response.json();
    return data.key;
}
*/

async function getMenu(): Promise<MenuType[]> {
    const response = await fetch(API_BASE_URL + "menu", {
        headers: myHeaders
    });
    const data: ApiMenuResponse = await response.json();
    return data.items;
}

async function sendOrder(order: number[]): Promise<OrderType> {
    const response= await fetch(API_BASE_URL + FOODTRUCK_ID + "/orders", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({items: order}),
    });
    const data: ApiOrderResponse = await response.json();
    return data.order;
}

async function getOrder(order: string): Promise<OrderType> {
    const response = await fetch(API_BASE_URL + FOODTRUCK_ID + "/orders/" + order, {
        headers: myHeaders
    });
    const data: ApiOrderResponse = await response.json();
    return data.order;
}

async function getReceipt(order: string): Promise<ReceiptType> {
    const response = await fetch(API_BASE_URL + "receipts/" + order, {
        headers: myHeaders
    });
    const data: ApiReceiptResponse = await response.json();
    return data.receipt;
}

export const api = {
    //getKey,
    //createTenant,
    getMenu,
    sendOrder,
    getOrder,
    getReceipt
};
