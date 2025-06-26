import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { startNewOrder } from "../slices/orderSlice";
import { fetchReceipt } from "../slices/receiptSlice";
import style from './ReceiptPage.module.css';

export function ReceiptPage() {
    const { orderId } = useParams<{ orderId: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { receipt, isLoading, isError } = useAppSelector(state => state.receipt);
    const { cart } = useAppSelector(state => state.cart);

    useEffect(() => {
        if (orderId) {
            dispatch(fetchReceipt(orderId));
        }
    }, [dispatch, orderId]);

    useEffect(() => {
        if (cart.length === 0) {
            // startNewOrder has emptied the cart,
            // now we can go back to the menu and start fresh
            navigate('/');
        }
    }, [cart.length]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !receipt) {
        return <div>Something went wrong. Please try again.</div>;
    }

    return (
        <div className={style.receiptWrapper}>
            <img src="/images/logo.svg"/>
            <h2>Kvitto</h2>
            <div>
                #{ receipt.id }
            </div>
            <div>
                {receipt.items.map((item) => (
                    <div key={item.id}>
                        <div>{item.name}</div>
                        <div>{item.price} SEK</div>
                        <div>{item.quantity}</div>
                    </div>
                ))}
            </div>
            <a className="button" onClick={() => {
                dispatch(
                    // Clear the current order.
                    // This will reset the cart and order state,
                    // triggering useEffect above
                    // to navigate back to the menu
                    startNewOrder(receipt.id)
                )
            }}>
                Gör en ny beställning
            </a>
        </div>
    )
}