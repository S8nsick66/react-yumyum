import { MenuItemHeader } from "./MenuItemHeader";
import type { MenuType } from "../../types/types";

export function MenuItemSingle({ menuitem }: { menuitem: MenuType }) {
    return (
        <div>
            <MenuItemHeader name={menuitem.name} price={menuitem.price} />
            <p className="lowercase font-medium text-sm">{menuitem.ingredients?.join(", ")}</p>
        </div>
    );
}
