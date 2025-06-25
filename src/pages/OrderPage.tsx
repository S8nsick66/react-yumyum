import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { fetchOrder, getTimeRemaining } from "../slices/orderSlice";

export function OrderPage() {
    const { orderId } = useParams<{ orderId: string }>();
    const dispatch = useAppDispatch();
    const { order, isLoading, isError } = useAppSelector(state => state.order);

    useEffect(() => {
        if (orderId) {
            dispatch(fetchOrder(orderId));
        }
    }, [dispatch, orderId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !order) {
        return <div>Something went wrong. Please try again.</div>;
    }

    return (
        <>
            <img src="/images/box.png"/>
            <h2>Dina wontons tillagas!</h2>
            <div>
                Eta {getTimeRemaining(order.eta)} min
            </div>
            <div>
                #{ order.id }
            </div>
            <NavLink to={`/receipt/${order.id}`} className="button">Visa kvitto</NavLink>
        </>
    )
}