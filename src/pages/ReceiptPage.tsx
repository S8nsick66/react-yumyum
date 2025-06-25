import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { fetchReceipt } from "../slices/receiptSlice";

export function ReceiptPage() {
    const { orderId } = useParams<{ orderId: string }>();
    const dispatch = useAppDispatch();
    const { receipt, isLoading, isError } = useAppSelector(state => state.receipt);

    useEffect(() => {
        if (orderId) {
            dispatch(fetchReceipt(orderId));
        }
    }, [dispatch, orderId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !receipt) {
        return <div>Something went wrong. Please try again.</div>;
    }

    return (
        <>
            <img src="/images/box.png"/>
            <h2>Dina wontons tillagas!</h2>
            <div>
            </div>
            <div>
                #{ order.id }
            </div>
            <NavLink to={`/receipt/${order.id}`} className="button">Visa kvitto</NavLink>
        </>
    )
}