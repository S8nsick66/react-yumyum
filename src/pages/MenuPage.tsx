import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchMenu } from "../slices/menuSlice";
import { addToCart, isInCart, quantityInCart } from "../slices/cartSlice";
import { MenuItemSingle } from "../components/MenuItem/MenuItemSingle";
import { MenuItemMultiple } from "../components/MenuItem/MenuItemMultiple";
import styles from './MenuPage.module.css';
import type {MenuType} from "../types/types";

export function MenuPage() {
    const dispatch = useAppDispatch();
    const { menuGrouped, isLoading, isError } = useAppSelector(state => state.menu);
    const cartState = useAppSelector(state => state.cart);

    const handleAddToCart = (item: MenuType) => {
        dispatch(addToCart(item));
    };

    useEffect(() => {
        dispatch(fetchMenu());
    }, [dispatch]);

    /*useEffect(() => {
        if (cartState.cart.length > 0) {
            data.saveCart(cartState);
        } else {
            data.clearCart();
        }
    }, [cartState.cart.length]);*/

    if (isLoading) return <div>Loading...</div>;
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
                        <div className={`flex justify-between mb-[8px] ${styles.menuItemHeader}`}>
                            <h2 className="">Dippsås</h2>
                            <div className={`flex-grow ${styles.menuItemBorder}`}></div>
                            <div>{menuGrouped.dip[0].price} SEK</div>
                            {/* Assume all cost the same */}
                        </div>
                        <ul className="flex flex-wrap gap-[16px]">
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
                        <div className={`flex justify-between mb-[8px] ${styles.menuItemHeader}`}>
                            <h2 className="">Dryck</h2>
                            <div className={`flex-grow ${styles.menuItemBorder}`}></div>
                            <div>{menuGrouped.drink[0].price} SEK</div>
                            {/* Assume all cost the same */}
                        </div>
                        <ul className="flex flex-wrap gap-[16px]">
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
