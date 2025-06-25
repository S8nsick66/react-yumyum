import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import {NavLink, useNavigate} from "react-router-dom";
import { fetchMenu } from "../slices/menuSlice";
import { getCartExpanded, removeFromCart } from "../slices/cartSlice";
import { sendOrder } from "../slices/orderSlice";
import type {CartItem} from "../types/types";
import style from './CartPage.module.css';

export function CartPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const cartState = useAppSelector(state => state.cart);
    const cartExpanded = useAppSelector(getCartExpanded);
    const { order, isLoading, isError } = useAppSelector(state => state.order);

    useEffect(() => {
        dispatch(fetchMenu());
    }, [dispatch]);

    const handleRemoveFromCart = (item: CartItem) => {
        dispatch(removeFromCart(item));
    }

    const handleSendOrder = () => {
        dispatch(sendOrder(cartState.cart))
    };

    useEffect(() => {
        if (!isError && !isLoading && order) {
            navigate(`/order/${order.id}`);
        }
    }, [isError, order]);

    return cartState.cart.length === 0 ? (
            <div className="text-center">
                <p>Din varukorg är tom.</p>
                <button>
                    <NavLink to="/">Tillbaks till menyn</NavLink>
                </button>
            </div>
        ) : (
        <>
            <div className={style.cartWrapper}>
                {cartExpanded.map((item) => (
                    <div key={item.id} onClick={() => handleRemoveFromCart(item)}>
                        <div>{item.name}</div>
                        <div>{item.total} SEK</div>
                    </div>
                ))}
            </div>
            <div className="flex">
                <div>
                Totalt
                </div>
                <div>
                    {cartState.totalCost} SEK
                </div>
            </div>
            <button type="button" onClick={handleSendOrder}>Take my money!</button>
        </>
    )
}