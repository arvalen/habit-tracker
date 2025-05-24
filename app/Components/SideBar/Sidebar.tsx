import React from "react";
import LogoAndName from "../LogoAndName";
import MenuSelection from "./MenuSelection";
import LogoutSection from "./LogoutSection";

function Sidebar() {
    return (
        <div className="border-r-2 h-screen p-10 flex flex-col gap-20">
            <LogoAndName />
            <MenuSelection />
            <LogoutSection />
        </div>
    );
}

export default Sidebar;