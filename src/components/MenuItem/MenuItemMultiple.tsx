import type { MenuType } from "../../types/types";

export function MenuItemMultiple({ menuitem }: { menuitem: MenuType }) {
    return (
        <>
            { menuitem.name }
        </>
    );
}