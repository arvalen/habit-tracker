import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AllHabitsSearchBar() {
    return (
        <div className="w-[75%]">
            <div className=" flex gap-3 items-center  p-3 bg-slate-50 rounded-3xl ">
                <FontAwesomeIcon 
                    height={20}
                    width={20}
                    icon={faSearch}
                    className="text-gray-300"
                />
                <input
                    className={` outline-none text-[14px] font-light bg-slate-50 w-full `}
                    placeholder="Search..."
                />
            </div>
        </div>
    );
}

export default AllHabitsSearchBar;