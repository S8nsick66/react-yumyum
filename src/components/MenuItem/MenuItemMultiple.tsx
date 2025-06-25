import type { MenuType } from "../../types/types";

interface MenuItemProps {
    menuitem: MenuType;
}

export function MenuItemMultiple({ menuitem }: MenuItemProps){
    return (
        <div className="menu-item">
            <h2>{ menuitem.name }</h2>
        </div>
    );
}