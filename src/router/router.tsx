import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import { MenuPage } from "../pages/MenuPage";
import { CartPage } from "../pages/CartPage";
import { OrderPage } from "../pages/OrderPage";
import { ReceiptPage } from "../pages/ReceiptPage";
import { ErrorPage } from "../pages/ErrorPage";

// Prefix each route with /react in production to work on GitHub Pages
const basename = import.meta.env.PROD ? '/react-yumyum' : '/';

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Layout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    index: true,
                    element: <MenuPage />,
                },
                {
                    path: "cart",
                    element: <CartPage />
                },
                {
                    path: "order/:orderId",
                    element: <OrderPage />
                },
                {
                    path: "receipt/:orderId",
                    element: <ReceiptPage />
                }
            ],
        },
    ],
    { basename }
);
