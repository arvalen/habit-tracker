import React, { useEffect, useRef } from "react";
import LogoAndName from "../LogoAndName";
import { useGlobalContextProvider } from "@/app/contextApi";
import MenuSelection from "./MenuSelection";
import LogoutSection from "./LogoutSection";

function Sidebar() {
    const { openSideBarObject } = useGlobalContextProvider();
    const { openSideBar, setOpenSideBar } = openSideBarObject;
    const sideBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleOutSideClicked(event: MouseEvent) {
            if (!sideBarRef.current?.contains(event.target as Node)) {
                setOpenSideBar(false);
            }
        }

        document.addEventListener("click", handleOutSideClicked);
        return () => {
            document.removeEventListener("click", handleOutSideClicked);
        };
    }, [openSideBar]);

    return (
        <div
            ref={sideBarRef}
            className={`${
                !openSideBar ? "max-xl:hidden" : "fixed shadow-lg"
            } flex-grow z-50 p-10 flex-col bg-white min-h-screen `}
        >
            <LogoAndName/>
            <MenuSelection/>
            <LogoutSection/>
        </div>
    );
}

export default Sidebar;