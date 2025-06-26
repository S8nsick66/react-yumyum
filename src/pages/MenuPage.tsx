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
            <div className={styles.menuWrapper}>
                <h1>Meny</h1>
                <section className="products grid grid-cols-1 md:grid-cols-2 gap-6">
                    {menuGrouped.wonton.map((menuitem) => {
                        const quantity = quantityInCart(cartState.cart, menuitem.id);
                        return (
                            <div
                                key={menuitem.id}
                                onClick={() => handleAddToCart(menuitem)}
                                className={quantity > 0 ? styles.selected : ''}
                            >
                                <MenuItemSingle
                                    menuitem={menuitem}
                                    quantity={quantity}
                                />
                            </div>
                        );
                    })}
                </section>
                {menuGrouped.dip?.length > 0 && (
                    <>
                        <div>
                            <h2 className="">Dippsås</h2>
                            <div>{menuGrouped.dip[0].price} SEK</div> {/* Assume all cost the same */}
                        </div>
                        <section className="flex flex-wrap gap-6">
                            {menuGrouped.dip.map((menuitem) => (
                                <div
                                    key={menuitem.id}
                                    onClick={() => handleAddToCart(menuitem)}
                                    className={isInCart(cartState.cart, menuitem.id) ? styles.selected : ''}
                                >
                                    <MenuItemMultiple key={menuitem.id} menuitem={menuitem}/>
                                </div>
                            ))}
                        </section>
                    </>
                )}
                {menuGrouped.drink?.length > 0 && (
                    <>
                        <div>
                            <h2 className="">Dryck</h2>
                            <div>{menuGrouped.drink[0].price} SEK</div> {/* Assume all cost the same */}
                        </div>
                        <section className="flex flex-wrap gap-6">
                            {menuGrouped.drink.map((menuitem) => (
                                <div
                                    key={menuitem.id}
                                    onClick={() => handleAddToCart(menuitem)}
                                    className={isInCart(cartState.cart, menuitem.id) ? styles.selected : ''}
                                >
                                    <MenuItemMultiple key={menuitem.id} menuitem={menuitem}/>
                                </div>
                            ))}
                        </section>
                    </>
                )}
            </div>
        </>
    );
}
