import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import style from './Header.module.css';

export function Header() {
    const cartState = useAppSelector(state => state.cart);
    const location = useLocation();
    const isOnCartPage = location.pathname === "/cart";

    return (
        <header className="flex justify-between items-baseline">
            <NavLink to="/"><img src="/images/logo_white.svg" width="64" height="64" /></NavLink>
            <NavLink to={isOnCartPage ? "/" : "/cart"} className={style.cartLink}>
                {cartState.totalQuantity > 0 && (
                    <span className={style.cartTotal}>{cartState.totalQuantity}</span>
                )}
                <img src="/images/cart.svg" width="32" height="31" />
            </NavLink>
        </header>
    );
}
