import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMenu } from "../slices/menuSlice";
import { getCartExpanded, removeFromCart} from "../slices/cartSlice";
import { sendOrder } from "../slices/orderSlice";
import type { CartItem } from "../types/types";
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
            </div>
        ) : (
        <>
            <div className={style.cartWrapper}>
                <div className="dottedBorder mb-[8px]"></div>
                {cartExpanded.map((item) => (
                    <div key={item.id} className="flex text-header py-[8px]" onClick={() => handleRemoveFromCart(item)}>
                        <h2>{item.name}{item.type === 'dip' ? ' dip' : ''}</h2>
                        <div className="flex-grow menuItemBorder"></div>
                        <div>{item.total} SEK</div>
                    </div>
                ))}
                <div className="dottedBorder mt-[8px]"></div>
                <div className="dottedBorder"></div>
                <div className="dottedBorder"></div>
            </div>
            <div className={`flex justify-between align-start p-[16px] ${style.totalWrapper}`}>
                <div className="text-header">Totalt</div>
                <div>{cartState.totalCost} SEK</div>
            </div>
            <button type="button" onClick={handleSendOrder} className={`text-2xl p-[24px]`}>Take my money!</button>
        </>
    )
}