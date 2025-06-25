import type { MenuType } from "../../types/types";

interface MenuItemProps {
    menuitem: MenuType;
    quantity: number;
}

export function MenuItemSingle({ menuitem, quantity }: MenuItemProps){
    return (
        <div className="menu-item">
            <h2>{menuitem.name} {quantity}</h2>
            <div>{menuitem.price} SEK</div>
            <p>{menuitem.ingredients?.join(", ")}</p>
        </div>
    );
}