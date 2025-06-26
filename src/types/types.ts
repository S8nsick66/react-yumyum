/*
Setting up the menu item types here to avoid hardcoding them in multiple places.
Some TypeScript weirdness is used where we initialize arrays for each type throughout the code.
*/
export const MENU_TYPES = ['wonton', 'dip', 'drink'] as const;
export type MenuCategory = typeof MENU_TYPES[number];

export interface MenuType {
    id: number;
    type: MenuCategory;
    name: string;
    description: string;
    price: number;
    ingredients?: string[]
}

export type MenuGroup = {
    [key in MenuCategory]: MenuType[];
}

export type MenuState = {
    menu: MenuType[];
    menuGrouped: MenuGroup;
    isLoading: boolean;
    isError: boolean;
};

export interface OrderType {
    id: string;
    items: MenuType[];
    orderValue: number;
    eta: string;
    timestamp: string;
    state: string;
}

export type OrderState = {
    order: OrderType | null;
    isLoading: boolean;
    isError: boolean;
};

export interface CartItem {
    id: number;
    quantity: number;
}

export type ExpandedCartItem = CartItem & {
    name: string;
    price: number;
    total: number;
};

export type CartExpanded = {
    [key in MenuCategory]: ExpandedCartItem[];
};

export type CartState = {
    cart: CartItem[];
    totalQuantity: number;
    totalCost: number;
};

export interface ReceiptItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    type: MenuCategory;
}

export interface ReceiptType {
    id: string;
    items: ReceiptItem[];
    orderValue: number;
    timestamp: string;
}

export type ReceiptState = {
    receipt: ReceiptType | null;
    isLoading: boolean;
    isError: boolean;
};
