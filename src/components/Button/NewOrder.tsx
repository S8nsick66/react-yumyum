import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { startNewOrder } from "../../slices/orderSlice";

export function NewOrder({ orderId }: { orderId: string }) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleNewOrder = async () => {
        // Clear the current order
        await dispatch(startNewOrder(orderId));
        // and then navigate back to the menu
        navigate('/');
    };

    return (
        <button type="button"
                onClick={handleNewOrder}
                /*
                onClick={() => {
            dispatch(
                // Clear the current order.
                // This will reset the cart and order state,
                // triggering useEffect above
                // to navigate back to the menu
                startNewOrder(orderId)
            )

        }}*/>
            Gör en ny beställning
        </button>
    )
}