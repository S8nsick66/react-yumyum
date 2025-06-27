import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchReceipt } from "../slices/receiptSlice";
import style from './ReceiptPage.module.css';
import {NewOrder} from "../components/Button/NewOrder.tsx";

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

    if (isLoading) return <div className="loadingOverlay">Loading...</div>;

    if (isError || !receipt) {
        return <div>Something went wrong. Please try again.</div>;
    }

    return (
        <>
            <div className="flex-grow flex flex-col">
                <div className={style.receiptWrapper}>
                    <div className="p-[16px]">
                        <div className="text-center">
                            <img src="/logo.svg" className="inline-block mt-[16px] mb-[10px]"/>
                            <h3 className="text-2xl">Kvitto</h3>
                            <div className="text-xs">
                                #{receipt.id}
                            </div>
                        </div>
                        <div>
                            {receipt.items.map((item) => (
                                <div className="mt-[10px]">
                                    <div key={item.id} className="flex pt-[8px]">
                                        <h4>{item.name}</h4>
                                        <div className="flex-grow menuItemBorder"></div>
                                        <div>{item.price} SEK</div>
                                    </div>
                                    <div className="text-xs font-normal lowercase">{item.quantity} stycken</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between align-start p-[16px] totalWrapper">
                        <div>
                            <div>Totalt</div>
                            <div className="text-xs">inkl. 20% moms</div>
                        </div>
                        <div className="text-2xl">
                            {receipt.orderValue} SEK
                        </div>
                    </div>
                </div>
            </div>
            <NewOrder orderId={receipt.id}/>
        </>
    )
}