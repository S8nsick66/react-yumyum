import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchMenu } from "../slices/menuSlice";
import { addToCart, isInCart, quantityInCart } from "../slices/cartSlice";
import { MenuItemHeader } from "../components/MenuItem/MenuItemHeader";
import { MenuItemSingle } from "../components/MenuItem/MenuItemSingle";
import { MenuItemMultiple } from "../components/MenuItem/MenuItemMultiple";
import styles from './MenuPage.module.css';
import type {MenuType} from "../types/types";

export function MenuPage() {
    const dispatch = useAppDispatch();
    const { menuGrouped, isLoading, isError } = useAppSelector(state => state.menu);
    const cartState = useAppSelector(state => state.cart);

    useEffect(() => {
        dispatch(fetchMenu());
    }, [dispatch]);

    const handleAddToCart = (item: MenuType) => {
        dispatch(addToCart(item));
    };

    if (isLoading) return <div className="loadingOverlay">Loading...</div>;
    if (isError) return <div>Something went wrong</div>;

    return (
        <>
            <div className={`overflow-y-scroll ${styles.menuWrapper}`}>
                <h1 className="m-0">Meny</h1>
                <section className="">
                    {menuGrouped.wonton.map((menuitem) => {
                        const quantity = quantityInCart(cartState.cart, menuitem.id);
                        return (
                            <div
                                key={menuitem.id}
                                onClick={() => handleAddToCart(menuitem)}
                                className={`${styles.menuItem} ${quantity > 0 ? styles.selected : ''}`}
                            >
                                <MenuItemSingle menuitem={menuitem} />
                            </div>
                        );
                    })}
                </section>
                {menuGrouped.dip?.length > 0 && (
                    <div className={styles.menuItem}>
                        {/* Take price of first, assume all cost the same */}
                        <MenuItemHeader name={'Dippsås'} price={menuGrouped.dip[0].price} />
                        <ul className="flex flex-wrap gap-[16px] mt-[8px]">
                            {menuGrouped.dip.map((menuitem) => (
                                <li
                                    key={menuitem.id}
                                    onClick={() => handleAddToCart(menuitem)}
                                    className={`lowercase font-medium text-sm py-[8px] px-[12px] ${styles.menuItemMultiple} ${isInCart(cartState.cart, menuitem.id) ? styles.selected : ''}`}
                                >
                                    <MenuItemMultiple key={menuitem.id} menuitem={menuitem}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {menuGrouped.drink?.length > 0 && (
                    <div className={styles.menuItem}>
                        {/* Take price of first, assume all cost the same */}
                        <MenuItemHeader name={'Dryck'} price={menuGrouped.drink[0].price} />
                        <ul className="flex flex-wrap gap-[16px] mt-[8px]">
                            {menuGrouped.drink.map((menuitem) => (
                                <li
                                    key={menuitem.id}
                                    onClick={() => handleAddToCart(menuitem)}
                                    className={`lowercase font-medium text-sm py-[8px] px-[12px] ${styles.menuItemMultiple} ${isInCart(cartState.cart, menuitem.id) ? styles.selected : ''}`}
                                >
                                    <MenuItemMultiple key={menuitem.id} menuitem={menuitem}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}
