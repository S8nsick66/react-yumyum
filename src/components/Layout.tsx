import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header/Header";

export function Layout() {
    const location = useLocation();

    useEffect(() => {
        // Set different body classes based on path
        // to have different backgrounds for different pages
        document.body.className = "";
        if (location.pathname === "/cart") {
            document.body.classList.add("body-cart");
        } else if (location.pathname === "/order") {
            document.body.classList.add("body-order");
        } else if (location.pathname === "/") {
            document.body.classList.add("body-menu");
        } else {
            document.body.classList.add("body-default");
        }
    }, [location.pathname]);

    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
