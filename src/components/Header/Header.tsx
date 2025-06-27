import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import style from './Header.module.css';

export function Header() {
    const cartState = useAppSelector(state => state.cart);
    const location = useLocation();
    const isHome = location.pathname === "/";
    const isOnCartPage = location.pathname === "/cart";

    function showLogo() {
        return !isOnCartPage;
    }

    function showCartIcon() {
        return isHome || isOnCartPage;
    }

    function showBackIcon() {
        return isOnCartPage;
    }

    return (
        <header className="flex justify-between items-baseline">
            {showLogo() && (
                <img src={`${import.meta.env.BASE_URL}logo_white.svg`} width="64" height="64" />
            )}
            {showBackIcon() && (
                <NavLink to="/" className={style.backLink}>
                    <img src={`${import.meta.env.BASE_URL}caret-left.svg`} width="64" height="64" />
                </NavLink>
            )}
            {showCartIcon() && (
                <NavLink to="/cart" className={style.cartLink}>
                    {cartState.totalQuantity > 0 && (
                        <span className={style.cartTotal}>{cartState.totalQuantity}</span>
                    )}
                    <img src={`${import.meta.env.BASE_URL}cart.svg`} width="32" height="31" />
                </NavLink>
            )}
        </header>
    );
}
