import type { MenuType } from "../../types/types";

export function MenuItemSingle({ menuitem }: { menuitem: MenuType }) {
    return (
        <div>
            <div className="flex justify-between text-header">
                <h2>{menuitem.name}</h2>
                <div className="flex-grow menuItemBorder"></div>
                <div>{menuitem.price} SEK</div>
            </div>
            <p className="lowercase font-medium text-sm">{menuitem.ingredients?.join(", ")}</p>
        </div>
    );
}