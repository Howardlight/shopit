import React from "react";
import TopBar from "./TopBar";


function Layout({children}: {children: React.ReactNode}) {
    return(
        <div>
            <TopBar />
            {children}
        </div>
    );
}

export default Layout;