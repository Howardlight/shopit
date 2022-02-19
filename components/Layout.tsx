import React from "react";
import TopBar from "./TopBar";
import Footer from "./Footer";

function Layout({children}: {children: React.ReactNode}) {
    return(
        <div>
            <TopBar />
            {children}
            <Footer />
        </div>
    );
}

export default Layout;