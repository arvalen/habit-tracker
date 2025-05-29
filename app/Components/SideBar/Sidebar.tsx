import React from "react";
import LogoAndName from "../LogoAndName";
import MenuSelection from "./MenuSelection";
import LogoutSection from "./LogoutSection";

function Sidebar() {
    return (
        <div className=" flex-grow p-10 flex flex-col border  bg-white min-h-screen">
            <LogoAndName />
            <MenuSelection />
            <LogoutSection />
        </div>
    );
}

export default Sidebar;