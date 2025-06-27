import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchOrder, getTimeRemaining } from "../slices/orderSlice";
import { NewOrder } from "../components/Button/NewOrder";

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
        return <div className="loadingOverlay">Loading...</div>;
    }

    if (isError || !order) {
        // Bail here to avoid showing error between "New Order" click and redirection to menu
        return null;
    }

    const remainingTime = getTimeRemaining(order.eta);

    return (
        <>
            <div className="text-center flex-grow">
                <img src="/box.png" width="390" height="362" />
                {remainingTime >= 0 ? (
                    <div className="px-[16px]">
                        <h2 className="text-32">Dina wontons tillagas!</h2>
                        <div className="text-26 py-[16px]">
                            Eta {remainingTime} min
                        </div>
                    </div>
                ) : (
                    <div className="px-[16px]">
                        <h2 className="text-32">Dina wontons är klara!</h2>
                    </div>
                )}
                <div className="text-15">
                    #{order.id}
                </div>
            </div>
            <NewOrder orderId={order.id}/>
            <button className="outline mt-[16px]">
                <NavLink to={`/receipt/${order.id}`}>Visa kvitto</NavLink>
            </button>
        </>
    )
}
