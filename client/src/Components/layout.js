import { Outlet } from "react-router-dom";
import Header from "./Header";
import "./layout.css"

export default function Layout(){
    return (
        <main>
            <Header />
            <div className="marquee-container">
                <div className="marquee-content">
                Disclaimer: This website is not responsible for user-generated content. The views expressed by users are their own. We encourage reporting of any inappropriate material for review and action. The website owner cannot be held accountable for user-generated content.
                </div>
            </div>
            <Outlet />
        </main>
    )
}