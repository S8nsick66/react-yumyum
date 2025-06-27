import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header/Header";

export function Layout() {
    const location = useLocation();

    useEffect(() => {
        // Set different body classes based on path
        // to have different backgrounds for different pages
        document.body.className = "";
        const pathparts = location.pathname.slice(1).split("/");
        if (pathparts[0] === "cart") {
            document.body.classList.add("body-cart");
        } else if (pathparts[0] === "order") {
            document.body.classList.add("body-order");
        } else if (pathparts[0] === "receipt") {
            document.body.classList.add("body-receipt");
        } else if (location.pathname === "/") {
            document.body.classList.add("body-menu");
        } else {
            document.body.classList.add("body-default");
        }
    }, [location.pathname]);

    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}
