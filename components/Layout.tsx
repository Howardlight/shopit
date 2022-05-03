import React, { useState } from "react";
import TopBar from "./topbar/TopBar";
import Footer from "./Footer";
import WishlistDrawer from "./WishlistDrawer";


function Layout({children}: {children: React.ReactNode}) {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return(
        <div>
            <TopBar setIsDrawerOpen={setIsDrawerOpen}/>
            {children}
            <WishlistDrawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}/>
            <Footer />
        </div>
    );
}

export default Layout;